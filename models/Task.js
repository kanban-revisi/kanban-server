'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Task extends Model {}
  Task.init({
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    difficulty: DataTypes.STRING
  }, { 
    sequelize 
  })
  Task.associate = function(models) {
    Task.belongsTo(models.User)
  };
  return Task;
};