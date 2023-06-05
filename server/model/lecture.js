
import mongoose from 'mongoose';
const lectureSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
  },
  lectureNumber: {
    type: Number,
    required: true,
  },
  lectureName: {
    type: String,
    required: true,
  },
  lectureVideoLink: {
    type: String,
    required: true,
  },
  additionalResources: {
    type: [String],
  },
});

const Lecture = mongoose.model('Lecture', lectureSchema);

export default Lecture;