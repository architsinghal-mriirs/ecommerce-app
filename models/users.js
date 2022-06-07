'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.roles, {through: 'User_Roles'});
      this.hasMany(models.Cart, {
        foreignKey: 'userId'
      })
    }
  }
  Users.init({
    email: {
      type : DataTypes.STRING,
      validate : { // adding validation to the email attribute. This is checked on the js side. Data must be in email format.
        isEmail : true
      }},
    password: {
      type : DataTypes.STRING,
      validate:{
        len:[5,30] // length must be betweeen 5 and 30 characters
      }
    },
    username: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
// hook to encrypt the password using bcryptjs. beforeCreate is the hook. hashSync is the encrypting function from bcryptjs.
  Users.beforeCreate((user) => {
    //console.log("User object before encryption", user);
    const encryptedPassword = bcrypt.hashSync(user.password);
    user.password = encryptedPassword;
    //console.log("user object after encryption", user);
  });
  
  return Users;
};