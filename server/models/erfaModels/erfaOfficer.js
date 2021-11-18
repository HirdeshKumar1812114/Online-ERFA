const mongoose = require("mongoose");
const ErfaOfficerSchema = new mongoose.Schema({
  officerid: { type: Number, required: true },
  username: { type: String, required: true },
  designation: { type: String, required: true },
  cellnumber: { type: String, required: true },
  email: { type: String, required: true },
});

const erfaOfficer = mongoose.model("Erfaofficer", ErfaOfficerSchema);
module.exports = erfaOfficer;
