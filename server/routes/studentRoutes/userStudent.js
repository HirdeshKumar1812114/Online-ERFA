const jwt = require("jsonwebtoken");
var express = require("express");
var router = express.Router();
var studentController = require("../../controller/studentControlller/userStudent");
const {
  requireAuth,
  checkStudent,
  checkUserErfa,
} = require("../../middleware/authMiddleware");

router.post("/signup", studentController.studentSignUp);
router.get("/getallstudents", studentController.getAllStudent);
router.post("/login", studentController.studentLogin);
router.post("/dashboard");
router.delete("/delete/:id", studentController.deleteStudent);
router.get("/find/:id", studentController.getStudent);
router.put("/edit/:id", studentController.updateStudent);
module.exports = router;
