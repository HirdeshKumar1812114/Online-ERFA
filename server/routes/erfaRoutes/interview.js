var express = require("express");
var router = express.Router();

var interviewController= require("../../controller/erfaController/interview")

router.post('/schedule',interviewController.schedule)
router.get('/schedule/:id',interviewController.getInterviewDetail)
router.get('/getSchedule',interviewController.getAllInterviewDetails)
router.put('/reschedule/:id',interviewController.reSchedule)
router.delete('/schedule/remove/:id',interviewController.removeSchdule)

module.exports = router;