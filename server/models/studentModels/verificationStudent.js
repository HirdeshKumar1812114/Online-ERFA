const mongoose = require("mongoose");
const verificationStudentSchema = new mongoose.Schema({
  regno: { type: String },
  studentname: { type: String },
  fathername: { type: String },
});

const verificationStudent = mongoose.model(
  "Verificationstudent",
  verificationStudentSchema
);
module.exports = verificationStudent;
