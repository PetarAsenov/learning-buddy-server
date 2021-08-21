"use strict";

const Participant = require("../models").participant;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const participants = await Promise.all([
      Participant.upsert({
        id: 1,
        participant_id: 4,
        session_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Participant.upsert({
        id: 2,
        participant_id: 5,
        session_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Participant.upsert({
        id: 3,
        participant_id: 6,
        session_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Participant.upsert({
        id: 4,
        participant_id: 4,
        session_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Participant.upsert({
        id: 5,
        participant_id: 5,
        session_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Participant.upsert({
        id: 6,
        participant_id: 5,
        session_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Participant.upsert({
        id: 7,
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