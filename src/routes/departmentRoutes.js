
import express from "express";

import { requireAuth } from "../middleware/requireAuth.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deactivateDepartment,
} from "../controllers/departmentController.js";

const router = express.Router();

// Get all departments — authenticated users
router.get("/departments", requireAuth, getAllDepartments);

// Get one department — authenticated users
router.get("/departments/:id", requireAuth, getDepartmentById);

// Create department — admin only
router.post(
  "/departments",
  requireAuth,
  authorizeRoles("admin"),
  createDepartment
);

// Update department — admin only
router.patch(
  "/departments/:id",
  requireAuth,
  authorizeRoles("admin"),
  updateDepartment
);

// Deactivate department — admin only
router.patch(
  "/departments/:id/deactivate",
  requireAuth,
  authorizeRoles("admin"),
  deactivateDepartment
);

export default router;
