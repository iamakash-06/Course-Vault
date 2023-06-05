import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  scores: [
    {
      assessment: {
        type: String,
        required: true,
      },
      individualScore: {
        type: Number,
        required: true,
      },
      totalScore: {
        type: Number,
        required: true,
      },
      classHighest: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Grade = mongoose.model('Grade', gradeSchema);

export default Grade;