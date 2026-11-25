
import express from "express";

import {
  createStaffAccount, createStaffAccount,
  getAllStaff,
  updateStaffAccount
} from "../controllers/staffController.js";

import { requireAuth } from "../middleware/requireAuth.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { deactivateStaffAccount, reactivateStaffAccount } from "../controllers/staffController.js";

const router = express.Router();

// Only CivicPulse admins can create staff accounts
router.post(
  "/staff",
  requireAuth,
  authorizeRoles("admin"),
  createStaffAccount
);

// Get all staff accounts
router.get(
  "/staff",
  requireAuth,
  authorizeRoles("admin"),
  getAllStaff
);

router.patch(
  "/staff/:id",
  requireAuth,
  authorizeRoles("admin"),
  updateStaffAccount
);


router.patch(
  "/staff/:id/deactivate",
  requireAuth,
  authorizeRoles("admin"),
  deactivateStaffAccount
);

router.patch(
  "/staff/:id/reactivate",
  requireAuth,
  authorizeRoles("admin"),
  reactivateStaffAccount
);


export default router;
