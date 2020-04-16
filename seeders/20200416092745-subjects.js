"use strict";

const Subject = require("../models").subject;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const subjects = await Promise.all([
      Subject.upsert({
        name: "Maths",
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Subject.upsert({
        name: "Coding",
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Subject.upsert({
        name: "English",
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Subject.upsert({
        name: "Dutch",
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("subjects", null, {});
  },
};