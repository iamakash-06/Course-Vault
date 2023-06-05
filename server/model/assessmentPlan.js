import mongoose from 'mongoose';

const assessmentPlanSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
  },
  assessmentDateTime: {
    type: Date,
    required: true,
  },
  assessmentName: {
    type: String,
    required: true,
  },
  portions: {
    type: String,
    required: true,
  },
  weightage: {
    type: Number,
    required: true,
  },
});

const AssessmentPlan = mongoose.model('AssessmentPlan', assessmentPlanSchema);

export default AssessmentPlan;