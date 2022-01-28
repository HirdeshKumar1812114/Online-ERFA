const mongoose = require("mongoose");
const verficationStudentSchema = new mongoose.Schema({
  regno: { type: String },
  studentname: { type: String },
  fathername: { type: String },
});

const verficationStudent = mongoose.model(
  "Verficationstudent",
  verficationStudentSchema
);
module.exports = verficationStudent;
