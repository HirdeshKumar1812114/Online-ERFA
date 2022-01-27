const mongoose = require("mongoose");
const verifyStudentSchema = new mongoose.Schema({
  regno: { type: String, required: true },
  studentname: { type: String, required: true },
  fathername: { type: String, required: true },
});

const verifyStudent = mongoose.model("Verstudent", userStudentSchema);
module.exports = verStudent;
