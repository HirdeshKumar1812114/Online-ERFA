"use strict";

var mongoose = require("mongoose");

var ScholarshipPostSchema = new mongoose.Schema({
  title: {
    type: String
  },
  applicationstart: {
    type: String
  },
  applicationdeadline: {
    type: String
  },
  poster: {
    type: String
  },
  description: {
    type: String
  },
  postingdate: {
    type: Date,
    "default": Date.now
  },
  eligibility: String,
  tags: [String]
});
var sps = mongoose.model("Scholarshippost", ScholarshipPostSchema);
module.exports = sps;