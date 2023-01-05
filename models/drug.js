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
      models.drug.belongsToMany(models.user, {through: "users_drugs"})
      models.drug.hasMany(models.comment)
    }
  }
  drug.init({
    brand_name: DataTypes.STRING,
    generic_name: DataTypes.STRING,
    route: DataTypes.STRING,
    active_ingredient: DataTypes.TEXT,
    dosage: DataTypes.TEXT,
    indications_and_usage: DataTypes.TEXT,
    caution: DataTypes.TEXT,
    ask_doctor: DataTypes.TEXT,
    api_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'drug',
  });
  return drug;
};