var express = require("express");
var router = express.Router();
var erfaOfficerController = require("../../controller/erfaController/erfaOfficer");

router.post("/addofficer", erfaOfficerController.addErfaOfficer);
module.exports = router;
