
import Issue from "../models/Issue.js";
import Department from "../models/Department.js";
import Team from "../models/Team.js";
import { fromNodeHeaders } from "better-auth/node";

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const auth = req.app.locals.auth;

    // Get issue statistics
    const [
      totalIssues,
      pendingIssues,
      verifiedIssues,
      assignedIssues,
      inProgressIssues,
      resolvedIssues,
      totalDepartments,
      totalTeams,
      activeDepartments,
      activeTeams,
    ] = await Promise.all([
      Issue.countDocuments(),
      Issue.countDocuments({ status: "pending" }),
      Issue.countDocuments({ status: "verified" }),
      Issue.countDocuments({ status: "assigned" }),
      Issue.countDocuments({ status: "in-progress" }),
      Issue.countDocuments({ status: "resolved" }),
      Department.countDocuments(),
      Team.countDocuments(),
      Department.countDocuments({ isActive: true }),
      Team.countDocuments({ isActive: true }),
    ]);

    // Get staff count through Better Auth
    const staffResult = await auth.api.listUsers({
      query: {
        limit: 1,
        offset: 0,
        filterField: "accountType",
        filterValue: ["department", "maintenance"],
        filterOperator: "in",
      },
      headers: fromNodeHeaders(req.headers),
    });

    const totalStaff = staffResult.total;

    // Send dashboard statistics
    res.status(200).json({
      success: true,
      data: {
        issues: {
          total: totalIssues,
          pending: pendingIssues,
          verified: verifiedIssues,
          assigned: assignedIssues,
          inProgress: inProgressIssues,
          resolved: resolvedIssues,
        },
        departments: {
          total: totalDepartments,
          active: activeDepartments,
        },
        teams: {
          total: totalTeams,
          active: activeTeams,
        },
        staff: {
          total: totalStaff,
        },
      },
    });
  } catch (error) {
    console.error("Dashboard statistics error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong while retrieving dashboard statistics.",
    });
  }
};
