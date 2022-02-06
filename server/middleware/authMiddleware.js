const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verfiy(token, "Don't tell", (err, decodedToken) => {
      if (err) {
        // console.log(err);
        res.redirect("/login");
      } else {
        // console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

const checkStudent = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verfiy(token, "Don't tell", (err, decodedToken) => {
      if (err) {
        // console.log(err);
        res.locals.user = null;
        res.status(400).send("Token is invalid");
      } else {
        // console.log(decodedToken);
        res.locals.user = decodedToken.regid;
        res.status(200).send("Token is valid");
        next();
      }
    });
  } else {
    res.status(400).send("Token is not made");
    res.locals.user = null;
    next();
  }
};

const checkUserErfa = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verfiy(token, "Don't tell", (err, decodedToken) => {
      if (err) {
        // console.log(err);
        res.locals.user = null;
        res.status(400).send("Token is invalid");
      } else {
        // console.log(decodedToken);
        res.locals.user = decodedToken.username;
        res.status(200).send("Token is valid");
        next();
      }
    });
  } else {
    res.status(400).send("Token is not made");
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkStudent, checkUserErfa };
