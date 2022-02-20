import { RecordList } from "CustomTypes";
import { ItemNotFoundException, UserCartNotFoundException, UserNotFoundException } from "backend/exceptions/NotFoundExceptions";
import models from "backend/models";
import { Item, ItemStatus } from "backend/models/Item";
import { UserStatus } from "backend/models/User";
import { UserCart } from "backend/models/UserCart";

export type UserCartControllerCreate = {
  userId: string;
  itemId: string;
  amount?: number;
}

export type UserCartControllerUpdate = {
  itemId?: string;
  amount: number;
}

export const UserCartController = {
  list,
  add,
  update,
  delete: del,
  info,
}

async function list(userId: string): Promise<RecordList<UserCart>> {
  const result = await models.UserCart.findAndCountAll({
    where: {
      userId,
    },
    include: [{
      model: Item,
      as: 'item',
    }]
  });
  return {
    records: result.rows,
    count: result.count,
  }
}

async function add(payload: UserCartControllerCreate): Promise<void> {
  const { itemId, userId, amount = 1 } = payload;
  const user = await models.User.findByPk(userId);
  if (!user || user.status !== UserStatus.ACTIVE) {
    throw new UserNotFoundException({ userId });
  }
  const item = await models.Item.findByPk(itemId);
  if (!item || item.status !== ItemStatus.ACTIVE) {
    throw new ItemNotFoundException({ itemId });
  }

  const userCart = await models.UserCart.findOne({
    where: {
      userId,
      itemId,
    }
  })
  if (userCart) {
    userCart.amount += amount;
    if (userCart.amount === 0) {
      await userCart.destroy();
    } else {
      await userCart.save();
    }
  } else {
    await models.UserCart.create({
      userId,
      amount: amount,
      itemId: itemId,
    })
  }
}

async function update(userId: string, id: string, payload: UserCartControllerUpdate): Promise<void> {

  const user = await models.User.findByPk(userId);
  if (!user || user.status !== UserStatus.ACTIVE) {
    throw new UserNotFoundException({ userId });
  }

  const userCart = await models.UserCart.findOne({
    where: {
      id,
      userId,
    }
  });
  if (!userCart) {
    throw new UserCartNotFoundException({
      id,
    })
  }
  const { amount } = payload;
  if (amount === 0) {
    return await userCart.destroy();
  }
  userCart.amount = amount;
  await userCart.save();
}

async function del(): Promise<void> {

}

async function info(userId: string) {
  const total = await models.UserCart.sum('amount', {
    where: {
      userId,
    }
  });
  return {
    total,
  }
}