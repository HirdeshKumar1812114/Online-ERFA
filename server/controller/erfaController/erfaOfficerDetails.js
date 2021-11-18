const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");

exports.addErfaOfficer = expressAsyncHandler(async (req, res, next) => {
  const checkRecord = await db.ErfaOfficer.findOne({
    officerid: req.body.officerid,
  });
  if (checkRecord === null) {
    const addNewUser = new db.UserErfa({
      username: req.body.username,
      password: req.body.password,
      usertype: "officer",
    });

    try {
      const user = await addNewUser.save();

      if (user) {
        const addNewOfficer = new db.ErfaOfficer({
          officerid: req.body.officerid,
          username: user.username,
          password: user.password,
          designation: req.body.designation,
          cellnumber: req.body.cellnumber,
          email: req.body.email,
        });
        try {
          const newOfficer = await addNewOfficer.save();
          if (newOfficer) {
            res.status(201).send({ message: "New User created" });
            res.end();
          } else {
            res.status(400).send({ message: "Error in catch block 3" });
          }
        } catch (err) {
          res.status(400).send({ message: "Error in catch block 2" });
        }
      }
    } catch (err) {
      res.status(400).send({ message: "Error in catch block 1" });
    }
  } else {
    res.status(400).send({ message: "Record Officer ID is alreadyused" });
  }
});

exports.getErfaOfficer = expressAsyncHandler(async (req, res, next) => {
  try {
    const officer = await db.ErfaOfficer.findOne({ officerid: req.params.id });
    if (officer) {
      res.status(200).send(officer);
      res.end();
    } else {
      res.status(400).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(400).send("Error in delete catch block");
  }
});

exports.getAllErfaOfficer = expressAsyncHandler(async (req, res, next) => {
  try {
    const officer = await db.ErfaOfficer.find();
    if (officer) {
      res.status(200).send(officer);
      res.end();
    } else {
      res.status(400).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(400).send("Error in delete catch block");
  }
});

exports.deleteErfaOfficer = expressAsyncHandler(async (req, res, next) => {
  try {
    await db.ErfaOfficer.findByIdAndRemove(req.params.id);
    res.json("Delete the ERFA Officer");
  } catch (err) {
    res.status(400).send("Error in delete catch block");
  }
});

exports.updateErfaOfficer = expressAsyncHandler(async function (
  req,
  res,
  next
) {
  try {
    const updateErfa = await db.ErfaOfficer.findByIdAndUpdate(req.params.id, {
      $set: {
        designation: req.body.designation,
        cellnumber: req.body.cellnumber,
        email: req.body.email,
      },
    });

    if (updateErfa) {
      res.status(200).json({ message: "Updated details" });
      res.end();
    } else {
      res.status(400).json({ message: "Not Saved in database" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
