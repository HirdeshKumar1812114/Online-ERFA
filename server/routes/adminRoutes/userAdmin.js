var express = require("express");
var router = express.Router();
var adminController = require("../../controller/adminController/userAdmin");

router.post("/login", adminController.adminLogin);
module.exports = router;
