"use strict";

const Participant = require("../models").participant;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const participants = await Promise.all([
      Participant.upsert({
        participant_id: 4,
        session_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Participant.upsert({
        participant_id: 5,
        session_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Participant.upsert({
        participant_id: 6,
        session_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Participant.upsert({
        participant_id: 4,
        session_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Participant.upsert({
        participant_id: 5,
        session_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Participant.upsert({
        participant_id: 5,
        session_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Participant.upsert({
        participant_id: 6,
        session_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("participants", null, {});
  },
};