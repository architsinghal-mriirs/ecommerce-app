'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Categories,{
        foreignKey : {
          name : 'categoryId'
        }}
        );

        this.belongsToMany(models.Cart, {
          through : models.Cart_Products,
          foreignKey : 'productId',
          otherKey : 'cartId'
        });

        this.belongsTo(models.Cart_Products, {
          foreignKey : 'productId'});
    }
  }
  Products.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};