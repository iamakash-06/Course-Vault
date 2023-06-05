import mongoose from 'mongoose';

const lecturePlanSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
    },
  lectureNo: {
    type: Number,
    required: true,
  },
  lectureName: {
    type: String,
    required: true,
  },
  topics: {
    type: String,
    required: true,
  },
});

const LecturePlan = mongoose.model('LecturePlan', lecturePlanSchema);

export default LecturePlan;