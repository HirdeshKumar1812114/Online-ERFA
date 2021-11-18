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

    if (checkStudent === null) {
      const newStudent = new db.UserStudent({
        regid: req.body.regid,
        password: req.body.password,
        name: req.body.name,
        program: req.body.program,
        section: req.body.section,
        cellnumber: req.body.cellnumber,
        email: req.body.email,
        dob: req.body.dob,
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
      res.status(400).send({ message: "User Registration Id already used" });
      res.end();
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

exports.getAllStudent = expressAsyncHandler(async function (req, res, next) {
  try {
    const fetchAllStudent = await db.UserStudent.find();
    if (fetchAllStudent) {
      res.status(200).send(fetchAllStudent);
      res.end();
    } else {
      res.staus(400).send({ message: "Error in retrieving students" });
    }
  } catch (err) {
    res.status(400).send({ message: "Error in catch block" });
  }
});

exports.deleteStudent = expressAsyncHandler(async function (req, res, next) {
  try {
    await db.UserStudent.findByIdAndRemove(req.params.id);
    res.json("Delete the student");
  } catch (err) {
    res.status(400).send("Error in delete catch block");
  }
});

exports.getStudent = expressAsyncHandler(async function (req, res, next) {
  try {
    const student = await db.UserStudent.findOne({ _id: req.params.id });
    if (student) {
      res.status(200).json({ message: "Details updated" });
      res.end();
    } else {
      res.status(400).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(400).send("Error in delete catch block");
  }
});

exports.updateStudent = expressAsyncHandler(async function (req, res, next) {
  try {
    const updateStudentOne = await db.UserStudent.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }
    );

    if (updateStudentOne) {
      res.status(200).json();
      res.end();
    } else {
      res.status(400).json({ message: "Not Saved in database" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
