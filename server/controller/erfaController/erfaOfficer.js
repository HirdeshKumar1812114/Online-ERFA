const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");

exports.addErfaOfficer = expressAsyncHandler(async (req, res, next) => {
  try {
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});
exports.updateErfaOfficer = expressAsyncHandler(async (req, res, next) => {});
exports.viewErfaOfficer = expressAsyncHandler(async (req, res, next) => {});
exports.delteErfaOfficer = expressAsyncHandler(async (req, res, next) => {});
