var express = require("express");
var router = express.Router();
var scholarshipFormController = require("../../controller/studentControlller/scholarshipForm");
router.post(
    "/add",
    scholarshipFormController.uploadForm,
    scholarshipFormController.addScholarshipForm
);
router.get("/all", scholarshipFormController.getAllScholarshipForm);
router.get("/view/:id", scholarshipFormController.getScholarshipForm);
router.post("/applicationform",scholarshipFormController.fetchStudentScholarshipForm)
router.delete("/delete/:id", scholarshipFormController.deleteScholarshipForm);
router.put("/sendstudentmessage/:id",scholarshipFormController.updateMessageStudent)
router.put("/sendofficer/:id",scholarshipFormController.updateOfficer)
router.put("/sendappcomplete/:id",scholarshipFormController.updateApplicationComplete)
router.put(
    "/edit/:id",
    scholarshipFormController.uploadForm,
    scholarshipFormController.updateScholarshipForm
  );
router.post("/sortstatus",scholarshipFormController.sortStatus)

module.exports = router;