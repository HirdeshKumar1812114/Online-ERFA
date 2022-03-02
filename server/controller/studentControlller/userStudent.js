const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");
const jwt = require("jsonwebtoken");
const maxAge = 2 * 24 * 60 * 60;
const createToken = (user) => {
  return jwt.sign({ _id: user._id, regid: user.regid }, "Don't tell", {
    expiresIn: maxAge,
  });
};

exports.checkToken = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) res.status(401).json({ msg: "No Token" });
  try {
    const decodedToken = jwt.verify(token, "Don't tell");
    req.user = decodedToken;
    console.log("Token decoded");
    next();
  } catch (e) {
    console.log("Token invalid decoded");
    // return res.status(400).json({ msg: "Token is not valid" });
  }
};
exports.studentSignUp = expressAsyncHandler(async (req, res) => {
  const regid = req.body.regid;
  console.log("Su- signup");
  try {
    const checkStudent = await db.UserStudent.findOne({ regid: regid });
    console.log("Su- try");
    if (checkStudent === null) {
      const newStudent = new db.UserStudent({
        regid: req.body.regid,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        program: req.body.program,
        section: req.body.section,
        cellnumber: req.body.cellnumber,
        email: req.body.email,
        dob: req.body.dob,
        permanentaddress: req.body.permanentaddress,
        mailingaddress: req.body.mailingaddress,
        fathername: req.body.fathername,
      });

      if (newStudent) {
        console.log("Su- try success");
        const confirmStudent = await newStudent.save();
        console.log(confirmStudent);
        res.status(200).json({ message: "New Student Successfully Added" });
      }
    } else {
      console.log("Su- try else ");
      res.status(400).json({ message: "User Registration Id already used" });
      res.end();
    }
  } catch {
    console.log("Su-catch  success");
    res.status(400).send({ message: "Error in adding! In catch block" });
  }
});

exports.studentLogin = expressAsyncHandler(async function (req, res, next) {
  const { regid, password } = req.body;
  try {
    const student = await db.UserStudent.login(regid, password);
    const token = createToken({ id: student._id, regid: student.regid });
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    // console.log(student);
    // console.log(token);
    const sendUserId = student._id;
    const sendRegId = student.regid;
    const sendStudentName = student.firstname;
    console.log(sendStudentName);
    console.log("Works at student verfication and token made.");
    res.status(200).send({ token, sendUserId, sendRegId, sendStudentName });
    res.end();
  } catch (err) {
    res.status(400).json({ message: err.message });
    // console.log(error);
  }
});

exports.studentLogout = expressAsyncHandler(async function (req, res, next) {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
});

exports.getAllStudent = expressAsyncHandler(async function (req, res, next) {
  try {
    const fetchAllStudent = await db.UserStudent.find();
    if (fetchAllStudent) {
      res.status(200).send(fetchAllStudent);
      res.end();
    } else {
      res.staus(400).send({ message: "Error in retrieving students" });
    }
  } catch (err) {
    res.status(400).send({ message: "Error in catch block" });
  }
});

exports.deleteStudent = expressAsyncHandler(async function (req, res, next) {
  try {
    await db.UserStudent.findByIdAndRemove(req.params.id);
    res.json("Delete the student");
    res.end();
  } catch (err) {
    res.status(400).send("Error in delete catch block");
  }
});

exports.getStudent = expressAsyncHandler(async function (req, res, next) {
  try {
    const student = await db.UserStudent.findOne({ _id: req.params.id });
    if (student) {
      res.status(200).json(student);
      res.end();
    } else {
      res.status(400).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(400).send("Error in delete catch block");
  }
});

exports.updateStudent = expressAsyncHandler(async function (req, res, next) {
  try {
    const updateStudentOne = await db.UserStudent.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }
    );

    if (updateStudentOne) {
      res.status(200).json("Student Details Update");
      res.end();
    } else {
      res.status(400).json({ message: "Not Saved in database" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

exports.changePassword = expressAsyncHandler(async (req, res) => {
  const { regid, oldpassword, newpassword } = req.body;
  const checkPass = await db.UserStudent.checkPassword(regid, oldpassword);
  if (checkPass) {
    checkPass.email = regid;
    checkPass.password = newpassword;
    try {
      await checkPass.save();
      res.status(200).json("Password update");
      res.end();
    } catch (error) {
      res.status(400).json("Password not update");
    }
  } else {
    res.status(400).json("Password not matched");
  }
});

exports.checkStudentEmail = expressAsyncHandler(async (req, res) => {
  const email = req.body.email;
  console.log(email);
  try {
    const checkEmail = await db.UserStudent.findOne({ email: email });
    console.log(email);
    if (checkEmail) {
      const msg = "Student Email is OK";
      const stdId = checkEmail.id;

      res.status(200).send({ msg, stdId });
      res.end();
    } else {
      res.status(400).json({ message: 'Student not is registered' })
    }

  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

exports.checkResetPassword = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(id)
  const checkPass = await db.UserStudent.findOne({ _id: id })
  if (checkPass) {
    console.log("before" + checkPass.password)
    checkPass.password = req.body.password;
    console.log("after" + checkPass.password)

    try {
      await checkPass.save();
      res.status(200).json("Password update");
      res.end();
    } catch (error) {
      res.status(400).json("Password not update");
    }
  } else {
    res.status(400).json("Error");
  }

})


exports.applyForScholarship= expressAsyncHandler(async (req, res)=>{
  console.log(req.body.regid)
  console.log(req.body.scholarship)
  const fetchRegid=req.body.regid;
  const fetchScholarship=req.body.scholarship;
  
  try{
    const addScholarshipToStudent= await db.UserStudent.findOneAndUpdate({regid:fetchRegid},{$push:{scholarship:fetchScholarship}})

    if(addScholarshipToStudent){

      res.status(200).send(addScholarshipToStudent)
      res.end();
    }else{

      res.status(400).send({message:'Error in Saving!'})
    }

    
  }
  catch(error){
    res.status(500).send("Error");
  }

})

exports.getStudentAppliedScholarship= expressAsyncHandler(async function (req, res, next){
  console.log(req.body.regid);
  try{

const fetchDocumenets=await db.UserStudent.findOne({regid:req.body.regid})
if(fetchDocumenets){
console.log(fetchDocumenets.scholarship);
res.status(200).send(fetchDocumenets.scholarship)
res.end();


}else{
  res.status(400).send({message:'Unable to fetch Students Applied Scholarship!'})
}

  }
  catch (error){

    res.status(500).send({message:error.message});
    res.end();
  }
})
