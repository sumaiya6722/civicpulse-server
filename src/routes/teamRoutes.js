import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

import {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deactivateTeam,
} from "../controllers/teamController.js";

const router = express.Router();

// Anyone authenticated can view teams
router.get("/teams", requireAuth, getAllTeams);
router.get("/teams/:id", requireAuth, getTeamById);

// Only admins can manage teams
router.post(
  "/teams",
  requireAuth,
  authorizeRoles("admin"),
  createTeam
);

router.patch(
  "/teams/:id",
  requireAuth,
  authorizeRoles("admin"),
  updateTeam
);

router.patch(
  "/teams/:id/deactivate",
  requireAuth,
  authorizeRoles("admin"),
  deactivateTeam
);

export default router;