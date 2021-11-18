const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserErfaSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  usertype: { type: String, required: true },
});

UserErfaSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserErfaSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email});
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      console.log("Correct User ");
      return user;
    }
    throw { message: "Incorrect Password" };
  }
  throw { message: "Incorrect Username" };
};

UserErfaSchema.statics.checkPassword = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    return false;
  }
};

const userErfa = mongoose.model("Usererfa", UserErfaSchema);
module.exports = userErfa;
s