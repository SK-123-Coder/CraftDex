// Store notification controller

import AdminNotification from "../../models/AdminNotification.js";

export const adminNotificationStorer = async (req, res) => {
  try {
    const { title, paragraph } = req.body;

    if (!title || !paragraph) {
      return res.status(400).json({
        message: "Title and paragraph are required",
      });
    }

    await AdminNotification.create({
      title,
      paragraph,
    });

    return res.sendStatus(201); // ✅ Only status code
  } catch (error) {
    return res.sendStatus(500);
  }
};