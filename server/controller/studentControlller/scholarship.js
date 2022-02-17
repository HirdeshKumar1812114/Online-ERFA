const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");

exports.checkEligibility = expressAsyncHandler(async(req,res,next) =>{
// console.log(req.body)
let {program,scholarship} = req.body
try{
var fectchScholarship = await db.ScholarshipPost.findOne({"_id" : scholarship});
let elegei = fectchScholarship.checkedPrograms
let isElegible = elegei.search(program)
if(isElegible!=-1){
    res.send({message:'User is Eligible'}).status(202)
}else{
    res.send({message:'User is Not Eligible'}).status(406)

}
}
catch (e){
    console.log('Error occured:',e);
}
res.end()
})