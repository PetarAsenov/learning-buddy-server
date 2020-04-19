"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_Url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM,
        values: ["teacher", "student"],
      },
    },
    {}
  );
  user.associate = function (models) {
    user.hasMany(models.session, {
      foreignKey: "teacher_id",
      as: "my-sessions",
    });
    user.hasMany(models.participant, { foreignKey: "participant_id" });
    user.hasMany(models.review, {
      foreignKey: "reviewer_id",
      as: "sent-reviews",
    });
    user.hasMany(models.review, {
      foreignKey: "teacher_id",
      as: "received-reviews",
    });
    user.belongsToMany(models.session, {
      through: "participant",
      foreignKey: "participant_id",
    });
  };
  return user;
};
