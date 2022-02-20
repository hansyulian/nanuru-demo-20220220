const bcrypt = require('bcryptjs');
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Users', {
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
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      status: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1 // UserStatus.ACTIVE,
      },
      role: {
        type: DataTypes.SMALLINT,
        defaultValue: 1, // UserRole.USER,
        allowNull: false,
      },
      meta: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
    });
    const now = new Date();
    await queryInterface.addIndex('Users', ['email'])
    await queryInterface.bulkInsert('Users', [
      {
        id: '00000000-0000-4000-0000-000000000001',
        name: 'admin',
        email: 'admin@system.system',
        password: hashPassword('admin'),
        status: 1, // UserStatus.ACTIVE
        role: 1, // UserRoleType.NORMAL
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Users');
  },
};

function hashPassword(value) {
  return bcrypt.hashSync(value);
}
