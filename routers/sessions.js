const { Router } = require("express");
const Session = require("../models/").session;
const Subject = require("../models/").subject;
const User = require("../models/").user;
const Participant = require("../models/").participant;


const router = new Router();


router.get("/sessions", async (req, res) => {

  const sessions = await Session.findAll({include:[{model:User, as: 'teacher',attributes: ["name"]},{model:Subject,attributes: ["name"]},{model:Participant,include:{model: User, as: 'participant',attributes: ["name"]}}]})
  
  res.status(200).send( sessions );
});

module.exports = router;
