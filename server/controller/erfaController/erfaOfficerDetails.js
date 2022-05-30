const expressAsyncHandler = require("express-async-handler");
const db = require("../../models");

exports.addErfaOfficer = expressAsyncHandler(async (req, res, next) => {
  const checkRecord = await db.ErfaOfficer.findOne({
    email: req.body.email,
  });
  if (checkRecord === null) {
    const addNewUser = new db.UserErfa({
      email: req.body.email,
      password: req.body.password,
      usertype: req.body.designation,
    });

    try {
      const user = await addNewUser.save();

      if (user) {
        console.log(req.body);
        const addNewOfficer = new db.ErfaOfficer({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          password: user.password,
          designation: req.body.designation,
          cellnumber: req.body.cellNumber,
          email: user.email,
          nic: req.body.nic,
          dob: req.body.dob,
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
    res.status(200).send({ message: "userAlreadyExisted" });
    res.end();
  }
});

exports.getErfaOfficer = expressAsyncHandler(async (req, res, next) => {
  try {
    const officer = await db.ErfaOfficer.findOne({ _id: req.params.id });
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
    const officer = await db.ErfaOfficer.find({
      email: { $ne: "admin@szabist.pk" },
    });
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
  const take = await db.ErfaOfficer.findOne({ _id: req.params.id });
  const give = await db.UserErfa.findOne({ email: take.email });

  try {
    if (take && give) {
      await db.UserErfa.findByIdAndRemove({ _id: give._id });
      await db.ErfaOfficer.findByIdAndRemove({ _id: req.params.id });
      res.status(200).json("Delete the ERFA Officer");
      res.end();
    }
  } catch (err) {
    res.status(404).send("Error in delete catch block");
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
