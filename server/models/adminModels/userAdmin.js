const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userAdminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  usertype: { type: String, required: true },
});

userAdminSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userAdminSchema.statics.login = async function (username, password) {
  const admin = await this.findOne({ username });
  if (admin) {
    const auth = await bcrypt.compare(password, admin.password);
    if (auth) {
      return admin;
    }
    throw { message: "Incorrect Password" };
  }
  throw { message: "Incorrect Username" };
};

const userAdmin = mongoose.model("useradmin", userAdminSchema);
module.exports = userAdmin;
