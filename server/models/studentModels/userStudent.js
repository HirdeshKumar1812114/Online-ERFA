const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userStudentSchema = new mongoose.Schema({
  regid: { type: String, required: true },
  password: { type: String, required: true },
});

userStudentSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userStudentSchema.statics.login = async function (regid, password) {
  const student = await this.findOne({ regid });

  if (student) {
    const auth = await bcrypt.compare(password, student.password);
    if (auth) {
      return student;
    }
    throw { message: "Incorrect Password" };
  }
  throw { message: "Incorrect Registration ID" };
};
const userStudent = mongoose.model("Userstudent", userStudentSchema);
module.exports = userStudent;
