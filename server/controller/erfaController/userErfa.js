const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");
const jwt = require("jsonwebtoken");
const maxAge = 2 * 24 * 60 * 60;
const createToken = (user) => {
  return jwt.sign({ ...user }, "Don't tell", { expiresIn: maxAge });
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
    console.log(checkUser);
    console.log(token);
    const sendUserName = checkUser.username;
    const sendUserType = checkUser.usertype;

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
