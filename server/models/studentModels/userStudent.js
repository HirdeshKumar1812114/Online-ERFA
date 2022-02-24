const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userStudentSchema = new mongoose.Schema({
  regid: { type: String},
  password: { type: String },
  firstname: { type: String},
  lastname: { type: String },
  program: { type: String },
  section: { type: String },
  cellnumber: { type: String },
  email: { type: String},
  dob: { type: String},
  permanentaddress: { type: String },
  mailingaddress: { type: String },
  fathername: { type: String },
  scholarship:[{type:mongoose.Schema.Types.ObjectId,
    ref:'Scholarshippost'
  }]
});

userStudentSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userStudentSchema.statics.checkPassword = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    return false;
  }
};

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
