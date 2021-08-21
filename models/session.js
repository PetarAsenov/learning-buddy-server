"use strict";
module.exports = (sequelize, DataTypes) => {
  const session = sequelize.define(
    "session",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      start_date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      end_date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {}
  );
  session.associate = function (models) {
    session.hasMany(models.participant, { foreignKey: "session_id" });
    session.belongsTo(models.user, { foreignKey: "teacher_id", as: "teacher" });
    session.belongsTo(models.subject, { foreignKey: "subject_id" });
    session.belongsToMany(models.user, {
      through: "participant",
      foreignKey: "session_id",
    });
  };
  return session;
};
