var express = require("express");
var router = express.Router();
var erfaOfficerDetails = require("../../controller/erfaController/erfaOfficerDetails");
router.post("/addofficer", erfaOfficerDetails.addErfaOfficer);
router.get("/details/:id", erfaOfficerDetails.getErfaOfficer);
router.get("/details", erfaOfficerDetails.getAllErfaOfficer);
router.delete("/delete/:id", erfaOfficerDetails.deleteErfaOfficer);
router.put("/edit/:id", erfaOfficerDetails.updateErfaOfficer);

module.exports = router;
