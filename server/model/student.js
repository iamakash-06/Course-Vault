import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    studentId: String,
    name: String,
    department: String,
    class: String,
    attendance: [
      {
        date: Date,
        period: String,
        status: String,
      },
    ],
  });
  
  // Create the Student model
const Student = mongoose.model('Student', studentSchema);
export default Student;