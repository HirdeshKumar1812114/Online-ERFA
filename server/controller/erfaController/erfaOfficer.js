const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");

exports.addErfaOfficer = expressAsyncHandler(async (req, res, next) => {
  try {
    const newUser = new db.UserErfa({
      username: req.body.username,
      password: req.body.password,
      usertype: "officer",
    });

    const newOfficer = new db.ErfaOfficer({
      officerid: req.body.officerid,
      username: req.body.username,
      password: req.body.password,
      designation: req.body.designation,
      cellnumber: req.body.cellnumber,
      email: req.body.email,
    });

    const checkNewUser = await newUser.save();

    const checkNewOfficer = await newOfficer.save();

    if (checkNewUser && checkNewOfficer) {
      res
        .status(201)
        .send({ newuser: checkNewUser, newofficer: checkNewOfficer });
      next();
    } else {
      res.status(400).send({ message: "Error in making new user." });
    }
  } catch (err) {
    res.status(400).json({ message: "Error in catch block" });
  }
});
exports.updateErfaOfficer = expressAsyncHandler(async (req, res, next) => {});
exports.viewErfaOfficer = expressAsyncHandler(async (req, res, next) => {});
exports.delteErfaOfficer = expressAsyncHandler(async (req, res, next) => {});
