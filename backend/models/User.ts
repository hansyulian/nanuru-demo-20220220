import { Model, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize, DataTypes, Association, HasManyGetAssociationsMixin, NonAttribute } from 'sequelize';
import { verifyPasswordHash } from 'global/utils/hash';
import { uuid } from 'global/utils/uuid';
import { UserCart } from './UserCart';

export enum UserStatus {
  ACTIVE = 1,
  SUSPENDED = 2,
}

export enum UserRole {
  USER = 1,
  ADMIN = 99,
}

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare status: UserStatus;
  declare password: string;
  declare email: string;
  declare role: UserRole;
  declare userCarts?: NonAttribute<UserCart[]>

  declare getUserCarts: HasManyGetAssociationsMixin<UserCart>;
  declare static associations: {
    userCarts: Association<User, UserCart>
  }

  public verifyPassword(value: string): boolean {
    return verifyPasswordHash(value, this.password);
  }
}

export async function initUser(sequelize: Sequelize) {
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuid,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.SMALLINT,
      defaultValue: UserStatus.ACTIVE
    },
    role: {
      type: DataTypes.SMALLINT,
      defaultValue: UserRole.USER
    },
    password: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize
  });
}