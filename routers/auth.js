const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const User = require("../models/").user;
const Session = require("../models/").session;
const Subject = require("../models/").subject;
const Review = require("../models/").review;

const { SALT_ROUNDS } = require("../config/constants");

const router = new Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both email and password" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        message: "User with that email not found or password incorrect",
      });
    }

    delete user.dataValues["password"]; // don't send back the password hash
    const token = toJWT({ userId: user.id });
    return res.status(200).send({ token, ...user.dataValues });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.post("/signup", async (req, res) => {
  const { email, password, name, image_Url, description, role } = req.body;
  if (!email || !password || !name || !role) {
    return res
      .status(400)
      .send("Please provide an email, password, name, and role");
  }

  try {
    const idArray = await User.findAll().map(user => user.id)
    const maxId = Math.max(...idArray)

    const newUser = await User.create({
      id:maxId + 1,
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      name,
      image_Url,
      description,
      role,
    });

    delete newUser.dataValues["password"]; // don't send back the password hash

    const token = toJWT({ userId: newUser.id });

    res.status(201).json({ token, ...newUser.dataValues });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }

    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

// The /me endpoint can be used to:
// - get the users email & name using only their token
// - checking if a token is (still) valid
router.get("/me", authMiddleware, async (req, res) => {
  // don't send back the password hash
  delete req.user.dataValues["password"];
  res.status(200).send({ ...req.user.dataValues });
});

router.get("/myprofile", authMiddleware, async (req, res) => {
  const id = req.user.id;
  const myProfile = await User.findByPk(id, {
    attributes: ["id","name", "email", "image_Url", "description", "role"],
    include: [
      { model: Session, as: "mySessions" },
      {
        model: Session,
        include: [{ model: Subject, attributes: ["name"] }],
      },
      { model: Review, as: "receivedReviews" },
    ],
  });
  res.status(200).send({ ...myProfile.dataValues });
});

module.exports = router;
