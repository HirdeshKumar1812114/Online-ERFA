const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");

exports.adminLogin = expressAsyncHandler(async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const checkAdmin = await db.UserAdmin.login(username, password);
    console.log(checkAdmin);
  } catch (err) {
    console.log(err);
  }
});
