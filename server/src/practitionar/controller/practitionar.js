const express = require("express");

const router = express.Router();
const Practitionar = require("../../common/models/practitionar");

const verifyToken = require("../../common/utils/verifyToken");

const userModel = require("../../common/models/user");
const { json } = require("express/lib/response");

router.get("/", verifyToken, async (req, res) => {
  try {
    userModel.findById(req.userId.subject).then(async (user) => {
      user.practitionar.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      res.status(200).send(user.practitionar);
    });
  } catch (erorr) {
    res.send(500, { msg: "Something went wrong" });
  }
});

// nested block post
router.post("/", verifyToken, async (req, res) => {
  try {
    await userModel.findById(req.userId.subject).then(async (user) => {
      const practitionar = new Practitionar({
        icuSpecialist: req.body.icuSpecialist,
        name: req.body.name,
        email: req.body.email,
        startDateTime: req.body.startDateTime,
        endDateTime: req.body.endDateTime,
      });
      practitionar.save();
      user.practitionar.push(practitionar);
      user.save();
      res.status(201).send({ msg: "practitionar created" });
    });
  } catch (error) {
    res.send(500, { msg: "Something went wrong" });
  }
});

// nested block get

router.get("/:id", verifyToken, async (req, res) => {
  try {
    userModel.findById(req.userId.subject).then(async (user) => {
      res.status(200).send(user.practitionar.id(req.params.id));
    });
  } catch (erorr) {
    res.send(500, { msg: "Something went wrong" });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    userModel.findById(req.userId.subject, async (err, result) => {
      if (!err) {
        if (!result) {
          res.status(404).send("User was not found");
        } else {
          typeof req.body.icuSpecialist != "undefined"
            ? (result.practitionar.id(req.params.id).icuSpecialist =
                req.body.icuSpecialist)
            : null;
          req.body.name
            ? (result.practitionar.id(req.params.id).name = req.body.name)
            : null;
          req.body.email
            ? (result.practitionar.id(req.params.id).email = req.body.email)
            : null;
          req.body.startDateTime
            ? (result.practitionar.id(req.params.id).startDateTime =
                req.body.startDateTime)
            : null;
          req.body.endDateTime
            ? (result.practitionar.id(req.params.id).endDateTime =
                req.body.endDateTime)
            : null;
          await result.save((err) => {
            if (err) return res.status(500).send(err);
            res.status(200).send({ msg: "Update Successfull" });
          });
        }
      } else {
        res.status(500).send(err.message);
      }
    });
  } catch (error) {
    res.json({ msg: error });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    userModel.findById(req.userId.subject).then(async (user, error) => {
      if (!error) {
        if (user.practitionar.id(req.params.id)) {
          user.practitionar.id(req.params.id).remove(async (error, result) => {
            if (error) {
              return res.status(400).send({ msg: err });
            } else {
              await user.save();
              return res.status(200).send({ msg: "practitionar deleted" });
            }
          });
        } else {
          return res.status(404).send({ msg: "practitionar Not Found" });
        }
      } else {
        return res.status(500).send({ "Error:": error });
      }
    });
  } catch (erorr) {
    return res.send(500, { msg: "Something went wrong" });
  }
});

module.exports = router;
