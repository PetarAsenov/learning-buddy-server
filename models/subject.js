"use strict";
module.exports = (sequelize, DataTypes) => {
  const subject = sequelize.define(
    "subject",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      name: DataTypes.STRING,
      image_Url: DataTypes.TEXT,
    },
    {}
  );
  subject.associate = function (models) {
    subject.hasMany(models.session, { foreignKey: "subject_id" });
  };
  return subject;
};
