const db = require("../server/models/index");

const InId= "62174f6a8ac04163c9b589e0";
db.ScholarshipForm.aggregate([
  
    {
        $lookup:{
            from:'scholarshipposts',
            localField:"scholarship",
            foreignField:"_id",
            as:"scholarshipdetails"
        },
      
    },{$unwind:"$scholarshipdetails"},
    {$lookup:{
      from:'userstudents',
      localField:"student",
      foreignField:"_id",
      as:"studentdetails"
    }},{$unwind:"$studentdetails"},{
      $project:{
          "_id":1,
          "student":1,
         "scholarship":1,
         "form":1, 
         "status":1,
         "messageStudent":1,
         "messageOfficer":1,

          "scholarshipdetails.title":1,
          "scholarshipdetails.applicationstart":1,
          "scholarshipdetails.applicationdeadline":1,
          "studentdetails.regid":1,
          "studentdetails.firstname":1,
          "studentdetails.lastname":1,
          "studentdetails.section":1,
          "studentsdetails.email":1            
      }  
    },  {
        $addFields: {
           "interview": InId
        }
     },
]).then(students =>{
    console.log(JSON.stringify(students, null, '\t' ));
    process.exit();
})