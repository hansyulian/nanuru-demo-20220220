import { Model, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize, DataTypes, Association, NonAttribute } from 'sequelize';
import { uuid } from 'global/utils/uuid';
import { Item } from './Item';
import { User } from './User';

export class UserCart extends Model<InferAttributes<UserCart>, InferCreationAttributes<UserCart>> {
  declare id: CreationOptional<string>;
  declare amount: number;
  declare userId: string;
  declare itemId: string;
  declare user: NonAttribute<User>;
  declare item: NonAttribute<Item>;

  declare static associations: {
    user: Association<UserCart, User>;
    item: Association<UserCart, Item>;
  }
}
export async function initUserCart(sequelize: Sequelize) {
  UserCart.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuid,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.UUID,
    },
    itemId: {
      type: DataTypes.UUID,
    }
  }, {
    sequelize
  });
  UserCart.belongsTo(Item, {
    foreignKey: 'itemId',
    targetKey: 'id',
    as: 'item'
  })
  User.hasMany(UserCart, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'userCarts',
  })
  Item.hasMany(UserCart, {
    sourceKey: 'id',
    foreignKey: 'itemId',
    as: 'userCarts',
  });

}
