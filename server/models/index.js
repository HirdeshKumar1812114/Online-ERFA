const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://erfa:abc.123@onlineerfacluster.xy1gw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

module.exports = {
  UserErfa: require("./erfaModels/userErfa"),
  ErfaOfficer: require("./erfaModels/erfaOfficer"),
  UserPanelist: require("./panelistModels/userPanelist"),
  UserStudent: require("./studentModels/userStudent"),
};
