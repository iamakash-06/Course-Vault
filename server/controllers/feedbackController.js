// controllers/feedbackController.js
import Feedback from '../model/feedback.js'

// Create feedback
export const createFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json({ success: true, feedback });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all feedback for a specific teacher
export const getFeedbackByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const feedback = await Feedback.find({ teacher: teacherId });
    res.status(200).json({ success: true, feedback });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};