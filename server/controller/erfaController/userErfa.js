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

    const sendEmail = checkUser.email;
    const sendUserType = checkUser.usertype;
    const sendUserName = checkUserEmail.username;
    /*console.log(checkUser);
    console.log(token);*/
    res.status(200).send({ token, sendEmail, sendUserType, sendUserName });
    res.end();
  } catch (err) {
    console.log(err);
  }
});

exports.erfaSignUp = expressAsyncHandler(async (req, res) => {
  const user = new db.UserErfa({
    email: req.body.email,
    password: req.body.password,
    usertype: req.body.usertype,
  });

  try {
    const newuser = await user.save();
    res.status(200).json({ user: newuser });
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
    } catch (error) {
      res.status(400).json("Password not update");
    }
  } else {
    res.status(400).json("Password not matched");
  }
});
