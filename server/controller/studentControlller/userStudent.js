const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");

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
    console.log(student);
  } catch (error) {
    console.log(error);
  }
});
