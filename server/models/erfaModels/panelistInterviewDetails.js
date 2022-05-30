const mongoose = require('mongoose');
const InterviewPanelistSchema = mongoose.Schema({
date:{ type: String, required: true},
startTime:{ type: String, required: true},
endTime:{ type: String, required: true},
venue: { type: String, required: true },
scholarshipTitle: { type: String, required:true},
panelistId:{type:mongoose.Schema.Types.ObjectId,ref:'ErfaOfficer'},
})

const interviewPanelist = mongoose.model('InterviewPanelist',InterviewPanelistSchema )
module.exports=interviewPanelist;