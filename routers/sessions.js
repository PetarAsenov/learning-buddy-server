const { Router } = require("express");
const Session = require("../models/").session;
const Subject = require("../models/").subject;
const User = require("../models/").user;
const Participant = require("../models/").participant;
const auth = require("../auth/middleware");


const router = new Router();

router.get("/sessions", async (req, res) => {
  const sessions = await Session.findAll({
    include: [
      { model: User, as: "teacher", attributes: ["name"] },
      { model: Subject, attributes: ["name"] },
      {
        model: Participant,
        include: { model: User, as: "participant", attributes: ["name"] },
      },
    ],
  });

  res.status(200).send(sessions);
});

router.get("/session/:id", async (req, res) => {
  const { id } = req.params;

  const sessionDetails = await Session.findByPk(id, {
    include: [
      { model: User, as: "teacher", attributes: ["name"] },
      { model: Subject, attributes: ["name"] },
      {
        model: Participant,
        include: { model: User, as: "participant", attributes: ["name"] },
      },
    ],
  });
  res.status(200).send(sessionDetails);
});

router.post("/sessions", auth, async (req, res) => {
  const {
    title,
    description,
    start_date,
    end_date,
    subject_id,
    teacher_id,
  } = req.body;

  if (!teacher_id === req.user.id) {
    return res
      .status(403)
      .send({ message: "You are not authorized to create a session" });
  }

  if (!title || !description || !start_date || !end_date || !subject_id) {
    return res
      .status(400)
      .send({ message: "A session must have all fields filled in" });
  }

  try {
    const session = await Session.create({
      title,
      description,
      start_date,
      end_date,
      subject_id,
      teacher_id,
    });

    return res.status(201).send({ message: "Session created", session });
  } catch (error) {
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

module.exports = router;
