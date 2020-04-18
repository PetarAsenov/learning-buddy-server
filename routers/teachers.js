const { Router } = require("express");
const db = require("../models/");
const Op = db.Sequelize.Op;
const Session = require("../models/").session;
const Review = require("../models/").review;
const User = require("../models/").user;
const Subject = require("../models/").subject;
const auth = require("../auth/middleware");

const router = new Router();

router.get("/teachers", async (req, res) => {
  const name = req.query.name;
  const condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  const teachers = await User.findAll({
    where: { ...condition, role: "teacher" },
    attributes: ["id", "name", "email", "image_Url", "description", "role"],
    include: [
      { model: Session, as: "my-sessions" },
      {
        model: Session,
        as: "my-sessions",
        include: [{ model: Subject, attributes: ["name"] }],
      },
      { model: Review, as: "received-reviews" },
    ],
  });

  res.status(200).send(teachers);
});

router.get("/teacher/:id", async (req, res) => {
  const { id } = req.params;

  const teacherDetails = await User.findByPk(id, {
    attributes: ["id", "name", "email", "image_Url", "description", "role"],
    include: [
      {
        model: Session,
        as: "my-sessions",
        include: [{ model: Subject, attributes: ["name"] }],
      },
      Session,
      { model: Review, as: "received-reviews" },
    ],
  });
  res.status(200).send(teacherDetails);
});

router.post("/teacher/:id/review", auth, async (req, res) => {
  const { id } = req.params;
  const { rate, comment } = req.body;

  const reviewer_id = req.user.id;

  try {
    const idArray = await Review.findAll().map((r) => r.id);
    const maxId = Math.max(...idArray);

    const review = await Review.create({
      id: maxId + 1,
      rate,
      comment,
      teacher_id: id,
      reviewer_id,
    });

    return res
      .status(201)
      .send({ message: "Your review was created!", review });
  } catch (error) {
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.delete("/teacher/reviews", auth, async (req, res) => {
  const { id, reviewer_id } = req.body;

  if (reviewer_id !== req.user.id) {
    return res
      .status(403)
      .send({ message: "You are not authorized to delete this review" });
  }

  try {
    const review = await Review.findByPk(id);
    await review.destroy();

    return res.send({ message: "Your review was deleted!" });
  } catch (error) {
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

module.exports = router;
