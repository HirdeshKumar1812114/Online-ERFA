var express = require("express");
var router = express.Router();
var studentController = require("../../controller/studentControlller/userStudent");

router.post("/signup", studentController.studentSignUp);

router.post("/login", studentController.studentLogin);

module.exports = router;
