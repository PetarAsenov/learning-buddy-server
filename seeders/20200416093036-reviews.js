"use strict";

const Review = require("../models").review;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const reviews = await Promise.all([
      Review.upsert({
        rate: 5,
        comment: 'You are great. Your last lecture was awesome',
        teacher_id: 1,
        reviewer_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Review.upsert({
        rate: 4,
        comment: '',
        teacher_id: 1,
        reviewer_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Review.upsert({
        rate: 5,
        comment: '',
        teacher_id: 2,
        reviewer_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Review.upsert({
        rate: 5,
        comment: 'Fantastic teacher!',
        teacher_id: 3,
        reviewer_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("reviews", null, {});
  },
};
