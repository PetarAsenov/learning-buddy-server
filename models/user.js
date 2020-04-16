"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
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
    user.hasMany(models.session);
    user.hasMany(models.participant);
    user.belongsToMany(models.session, {
      through: "orderDetail",
      foreignKey: "participant_id",
    });
  };
  return user;
};
