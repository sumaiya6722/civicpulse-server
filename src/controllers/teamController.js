
import Team from "../models/Team.js";
import Department from "../models/Department.js";

// Create a team
export const createTeam = async (req, res) => {
  try {
    const { name, description, department } = req.body;

    if (!name || !department) {
      return res.status(400).json({
        success: false,
        message: "Team name and department are required.",
      });
    }

    // Check whether the department exists and is active
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

    const team = await Team.create({
      name,
      description,
      department,
    });

    res.status(201).json({
      success: true,
      message: "Team created successfully.",
      data: team,
    });
  } catch (error) {
    console.error("Create team error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid department ID.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong while creating the team.",
    });
  }
};

// Get all teams
export const getAllTeams = async (req, res) => {
  try {
    const filters = {};

    // Optionally filter teams by department
    if (req.query.department) {
      filters.department = req.query.department;
    }

    const teams = await Team.find(filters)
      .populate("department", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      results: teams.length,
      data: teams,
    });
  } catch (error) {
    console.error("Get teams error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid department ID.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong while retrieving teams.",
    });
  }
};

// Get a single team
export const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await Team.findById(id)
      .populate("department", "name");

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: team,
    });
  } catch (error) {
    console.error("Get team error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid team ID.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong while retrieving the team.",
    });
  }
};

// Update a team
export const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, department } = req.body;

    const updates = {};

    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;

    // If department is being changed, verify the new department
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

      updates.department = department;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update.",
      });
    }

    const team = await Team.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate("department", "name");

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Team updated successfully.",
      data: team,
    });
  } catch (error) {
    console.error("Update team error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid team or department ID.",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong while updating the team.",
    });
  }
};

// Deactivate a team
export const deactivateTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await Team.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Team deactivated successfully.",
      data: team,
    });
  } catch (error) {
    console.error("Deactivate team error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid team ID.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong while deactivating the team.",
    });
  }
};
