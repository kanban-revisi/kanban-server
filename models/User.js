'use strict';
const { encrypt } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model {}
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, { 
    hooks: {
      beforeCreate: (instances, options) => {
        return encrypt(instances.password, 10)
          .then(hash => {
            instances.password = hash
          })
      }
    },
    sequelize 
  })
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};