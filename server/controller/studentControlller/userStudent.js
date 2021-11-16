const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");
const jwt = require("jsonwebtoken");
const maxAge = 2 * 24 * 60 * 60;
const createToken = (user) => {
  return jwt.sign({ ...user }, "Don't tell", {
    expiresIn: maxAge,
  });
};

exports.studentSignUp = expressAsyncHandler(async (req, res) => {
  const student = new db.UserStudent({
    regid: req.body.regid,
    password: req.body.password,
  });

  try {
    const newStudent = await student.save();
    res
      .status(201)
      .json({ message: "Student signed up successfuly", student: newStudent });
  } catch {
    res.status(400).json({ message: err.message });
  }
});

exports.studentLogin = expressAsyncHandler(async function (req, res, next) {
  const { regid, password } = req.body;
  try {
    const student = await db.UserStudent.login(regid, password);
    const token = createToken({ id: user._id, regid: regid });
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    console.log(student);
  } catch (error) {
    console.log(error);
  }
});

exports.studentLogout = expressAsyncHandler(async function (req, res, next) {});
res.cookie('jwt','',maxAge:1);
res.redirect('/')