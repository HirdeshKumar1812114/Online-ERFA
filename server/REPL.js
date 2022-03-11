const db = require("../server/models/index");

db.ScholarshipForm.aggregate([
    {
        $lookup:{
            from:'scholarshipposts',
            localField:"scholarship",
            foreignField:"_id",
            as:"scholarshipdetails"
        }
      
    },
    {
      $project:{
          "_id":1,
          "student":1,
         "scholarship":1,
         "form":1, 
         "status":1,
         "messageStudent":1,
         "messageOfficer":1,

          "scholarshipdetails.title":1
      }  
    }
])
.then(scholarship=>{console.log(JSON.stringify(scholarship,null,'\t'))
process.exit();
})