'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_drugs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users_drugs.init({
    userId: DataTypes.INTEGER,
    drugId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users_drugs',
  });
  return users_drugs;
};