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
router.post("/interviewapplicationform",scholarshipFormController.fetchInterviewStudentScholarshipForm)
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
router.post("/sorttitlestatus",scholarshipFormController.sortStatusandTitle)
router.post("/evaluationstudent",scholarshipFormController.allocateScholarship)
router.post("/acceptedapplicationsscholarship",scholarshipFormController.fetchAllAcceptedByScholarshipId)
router.post("/acceptedapplicationsstudent",scholarshipFormController.fetchAllAcceptedByRegId)
router.post("/sendemailtofinalizedstudents",scholarshipFormController.sendScholarshipAcceptanceEmail)
module.exports = router;