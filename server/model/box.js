
import mongoose from 'mongoose';
const boxSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
  semester: String, // Add the semester field
});  

const Box = mongoose.model('Box', boxSchema);

export default Box;