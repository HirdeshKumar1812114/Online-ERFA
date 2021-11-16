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
  UserAdmin: require("./adminModels/userAdmin"),
  UserPanelist: require("./panelistModels/userPanelist"),
  UserStudent: require("./studentModels/userStudent"),
};
