// This controller will receive the submitted issue data and save it to the database.
import Issue from "../models/Issue.js";
import logIssueActivity from "../utils/logIssueActivity.js";
import IssueActivity from "../models/IssueActivity.js";
import Department from "../models/Department.js";
import Team from "../models/Team.js";


// Create a new issue

export const createIssue = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      imageUrl,
    } = req.body;

    // Validate required fields
    if (!title || !description || !category || !location) {
      return res.status(400).json({
        success: false,
        message: "Title, description, category, and location are required.",
      });
    }

    // Validate location details
    if (
      !location.address ||
      location.latitude === undefined ||
      location.longitude === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Address, latitude, and longitude are required.",
      });
    }

    const newIssue = await Issue.create({
      title,
      description,
      category,
      location,
      imageUrl: imageUrl || null,
      reportedBy: req.user.id,
    });

    // Record issue creation activity
    await logIssueActivity({
      issueId: newIssue._id,
      action: "created",
      description: "A new issue was reported.",
      performedBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Issue reported successfully!",
      data: newIssue,
    });

  } catch (error) {
    console.error("Issue creation error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong while reporting the issue.",
    });
  }
};



export const getAllIssues = async (req, res) => {
  try {
    const { status, category, department, search, location, page = 1, limit = 10 } = req.query;

    // Build filters
    const filters = {};
    // Citizens can only see their own reported issues
    if (req.user.role === "citizen") {
      filters.reportedBy = req.user.id;
    }

    if (status) {
      filters.status = status;
    }

    if (category) {
      filters.category = category;
    }

    if (department) {
      filters.assignedDepartment = department;
    }

    if (location) {
      filters.location = {
        $regex: location,
        $options: "i",
      };
    }

    if (search) {
      filters.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Citizens can only see their own issues
    if (req.user.accountType === "citizen") {
      filters.reportedBy = req.user.id;
    }

    // Department staff can only see issues assigned to their department
    if (req.user.accountType === "department") {
      filters.assignedDepartment = req.user.department;
    }

    // Maintenance staff can only see issues assigned to their team
    if (req.user.accountType === "maintenance") {
      filters.assignedTeam = req.user.team;
    }
    // Pagination
    const currentPage = Math.max(1, Number(page));
    const itemsPerPage = Math.min(100, Math.max(1, Number(limit)));

    const skip = (currentPage - 1) * itemsPerPage;

    // Retrieve issues
    const issues = await Issue.find(filters)
      .populate("assignedDepartment", "name")
      .populate("assignedTeam", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(itemsPerPage);

    // Count matching issues
    const totalIssues = await Issue.countDocuments(filters);

    const totalPages = Math.ceil(totalIssues / itemsPerPage);

    res.status(200).json({
      success: true,
      pagination: {
        totalIssues,
        totalPages,
        currentPage,
        itemsPerPage,
      },
      data: issues,
    });
  } catch (error) {
    console.error("Get issues error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong while retrieving issues.",
    });
  }
};


// Get a single issue by ID
export const getIssueById = async (req, res) => {
  try {
    const { id } = req.params;

    // Build the query filter
    const filters = { _id: id };

    // Citizens can only access their own issues
    if (req.user.accountType === "citizen") {
      filters.reportedBy = req.user.id;
    }

    // Find the issue using the filters
    const issue = await Issue.findOne(filters)
      .populate("assignedDepartment", "name")
      .populate("assignedTeam", "name");

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Issue retrieved successfully.",
      data: issue,
    });
  } catch (error) {
    console.error("Get issue error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid issue ID.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong while retrieving the issue.",
    });
  }
};




// Update an existing issue
export const updateIssue = async (req, res) => {
  try {
    const { id } = req.params;

    // Only allow these fields to be updated
    const allowedFields = [
      "title",
      "description",
      "category",
      "location",
    ];

    const updates = {};

    // Copy only permitted fields from req.body
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // Prevent empty updates
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update.",
      });
    }

    const updatedIssue = await Issue.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedIssue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Issue updated successfully.",
      data: updatedIssue,
    });

  } catch (error) {
    console.error("Update issue error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid issue ID.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong while updating the issue.",
    });
  }
};




// Delete an issue
export const deleteIssue = async (req, res) => {
  try {
    const { id } = req.params;

    const filters = { _id: id };

    const deletedIssue = await Issue.findOneAndDelete(filters);

    if (!deletedIssue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Issue deleted successfully.",
      data: deletedIssue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// Update issue status
export const updateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, resolutionNote } = req.body;

    const allowedStatuses = [
      "pending",
      "verified",
      "assigned",
      "in-progress",
      "resolved",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid issue status.",
      });
    }

    if (status === "resolved" && !resolutionNote?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Resolution note is required.",
      });
    }

    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found.",
      });
    }

    // Store the previous status before changing it
    const previousStatus = issue.status;

    issue.status = status;

    if (status === "in-progress" && !issue.startedAt) {
      issue.startedAt = new Date();
    }

    if (status === "resolved") {
      issue.resolvedAt = new Date();
      issue.resolutionNote = resolutionNote.trim();
    }

    await issue.save();

    // Record the status change
    await logIssueActivity({
      issueId: issue._id,
      action: status === "resolved" ? "resolved" : "status-updated",
      description: `Issue status changed from ${previousStatus} to ${status}.`,
      previousValue: previousStatus,
      newValue: status,
      performedBy: req.user.id,
    });

    res.status(200).json({
      success: true,
      message: "Issue progress updated successfully!",
      data: issue,
    });

  } catch (error) {
    console.error("Issue progress update error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid issue ID.",
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
      message: "Something went wrong while updating issue progress.",
    });
  }
};


// Assign an issue to a department and maintenance team
export const assignIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const { assignedDepartment, assignedTeam } = req.body;

    if (!assignedDepartment || !assignedTeam) {
      return res.status(400).json({
        success: false,
        message: "Department and maintenance team are required.",
      });
    }

    // Find the issue
    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found.",
      });
    }

    // Verify that the department exists and is active
    const department = await Department.findOne({
      _id: assignedDepartment,
      isActive: true,
    });

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Active department not found.",
      });
    }

    // Verify that the team belongs to the selected department
    const team = await Team.findOne({
      _id: assignedTeam,
      department: assignedDepartment,
      isActive: true,
    });

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Active team not found in the selected department.",
      });
    }

    const previousDepartment = issue.assignedDepartment;
    const previousTeam = issue.assignedTeam;

    // Assign department and team
    issue.assignedDepartment = department._id;
    issue.assignedTeam = team._id;
    issue.assignedAt = new Date();
    issue.status = "assigned";

    await issue.save();

    // Record the assignment activity
    await logIssueActivity({
      issueId: issue._id,
      action: "assigned",
      description: `Issue assigned to ${department.name} department and ${team.name}.`,
      previousValue: `${previousDepartment || "Not assigned"} - ${previousTeam || "Not assigned"}`,
      newValue: `${department.name} - ${team.name}`,
      performedBy: req.user.id,
    });

    // Return populated assignment details
    await issue.populate([
      { path: "assignedDepartment", select: "name" },
      { path: "assignedTeam", select: "name" },
    ]);

    res.status(200).json({
      success: true,
      message: "Issue assigned successfully!",
      data: issue,
    });
  } catch (error) {
    console.error("Issue assignment error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid issue, department, or team ID.",
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
      message: "Something went wrong while assigning the issue.",
    });
  }
};



// Get issue statistics
export const getIssueStats = async (req, res) => {
  try {
    const [totalIssues, pendingIssues, verifiedIssues, assignedIssues, inProgressIssues, resolvedIssues] = await Promise.all([
      Issue.countDocuments(),
      Issue.countDocuments({ status: "pending" }),   //This counts only documents whose status is pending.
      Issue.countDocuments({ status: "verified" }),
      Issue.countDocuments({ status: "assigned" }),
      Issue.countDocuments({ status: "in-progress" }),
      Issue.countDocuments({ status: "resolved" }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalIssues,
        pendingIssues,
        verifiedIssues,
        assignedIssues,
        inProgressIssues,
        resolvedIssues,
      },
    });
  } catch (error) {
    console.error("Issue statistics error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong while retrieving issue statistics.",
    });
  }
};


export const getIssuesByCategory = async (req, res) => {
  try {
    const categoryStats = await Issue.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: 1 },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: categoryStats,
    });
  } catch (error) {
    console.error("Category statistics error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong while retrieving category statistics.",
    });
  }
};



export const getIssueActivities = async (req, res) => {
  try {
    const { id } = req.params;
    const { action, page = 1, limit = 10 } = req.query;

    // Check whether the issue exists
    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found.",
      });
    }

    // Citizens can only view activities of their own issues
    if (req.user.accountType === "citizen" && issue.reportedBy !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: "Issue not found.",
      });
    }

    // Build filters
    const filters = {
      issueId: id,
    };

    if (action) {
      filters.action = action;
    }

    // Pagination
    const currentPage = Math.max(1, Number(page));
    const itemsPerPage = Math.min(100, Math.max(1, Number(limit)));
    const skip = (currentPage - 1) * itemsPerPage;

    // Retrieve activities
    const activities = await IssueActivity.find(filters)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(itemsPerPage);

    // Count matching activities
    const totalActivities = await IssueActivity.countDocuments(filters);

    const totalPages = Math.ceil(totalActivities / itemsPerPage);

    res.status(200).json({
      success: true,
      pagination: {
        totalActivities,
        totalPages,
        currentPage,
        itemsPerPage,
      },
      data: activities,
    });

  } catch (error) {
    console.error("Get issue activities error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid issue ID.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong while retrieving issue activities.",
    });
  }
};
