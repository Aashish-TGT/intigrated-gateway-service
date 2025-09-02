const Feedback = require('../models/Feedback');
// const { sendAutoResponse } = require('../utils/mailer'); // Email feature disabled

// Create new feedback
const createFeedback = async (req, res) => {
  try {
    console.log("📩 Incoming Request Body:", req.body);  // ✅ Log request body
    const feedback = await Feedback.create(req.body);

    // Auto-response disabled
    // if (req.body.email) {
    //   await sendAutoResponse(req.body.email, req.body.user);
    // }

    res.status(201).json(feedback); // ✅ Return created feedback
  } catch (error) {
    console.error("❌ Error while creating feedback:", error);  // ✅ Detailed error log
    res.status(500).json({ error: error.message });             // Internal server error
  }
};

// Get all feedbacks (for admin)
const getAllFeedback = async (req, res) => {
  try {
    const feedbackList = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbackList);
  } catch (error) {
    console.error("❌ Error fetching feedbacks:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createFeedback,
  getAllFeedback
};