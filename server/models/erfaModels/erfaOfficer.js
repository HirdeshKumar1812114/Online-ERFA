const mongoose = require("mongoose");
const ErfaOfficerSchema = new mongoose.Schema({
  officerid: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  designation: { type: String, required: true },
  cellnumber: { type: String, required: true },
  email: { type: String, required: true },
});

ErfaOfficerSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const erfaOfficer = mongoose.model("Erfaofficer", ErfaOfficerSchema);
module.exports = erfaOfficer;
