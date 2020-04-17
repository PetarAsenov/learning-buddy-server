"use strict";

const Session = require("../models").session;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const sessions = await Promise.all([
      Session.upsert({
        title: 'React Hooks',
        description: 'Join and see the best from React Hooks',
        start_date: '2020-04-16 10:00:00+00',
        end_date: '2020-04-16 11:30:00+00',
        subject_id: 3,
        teacher_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Session.upsert({
        title: 'Geometry',
        description: 'Triangles',
        start_date: '2020-04-17 10:00:00+00',
        end_date: '2020-04-17 11:30:00+00',
        subject_id: 1,
        teacher_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Session.upsert({
        title: 'Dutch for dummies',
        description: 'Goedemorgen',
        start_date: '2020-04-18 9:00:00+00',
        end_date: '2020-04-18 10:30:00+00',
        subject_id: 4,
        teacher_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Session.upsert({
        title: 'CSS',
        description: 'Flexbox in depth',
        start_date: '2020-04-19 10:00:00+00',
        end_date: '2020-04-19 11:30:00+00',
        subject_id: 3,
        teacher_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("sessions", null, {});
  },
};