'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class drug extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  drug.init({
    brand_name: DataTypes.STRING,
    generic_name: DataTypes.STRING,
    route: DataTypes.STRING,
    active_ingredient: DataTypes.STRING,
    dosage: DataTypes.STRING,
    indications_and_usage: DataTypes.STRING,
    caution: DataTypes.STRING,
    ask_doctor: DataTypes.STRING,
    api_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'drug',
  });
  return drug;
};