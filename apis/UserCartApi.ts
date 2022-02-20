import { ListQuery, RecordList } from "CustomTypes";
import { UserCart } from "frontend-models/UserCart";
import { ApiClient } from "modules/ApiClient";

const client = new ApiClient('user-cart');

export const UserCartApi = {
  list,
  add,
  info,
  update,
}
export type UserCartInfo = {
  total: number,
}
async function list(query: ListQuery) {
  return client.get<RecordList<UserCart>>('', query);
}

async function add(itemId: string, amount: number = 1) {
  return client.post('', { itemId, amount });
}

async function info(): Promise<UserCartInfo> {
  return client.get('info');
}

async function update(cartId: string, amount: number) {
  return client.put(cartId, { amount });
}