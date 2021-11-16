const jwt = require("jsonwebtoken");

const stdrequireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verfiy(token, "Don't tell", (err, decoded) => {
      if (err) {
        console.log(err);
        res.redirect("/login");
      } else {
        console.log(decodedtoken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

const checkstd = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verfiy(token, "Don't tell", (err, decoded) => {
      if (err) {
        console.log(err);
        res.locals.user = null;
      } else {
        console.log(decodedtoken);
        res.locals.user = decodedtoken.regid;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { stdrequireAuth, checkstd };
