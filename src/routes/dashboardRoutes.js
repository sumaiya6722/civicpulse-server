import express from "express";

import { getDashboardStats } from "../controllers/dashboardController.js";

import { requireAuth } from "../middleware/requireAuth.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.get(
  "/dashboard/stats",
  requireAuth,
  authorizeRoles("admin"),
  getDashboardStats
);

export default router;