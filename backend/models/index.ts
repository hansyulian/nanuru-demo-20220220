import { Sequelize } from 'sequelize';
import { initItem, Item } from './Item';
import { initUser, User } from './User';
import { initUserCart, UserCart } from './UserCart';
import { backendConfig } from 'backend/config/backendConfig';
console.log('initializing sequelize');
/* Custom handler for reading current working directory */
// const models = process.cwd() + '/models/' || __dirname;
const databaseConfig = backendConfig.database;

const sequelize = new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, {
  host: databaseConfig.host,
  port: databaseConfig.port,
  dialect: 'postgres',
  logging: false,
});

initItem(sequelize);
initUser(sequelize);
initUserCart(sequelize);

const models = {
  sequelize,
  Item,
  User,
  UserCart,
}

export default models;