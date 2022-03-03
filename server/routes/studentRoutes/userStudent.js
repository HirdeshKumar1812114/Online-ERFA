const jwt = require("jsonwebtoken");
var express = require("express");
var router = express.Router();
var studentController = require("../../controller/studentControlller/userStudent");
var verfiStudentController = require("../../controller/studentControlller/verificationStudent");
const {
  requireAuth,
  checkStudent,
  checkUserErfa,
} = require("../../middleware/authMiddleware");

router.get(
  "/announcements",
  studentController.checkToken,
  function (req, res, next) {
    console.log("Token verified");
    res.status(200).send("verifiedUser");
    res.end();
  }
);
router.post("/checksignup", verfiStudentController.verfiStudent);
router.post("/checkemail", studentController.checkStudentEmail);
router.post("/reset-password/:id", studentController.checkResetPassword)
router.post("/signup", studentController.studentSignUp);
router.get("/getallstudents", studentController.getAllStudent);
router.post("/login", studentController.studentLogin);
router.post("/announcements");
router.delete("/delete/:id", studentController.deleteStudent);
router.get("/find/:id", studentController.getStudent);
router.put("/edit/:id", studentController.updateStudent);
router.post("/applyscholarship",studentController.applyForScholarship)
router.post("/appliedscholarships", studentController.getStudentAppliedScholarship)
module.exports = router;
