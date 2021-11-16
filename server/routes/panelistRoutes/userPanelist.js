var express = require("express");
var router = express.Router();
var panelistController = require("../../controller/panelistController/userPanelist");

router.post("/login", panelistController.login);
module.exports = router;
