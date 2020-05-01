const { Router } = require("express");
const Session = require("../models/").session;
const User = require("../models/").user;
const Subject = require("../models/").subject;
const Participant = require("../models/").participant

const router = new Router();

router.get("/subjects", async (req, res) => {
  const subjects = await Subject.findAll({
  });

  res.status(200).send(subjects);
});

router.get("/subjects/:id", async (req, res) => {
  const { id } = req.params;

  const subjectDetails = await Subject.findByPk(id, {
    order: [[{model: Session},"start_date", "DESC"]],
    include: [{model: Session,
      include: [
        { model: User, as: "teacher", attributes: ["name"] },
        {
          model: Participant,
          include: { model: User, as: "participant", attributes: ["name"] },
        },
      ],
    }]
  });
  res.status(200).send(subjectDetails);
});


module.exports = router;
