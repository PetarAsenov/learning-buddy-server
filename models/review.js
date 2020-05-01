"use strict";
module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define(
    "review",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      rate: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
    },
    {}
  );
  review.associate = function (models) {
    review.belongsTo(models.user, { foreignKey: "reviewer_id", as: "reviewer" });
    review.belongsTo(models.user, { foreignKey: "teacher_id" });
  };
  return review;
};
