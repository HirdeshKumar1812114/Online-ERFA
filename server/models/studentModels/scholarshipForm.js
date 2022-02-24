const mongoose = require('mongoose');
const scholarshipFormSchema = mongoose.Schema({
firstName:{type:'String',required:true},
lastName:{type:'String',required:true},
regId:{type:'String',required:true},
program:{type:'String',required:true},
section:{type:'String',required:true},
nice:{type:'String',required:true},
cellNumber:{type:'String',required:true},
fatherName:{type:'String',required:true},
mailingAddress:{type:'String',required:true},
permanentaddress:{type:'String',required:true},


})


