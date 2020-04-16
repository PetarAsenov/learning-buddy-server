"use strict";
module.exports = (sequelize, DataTypes) => {
  const session = sequelize.define(
    "session",
    {
      title: DataTypes.STRING,
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
      subject_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        reference: {
          model: "subject",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      teacher_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        reference: {
          model: "user",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {}
  );
  session.associate = function (models) {
    session.hasMany(models.participant);
    session.belongsTo(models.user, { foreignKey: "teacher_id" });
    session.belongsTo(models.subject, { foreignKey: "subject_id" });
    session.belongsToMany(models.user, {
      through: "orderDetail",
      foreignKey: "session_id",
    });
  };
  return session;
};
