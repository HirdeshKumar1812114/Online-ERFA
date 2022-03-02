const mongoose = require('mongoose');
const scholarshipFormSchema = mongoose.Schema({

student: {type:mongoose.Schema.Types.ObjectId, ref:'Userstudent'  },
scholarship:{type:mongoose.Schema.Types.ObjectId,ref:'Scholarshippost'},
form:{type: String}
})

const scholarshipForm = mongoose.model('Scholarshipform',scholarshipFormSchema);
module.exports = scholarshipForm;



