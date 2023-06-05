// models/Feedback.js
import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  feedbackText: {
    type: String,
    required: true,
  },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;