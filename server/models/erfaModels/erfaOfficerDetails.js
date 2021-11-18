const mongoose = require("mongoose");
const ErfaOfficerDetailsSchema = new mongoose.Schema({
  officerid: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  designation: { type: String, required: true },
  cellnumber: { type: String, required: true },
  email: { type: String, required: true },
});

const erfaOfficer = mongoose.model("ErfaOfficer", ErfaOfficerDetailsSchema);
module.exports = erfaOfficer;
