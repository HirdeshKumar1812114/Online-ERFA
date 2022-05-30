const mongoose = require('mongoose');
const EvaluationScholarshipApplicationsSchema= mongoose.Schema({
score:{ type: String, required: true},
remark:{ type: String, required: true},
application:{type:mongoose.Schema.Types.ObjectId,ref:'Scholarshipform'},
panelist:{type:mongoose.Schema.Types.ObjectId,ref:'ErfaOfficer'},
})

const esas= mongoose.model('EvaluationScholarshipApplications',EvaluationScholarshipApplicationsSchema)
module.exports=esas;