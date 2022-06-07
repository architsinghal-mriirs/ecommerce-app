'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart_Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.Cart, {
      //   foreignKey:{
      //     name : 'cartId'
      //   }
      // })
      this.hasMany(models.Products,{
        foreignKey : 'productId'
      })
    }
  }
  Cart_Products.init({
    cartId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart_Products',
  });
  return Cart_Products;
};