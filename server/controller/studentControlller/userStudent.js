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
  const regid = req.body.regid;
  try {
    const checkStudent = await db.UserStudent.findOne({ regid: regid });

    if (!checkStudent) {
      const newStudent = new db.UserStudent({
        regid: req.body.regid,
        password: req.body.password,
        name: req.body.name,
        program: req.body.program,
        section: req.body.section,
        cellnumber: req.body.cellnumber,
        email: req.body.email,
        dob: ISODate(req.body.dob),
        permanentaddress: req.body.permanentaddress,
        mailingaddress: req.body.mailingaddress,
        fathername: req.body.fathername,
      });

      if (newStudent) {
        const confirmStudent = await newStudent.save();
        res.status(200).send(confirmStudent);
        res.end();
      }
    } else {
      res.status(400).send({ message: "Error in making a student" });
    }
  } catch {
    res.status(400).send({ message: "Error in adding! In catch block" });
  }
});

exports.studentLogin = expressAsyncHandler(async function (req, res, next) {
  const { regid, password } = req.body;
  try {
    const student = await db.UserStudent.login(regid, password);
    const token = createToken({ id: student._id, regid: student.regid });
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    console.log(student);
    console.log(token);
  } catch (error) {
    console.log(error);
  }
});

exports.studentLogout = expressAsyncHandler(async function (req, res, next) {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
});
