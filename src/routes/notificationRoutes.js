
import express from "express";

import { requireAuth } from "../middleware/requireAuth.js";

import {
  getNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/notifications", requireAuth, getNotifications);

router.get(
  "/notifications/unread-count",
  requireAuth,
  getUnreadNotificationCount
);

router.patch(
  "/notifications/read-all",
  requireAuth,
  markAllNotificationsAsRead
);

router.patch(
  "/notifications/:id/read",
  requireAuth,
  markNotificationAsRead
);

export default router;
