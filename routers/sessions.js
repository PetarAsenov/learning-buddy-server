const { Router } = require("express");
const db = require("../models/");
const Op = db.Sequelize.Op;
const Session = require("../models/").session;
const Subject = require("../models/").subject;
const User = require("../models/").user;
const Participant = require("../models/").participant;
const auth = require("../auth/middleware");

const router = new Router();

router.get("/sessions", async (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  const sessions = await Session.findAll({
    where: condition,
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

router.delete("/session/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { teacher_id } = req.body;
  const reqId = req.user.id;

  if (teacher_id !== req.user.id) {
    return res
      .status(403)
      .send({
        message: "You are not authorized to delete this session",
        reqId,
        teacher_id,
      });
  }

  await Session.destroy({ where: { id: id } });
  res.send({ message: "Session was deleted" });
});

router.post("/session/:id/book", auth, async (req, res) => {
  const { id } = req.params;

  const participant_id = req.user.id;

  const participantCheck = await Participant.findOne({
    where: { session_id: id, participant_id },
  });

  if (participantCheck !== null) {
    return res
      .status(403)
      .send({ message: "You've already booked this session" });
  }

  try {
    const idArray = await Participant.findAll().map((p) => p.id);
    const maxId = Math.max(...idArray);
    const participant = await Participant.create({
      id: maxId + 1,
      session_id: id,
      participant_id,
    });

    return res
      .status(201)
      .send({ message: "You booked the session, enjoy!", participant });
  } catch (error) {
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.delete("/session/:id/book", auth, async (req, res) => {
  const { id } = req.params;

  const participant_id = req.user.id;

  const participantCheck = await Participant.findOne({
    where: { session_id: id, participant_id },
  });

  if (participantCheck === null) {
    return res
      .status(403)
      .send({ message: "You are not registered for this session" });
  }

  try {
    await participantCheck.destroy();
    res.send({ message: "You unbooked this session" });
  } catch (error) {
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.patch("/session/:id", async (req, res) => {
  const { id } = req.params;
  const session = await Session.findByPk(id);
  const { title, description, start_date, end_date, subject_id } = req.body;
  await session.update({
    title,
    description,
    start_date,
    end_date,
    subject_id,
  });
  res.send({ session });
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
    const idArray = await Session.findAll().map((s) => s.id);
    const maxId = Math.max(...idArray);

    const session = await Session.create({
      id: maxId + 1,
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
