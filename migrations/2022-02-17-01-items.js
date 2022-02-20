const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Items', {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      status: {
        type: DataTypes.SMALLINT,
        defaultValue: 0 // ItemStatus.DRAFT
      },
      imagePath: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Items');
  },
};
