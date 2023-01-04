'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('drugs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      brand_name: {
        type: Sequelize.STRING
      },
      generic_name: {
        type: Sequelize.STRING
      },
      route: {
        type: Sequelize.STRING
      },
      active_ingredient: {
        type: Sequelize.STRING
      },
      dosage: {
        type: Sequelize.STRING
      },
      indications_and_usage: {
        type: Sequelize.STRING
      },
      caution: {
        type: Sequelize.STRING
      },
      ask_doctor: {
        type: Sequelize.STRING
      },
      api_id: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('drugs');
  }
};