import { Model, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize, DataTypes, Association, HasManyGetAssociationsMixin, NonAttribute } from 'sequelize';
import { uuid } from 'global/utils/uuid';
import { UserCart } from './UserCart';

export enum ItemStatus {
  DRAFT = 0,
  ACTIVE = 1,
  REMOVED = 2,
}
export class Item extends Model<InferAttributes<Item>, InferCreationAttributes<Item>> {
  declare id: CreationOptional<string>;
  declare price: number;
  declare name: string;
  declare description: string;
  declare imagePath: string;
  declare status: ItemStatus;
  declare userCarts?: NonAttribute<UserCart[]>

  declare static associations: {
    userCarts: Association<Item, UserCart>
  }

}

export async function initItem(sequelize: Sequelize) {
  Item.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuid,
    },
    price: {
      type: DataTypes.NUMBER
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    imagePath: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.SMALLINT
    }
  }, {
    sequelize
  });
}