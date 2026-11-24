import { fromNodeHeaders } from "better-auth/node";

import Department from "../models/Department.js";
import Team from "../models/Team.js";

// Create a department or maintenance staff account
export const createStaffAccount = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      accountType,
      department,
      team,
    } = req.body;

    // Validate required information
    if (!name || !email || !password || !accountType) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password, and account type are required.",
      });
    }

    if (!["department", "maintenance"].includes(accountType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid staff account type.",
      });
    }

    const staffData = {
      accountType,
    };

    // Department staff account
    if (accountType === "department") {
      if (!department) {
        return res.status(400).json({
          success: false,
          message: "Department is required.",
        });
      }

      const existingDepartment = await Department.findOne({
        _id: department,
        isActive: true,
      });

      if (!existingDepartment) {
        return res.status(404).json({
          success: false,
          message: "Active department not found.",
        });
      }

      staffData.department = existingDepartment._id.toString();
    }

    // Maintenance staff account
    if (accountType === "maintenance") {
      if (!team) {
        return res.status(400).json({
          success: false,
          message: "Maintenance team is required.",
        });
      }

      const existingTeam = await Team.findOne({
        _id: team,
        isActive: true,
      }).populate("department");

      if (
        !existingTeam ||
        !existingTeam.department ||
        !existingTeam.department.isActive
      ) {
        return res.status(404).json({
          success: false,
          message: "Active maintenance team and department not found.",
        });
      }

      staffData.team = existingTeam._id.toString();
      staffData.department = existingTeam.department._id.toString();
    }

    // Create the account through Better Auth
    const auth = req.app.locals.auth;

    const newUser = await auth.api.createUser({
      body: {
        name,
        email,
        password,
        role: "user",
        data: staffData,
      },
      headers: fromNodeHeaders(req.headers),
    });

    res.status(201).json({
      success: true,
      message: "Staff account created successfully.",
      data: newUser,
    });
  } catch (error) {
    console.error("Create staff account error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid department or team ID.",
      });
    }

    // Preserve Better Auth client-error status when available
    const status = error.status || error.statusCode;

    if (status && status >= 400 && status < 500) {
      return res.status(status).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong while creating the staff account.",
    });
  }
};


// Get all staff accounts
export const getAllStaff = async (req, res) => {
  try {
    const { accountType } = req.query;

    // Validate account type filter
    if (
      accountType &&
      !["department", "maintenance"].includes(accountType)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid staff account type.",
      });
    }

    // Pagination
    const limit = Math.min(
      Math.max(parseInt(req.query.limit) || 10, 1),
      100
    );

    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const offset = (page - 1) * limit;

    // Build Better Auth query
    const query = {
      limit,
      offset,
      filterField: "accountType",
      filterValue: accountType || ["department", "maintenance"],
      filterOperator: accountType ? "eq" : "in",
    };

    // Retrieve staff from Better Auth
    const auth = req.app.locals.auth;

    const result = await auth.api.listUsers({
      query,
      headers: fromNodeHeaders(req.headers),
    });

    const users = result.users || [];


    // Collect department and team IDs
    const departmentIds = [
      ...new Set(users.map((user) => user.department).filter(Boolean)),
    ];

    const teamIds = [
      ...new Set(users.map((user) => user.team).filter(Boolean)),
    ];

    // Retrieve related department and team information
    const [departments, teams] = await Promise.all([
      Department.find({ _id: { $in: departmentIds } }).select("name"),

      Team.find({ _id: { $in: teamIds } })
        .populate("department", "name")
        .select("name department"),
    ]);

    // Create lookup maps
    const departmentMap = new Map(
      departments.map((department) => [
        department._id.toString(),
        department,
      ])
    );

    const teamMap = new Map(
      teams.map((team) => [team._id.toString(), team])
    );

    // Prepare staff response
    const staff = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      accountType: user.accountType,
      department: user.department
        ? departmentMap.get(user.department)
        : null,
      team: user.team
        ? teamMap.get(user.team)
        : null,
      createdAt: user.createdAt,
    }));

    res.status(200).json({
      success: true,
      results: staff.length,
      total: result.total,
      currentPage: Math.floor(offset / limit) + 1,
      totalPages: Math.ceil(result.total / limit),
      data: staff,
    });
  } catch (error) {
    console.error("Get staff error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong while retrieving staff accounts.",
    });
  }
};


// Update a staff account
export const updateStaffAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, department, team } = req.body;

    const auth = req.app.locals.auth;

    // Find the existing staff account
    const existingUser = await auth.api.getUser({
      query: { id },
      headers: fromNodeHeaders(req.headers),
    });

    if (
      !existingUser ||
      !["department", "maintenance"].includes(existingUser.accountType)
    ) {
      return res.status(404).json({
        success: false,
        message: "Staff account not found.",
      });
    }

    const updateData = {};

    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Name cannot be empty.",
        });
      }

      updateData.name = name.trim();
    }

    if (existingUser.accountType === "department") {
      if (department !== undefined) {
        const existingDepartment = await Department.findOne({
          _id: department,
          isActive: true,
        });

        if (!existingDepartment) {
          return res.status(404).json({
            success: false,
            message: "Active department not found.",
          });
        }

        updateData.department = existingDepartment._id.toString();
      }
    }

    if (existingUser.accountType === "maintenance") {
      if (team !== undefined) {
        const existingTeam = await Team.findOne({
          _id: team,
          isActive: true,
        }).populate("department");

        if (
          !existingTeam ||
          !existingTeam.department ||
          !existingTeam.department.isActive
        ) {
          return res.status(404).json({
            success: false,
            message: "Active maintenance team not found.",
          });
        }

        updateData.team = existingTeam._id.toString();
        updateData.department = existingTeam.department._id.toString();
      }
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update.",
      });
    }

    const updatedUser = await auth.api.adminUpdateUser({
      body: {
        userId: id,
        data: updateData,
      },
      headers: fromNodeHeaders(req.headers),
    });

    res.status(200).json({
      success: true,
      message: "Staff account updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Update staff account error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid department, team, or staff ID.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong while updating the staff account.",
    });
  }
};



// Deactivate a staff account
export const deactivateStaffAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const auth = req.app.locals.auth;

    if (id === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot deactivate your own account.",
      });
    }

    const staff = await auth.api.getUser({
      query: { id },
      headers: fromNodeHeaders(req.headers),
    });

    if (
      !staff ||
      !["department", "maintenance"].includes(staff.accountType)
    ) {
      return res.status(404).json({
        success: false,
        message: "Staff account not found.",
      });
    }

    if (staff.banned) {
      return res.status(400).json({
        success: false,
        message: "This staff account is already deactivated.",
      });
    }

    await auth.api.banUser({
      body: {
        userId: id,
        banReason: "Staff account deactivated by administrator.",
      },
      headers: fromNodeHeaders(req.headers),
    });

    res.status(200).json({
      success: true,
      message: "Staff account deactivated successfully.",
    });
  } catch (error) {
    console.error("Deactivate staff error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong while deactivating the account.",
    });
  }
};



// Reactivate a staff account
export const reactivateStaffAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const auth = req.app.locals.auth;

    const staff = await auth.api.getUser({
      query: { id },
      headers: fromNodeHeaders(req.headers),
    });

    if (
      !staff ||
      !["department", "maintenance"].includes(staff.accountType)
    ) {
      return res.status(404).json({
        success: false,
        message: "Staff account not found.",
      });
    }

    if (!staff.banned) {
      return res.status(400).json({
        success: false,
        message: "This staff account is already active.",
      });
    }

    await auth.api.unbanUser({
      body: { userId: id },
      headers: fromNodeHeaders(req.headers),
    });

    res.status(200).json({
      success: true,
      message: "Staff account reactivated successfully.",
    });
  } catch (error) {
    console.error("Reactivate staff error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong while reactivating the account.",
    });
  }
};