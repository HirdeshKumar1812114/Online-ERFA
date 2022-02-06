var express = require("express");
var router = express.Router();
var scholarshipPostController = require("../../controller/erfaController/scholarshipPost");
router.post(
  "/add",
  scholarshipPostController.uploadImage,
  scholarshipPostController.addScholarshipPost
);
router.get("/all", scholarshipPostController.getAllScholarship);
router.get("/view/:id", scholarshipPostController.getScholarship);
router.delete("/delete/:id", scholarshipPostController.deleteScholarship);
router.put(
  "/edit/:id",
  scholarshipPostController.uploadImage,
  scholarshipPostController.updateScholarship
);

router.get("/last3", scholarshipPostController.getLastThreeScholarship);
module.exports = router;
