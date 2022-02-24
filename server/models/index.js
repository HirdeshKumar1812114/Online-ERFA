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
  ScholarshipPost: require("./erfaModels/scholarshipPost"),
  ErfaOfficer: require("./erfaModels/erfaOfficerDetails"),
  UserErfa: require("./erfaModels/userErfa"),
  UserPanelist: require("./panelistModels/userPanelist"),
  UserStudent: require("./studentModels/userStudent"),
  VerificationStudent: require("./studentModels/verificationStudent"),
  Interview: require("./erfaModels/interview")
};
