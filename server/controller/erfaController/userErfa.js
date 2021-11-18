const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");
const jwt = require("jsonwebtoken");
const maxAge = 2 * 24 * 60 * 60;
const createToken = (user) => {
  return jwt.sign({ _id: user._id, username: user.username }, "Don't tell", {
    expiresIn: maxAge,
  });
};

exports.erfaLogin = expressAsyncHandler(async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const checkUser = await db.UserErfa.login(username, password);
    const token = createToken({
      id: checkUser._id,
      username: checkUser.username,
    });
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    const sendUserName = checkUser.username;
    const sendUserType = checkUser.usertype;
    /*console.log(checkUser);
    console.log(token);*/
    res.status(200).send({ token, sendUserName, sendUserType });
    res.end();
  } catch (err) {
    console.log(err);
  }
});

exports.erfaSignUp = expressAsyncHandler(async (req, res) => {
  const user = new db.UserErfa({
    username: req.body.username,
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
