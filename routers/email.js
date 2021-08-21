const { Router } = require("express");
const nodemailer = require("nodemailer");
const auth = require("../auth/middleware");

const router = new Router();

router.post("/sendMail", auth, async (request, response, next) => {
  // console.log("send email?", request.body);
  const { name, message, ownerEmail } = request.body;
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        // in order for this to work, the user MUST allow "Less secure app" AND disable two-step verification on Google Account
        user: "learningbuddy.team@gmail.com", // gmail
        pass: process.env.EMAIL_PASS // password
      }
    });

    let mailOptions = {
      from: "learningbuddy.team@gmail.com", // user gmail
      to: `${ownerEmail}`, // destination
      subject: `HEY! ${name}`,
      text: `${message}`
    };

    console.log(process.env.EMAIL_PASS);

    transporter.sendMail(mailOptions, function(error, data) {
      if (error) {
        console.log("Error occured", error);
      } else {
        console.log("Email sent!");
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;