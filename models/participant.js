'use strict';
module.exports = (sequelize, DataTypes) => {
  const participant = sequelize.define('participant', {
  }, {});
  participant.associate = function(models) {
    review.belongsTo(models.user, {foreignKey: 'participant_id'})
    review.belongsTo(models.session, {foreignKey: 'session_id'})
  };
  return participant;
};