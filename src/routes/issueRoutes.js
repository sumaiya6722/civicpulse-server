
import express from "express";

import { requireAuth } from "../middleware/requireAuth.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

import {
  createIssue,
  getIssueActivities,
  getIssuesByCategory,
  getIssueStats,
  assignIssue,
  getAllIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
  updateIssueStatus,
} from "../controllers/issueController.js";

const router = express.Router();

// Create an issue — citizens only
router.post(
  "/issues",
  requireAuth,
  authorizeRoles("citizen"),
  createIssue
);

// View all issues — all authenticated users
router.get("/issues", requireAuth, getAllIssues);

// View issue statistics — all authenticated users
router.get("/issues/stats", requireAuth, getIssueStats);
router.get("/issues/stats/category", requireAuth, getIssuesByCategory);

// View issue activities — all authenticated users
router.get(
  "/issues/:id/activities",
  requireAuth,
  getIssueActivities
);

// View a single issue — all authenticated users
router.get("/issues/:id", requireAuth, getIssueById);

// Update issue details — admin only
router.patch(
  "/issues/:id",
  requireAuth,
  authorizeRoles("admin"),
  updateIssue
);

// Delete issue — admin only
router.delete(
  "/issues/:id",
  requireAuth,
  authorizeRoles("admin"),
  deleteIssue
);

// Update issue status — admin, department, maintenance
router.patch(
  "/issues/:id/status",
  requireAuth,
  authorizeRoles("admin", "department", "maintenance"),
  updateIssueStatus
);

// Assign issue — admin only
router.patch("/issues/:id/assign",requireAuth,authorizeRoles("admin"),assignIssue);

export default router;
