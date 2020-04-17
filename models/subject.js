'use strict';
module.exports = (sequelize, DataTypes) => {
  const subject = sequelize.define('subject', {
    name: DataTypes.STRING
  }, {});
  subject.associate = function(models) {
    subject.hasMany(models.session, { foreignKey: "subject_id" });
  };
  return subject;
};