
import Notification from "../models/Notification.js";

// Get notifications for the logged-in user
export const getNotifications = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    const filter = {
      recipientId: req.user.id,
    };

    const [notifications, totalNotifications] = await Promise.all([
      Notification.find(filter)
        .populate("issueId", "title status")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Notification.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      pagination: {
        totalNotifications,
        currentPage: page,
        totalPages: Math.ceil(totalNotifications / limit),
        limit,
      },
      data: notifications,
    });
  } catch (error) {
    console.error("Get notifications error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve notifications.",
    });
  }
};

// Get unread notification count
export const getUnreadNotificationCount = async (req, res) => {
  try {
    const unreadCount = await Notification.countDocuments({
      recipientId: req.user.id,
      isRead: false,
    });

    return res.status(200).json({
      success: true,
      data: { unreadCount },
    });
  } catch (error) {
    console.error("Unread notification count error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve unread notification count.",
    });
  }
};

// Mark one notification as read
export const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findOneAndUpdate(
      {
        _id: id,
        recipientId: req.user.id,
      },
      {
        isRead: true,
        readAt: new Date(),
      },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification marked as read.",
      data: notification,
    });
  } catch (error) {
    console.error("Mark notification as read error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update notification.",
    });
  }
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async (req, res) => {
  try {
    const result = await Notification.updateMany(
      {
        recipientId: req.user.id,
        isRead: false,
      },
      {
        isRead: true,
        readAt: new Date(),
      }
    );

    return res.status(200).json({
      success: true,
      message: "All notifications marked as read.",
      data: {
        modifiedCount: result.modifiedCount,
      },
    });
  } catch (error) {
    console.error("Mark all notifications as read error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update notifications.",
    });
  }
};
