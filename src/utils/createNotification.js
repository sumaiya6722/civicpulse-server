
import Notification from "../models/Notification.js";

const createNotification = async ({
  recipientId,
  issueId,
  type,
  title,
  message,
}) => {
  try {
    const notification = await Notification.create({
      recipientId,
      issueId,
      type,
      title,
      message,
    });

    return notification;
  } catch (error) {
    // A notification failure should not interrupt the main issue operation.
    console.error("Notification creation error:", error);
    return null;
  }
};

export default createNotification;
