import { fromNodeHeaders } from "better-auth/node";
import createNotification from "./createNotification.js";

const getStaffUsers = async (auth, headers, accountType) => {
  const staffUsers = [];
  const limit = 100;
  let offset = 0;

  while (true) {
    const result = await auth.api.listUsers({
      query: {
        limit,
        offset,
        filterField: "accountType",
        filterValue: accountType,
        filterOperator: "eq",
      },
      headers,
    });

    const users = result.users || [];

    staffUsers.push(...users);

    if (users.length < limit) {
      break;
    }

    offset += limit;

    if (result.total && offset >= result.total) {
      break;
    }
  }

  return staffUsers;
};

const notifyAssignedStaff = async ({
  req,
  issue,
  departmentId,
  teamId,
  departmentName,
  teamName,
  departmentChanged,
  teamChanged,
}) => {
  try {
    const auth = req.app.locals.auth;
    const headers = fromNodeHeaders(req.headers);

    const notifications = [];

    if (departmentChanged) {
      const departmentStaff = await getStaffUsers(
        auth,
        headers,
        "department"
      );

      const departmentManagers = departmentStaff.filter(
        (user) => String(user.department) === String(departmentId)
      );

      notifications.push(
        ...departmentManagers.map((user) =>
          createNotification({
            recipientId: user.id,
            issueId: issue._id,
            type: "issue_assigned",
            title: "New Issue Assigned to Your Department",
            message: `The issue "${issue.title}" has been assigned to ${departmentName}.`,
          })
        )
      );
    }

    if (teamChanged) {
      const maintenanceStaff = await getStaffUsers(
        auth,
        headers,
        "maintenance"
      );

      const maintenanceMembers = maintenanceStaff.filter(
        (user) => String(user.team) === String(teamId)
      );

      notifications.push(
        ...maintenanceMembers.map((user) =>
          createNotification({
            recipientId: user.id,
            issueId: issue._id,
            type: "issue_assigned",
            title: "New Task Assigned to Your Team",
            message: `The issue "${issue.title}" has been assigned to your team (${teamName}).`,
          })
        )
      );
    }

    await Promise.all(notifications);
  } 
  catch (error) {
    // A notification failure should not undo a successful issue assignment.
    console.error("Assigned staff notification error:", error.message);

    return {
      departmentManagersNotified: 0,
      maintenanceStaffNotified: 0,
    };
  }
};

export default notifyAssignedStaff;