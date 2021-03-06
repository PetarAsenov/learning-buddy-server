"use strict";
module.exports = (sequelize, DataTypes) => {
  const participant = sequelize.define(
    "participant",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
    },
    {}
  );
  participant.associate = function (models) {
    participant.belongsTo(models.user, {
      foreignKey: "participant_id",
      as: "participant",
    });
    participant.belongsTo(models.session, { foreignKey: "session_id" });
  };
  return participant;
};
