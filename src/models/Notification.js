
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipientId: {
      type: String,
      required: true,
      index: true,
    },

    issueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Issue",
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: [
        "issue_submitted",
        "issue_under_review",
        "issue_assigned",
        "issue_in_progress",
        "issue_resolved",
        "issue_rejected",
      ],
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    readAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Efficiently retrieve a user's notifications.
notificationSchema.index({ recipientId: 1, createdAt: -1 });

// Efficiently count unread notifications.
notificationSchema.index({ recipientId: 1, isRead: 1 });

const Notification = mongoose.model(
  "Notification",
  notificationSchema
);

export default Notification;
