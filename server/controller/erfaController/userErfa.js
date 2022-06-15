const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");
const jwt = require("jsonwebtoken");
const maxAge = 2 * 24 * 60 * 60;
const createToken = (user) => {
  return jwt.sign(
    { _id: user._id, email: user.email, username: user.name },
    "Don't tell",
    {
      expiresIn: maxAge,
    }
  );
};

exports.erfaLogin = expressAsyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const checkUser = await db.UserErfa.login(email, password);
    const checkUserEmail = await db.ErfaOfficer.findOne({
      email: checkUser.email,
    });

    const token = createToken({
      id: checkUser._id,
      email: checkUser.email,
      username: checkUserEmail.username,
    });
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    const sendUserType = checkUser.usertype;
    const sendUserName = checkUserEmail.firstname;
    const sendUserEmail = checkUserEmail.email;
// console.log(`sendUserName`, sendUserName)
// console.log('sendUserEmail :>> ', sendUserEmail);
    /*console.log(checkUser);
    console.log(token);*/
    res.status(200).send({ token, sendUserType, sendUserName, sendUserEmail });
    res.end();
  } catch (err) {
    res.status(404).send({ message:'User Not Found'});
    res.end();
  }
});

exports.erfaSignUp = expressAsyncHandler(async (req, res) => {
  const user = new db.UserErfa({
    email: req.body.email,
    password: req.body.password,
    usertype: req.body.designation,
  });

  try {
    const newuser = await user.save();
    res.status(200).json({ user: newuser });
    res.end();
  } catch (err) {
    console.log(err);
  }
});

exports.checkToken = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) res.status(401).json({ msg: "No Token" });
  try {
    const decodedToken = jwt.verify(token, "Don't tell");
    req.user = decodedToken;
    next();
  } catch (e) {
    return;
    res.status(400).json({ msg: "Token is not valid" });
  }
};
exports.changePassword = expressAsyncHandler(async (req, res) => {
  const { email, oldpassword, newpassword } = req.body;
  const checkPass = await db.UserErfa.checkPassword(email, oldpassword);
  if (checkPass) {
    checkPass.email = email;
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

exports.checkUserEmail = expressAsyncHandler(async (req, res)=>{
  const email = req.body.email;
  console.log(email);
  try{
  const checkEmail= await db.UserErfa.findOne({email: email});
  console.log(email);
  if(checkEmail){

    const msg ="User Email is OK";
    const stdId=checkEmail.id;
  res.status(200).json({msg,stdId})
  res.status(200).send()

  res.end();
  }else{
    res.status(400).json({message:'User not is registered'})
  }
  
  }
  catch(error){
    res.status(400).json({ message: error.message });
  }
  });


  exports.checkResetPassword=expressAsyncHandler(async (req,res)=>{
    const  id = req.params.id;
  // console.log(id)
    const checkPass = await db.UserErfa.findOne({_id:id})
    const checkErfaDetails = await db.ErfaOfficer.findOne({email:checkPass.email})
    // console.log(checkPass)
    // console.log("Erfa detail:")
    // console.log(checkErfaDetails)
    if (checkPass && checkErfaDetails) {

      // console.log("before"+ checkPass.password)
      checkPass.password = req.body.password;
      // console.log("after erfa user:"+ checkPass.password)
      const checkPass2 =await checkPass.save();
      checkErfaDetails.password = checkPass2.password;
      // console.log("after erfa details:"+ checkErfaDetails.password)
      try {
        const checkErfaDetails2 =await checkErfaDetails.save();
        res.status(200).json("Password update");
        res.end();
      } catch (error) {
        res.status(400).json("Password not update");
      }
    } else {
      res.status(400).json("Error");
    }
  
  })