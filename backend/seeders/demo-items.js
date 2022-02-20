const bcrypt = require('bcrypt');
const words1 = ['', 'A ']
const words2 = ['', 'Very ', 'Quite ']
const words3 = ['Fancy', 'Brilliant', 'Amazing', 'Cheap', 'Colorful']

module.exports = {
  up: async (queryInterface) => {
    const demoItems = [];
    const now = new Date();
    for (let i = 0; i < 10; i += 1) {
      const word1 = words1[i % words1.length]
      const word2 = words2[i % words2.length]
      const word3 = words3[i % words3.length];
      demoItems.push({
        id: `00000000-0000-4000-0000-00000000000${i}`,
        name: `${word1}${word2}${word3} Dashboard`,
        price: 100 * (i + 1),
        description: 'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, ',
        status: 1, // ItemStatus.Active,
        imagePath: `item-image-${i}.png`,
        createdAt: now,
        updatedAt: now,
      })
    }
    await queryInterface.bulkInsert('Items', demoItems);
    // await queryInterface.bulkInsert('Users', [
    //   {
    //     id: '00000000-0000-4000-0000-000000000001',
    //     name: 'admin',
    //     email: 'admin@system.system',
    //     password: hashPassword('admin'),
    //     status: 1, // UserStatus.ACTIVE
    //     role: 1, // UserRoleType.NORMAL
    //     createdAt: now,
    //     updatedAt: now,
    //   },
    // ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Items', null, {});
    // await queryInterface.bulkDelete('Users', null, {});
  }
};

function hashPassword(value) {
  return bcrypt.hashSync(value);
}
