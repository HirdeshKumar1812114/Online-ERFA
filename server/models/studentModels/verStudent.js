const mongoose = require("mongoose");
const verStudentSchema = new mongoose.Schema({
  regno: { type: String, required: true },
  studentname: { type: String, required: true },
  fathername: { type: String, required: true },
});

const verStudent = mongoose.model("Verstudent", verStudentSchema);

module.exports = verStudent;
