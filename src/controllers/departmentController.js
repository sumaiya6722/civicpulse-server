import Department from "../models/Department.js";

// Create a department
export const createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;

    const department = await Department.create({
      name,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Department created successfully.",
      data: department,
    });
  } catch (error) {
    console.error("Create department error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This department already exists.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong while creating the department.",
    });
  }
};

// Get all departments
export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      results: departments.length,
      data: departments,
    });
  } catch (error) {
    console.error("Get departments error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong while retrieving departments.",
    });
  }
};

// Get a single department
export const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findById(id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: department,
    });
  } catch (error) {
    console.error("Get department error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid department ID.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong while retrieving the department.",
    });
  }
};

// Update a department
export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updates = {};

    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update.",
      });
    }

    const department = await Department.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Department updated successfully.",
      data: department,
    });
  } catch (error) {
    console.error("Update department error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid department ID.",
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A department with this name already exists.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong while updating the department.",
    });
  }
};

// Deactivate a department
export const deactivateDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Department deactivated successfully.",
      data: department,
    });
  } catch (error) {
    console.error("Deactivate department error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid department ID.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong while deactivating the department.",
    });
  }
};
