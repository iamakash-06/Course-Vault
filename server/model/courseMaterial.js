import mongoose from 'mongoose';


const courseMaterialSchema = new mongoose.Schema({
    courseId: {
      type: String,
      required: true,
    },
    questionBanks: [
      {
        name: {
          type: String,
          required: true,
        },
        link: {
          type: String,
          required: true,
        },
      },
    ],
    referenceTextbooks: [
      {
        name: {
          type: String,
          required: true,
        },
        link: {
          type: String,
          required: true,
        },
      },
    ],
  });

    const CourseMaterial = mongoose.model('CourseMaterial', courseMaterialSchema);

    export default CourseMaterial;