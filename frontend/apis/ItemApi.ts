import { ListQuery, RecordList } from "global/CustomTypes";
import { Item } from "frontend/models/Item";
import { ApiClient } from "frontend/modules/ApiClient";

const client = new ApiClient('item');

export const ItemApi = {
  list,
}

async function list(query: ListQuery) {
  return client.get<RecordList<Item>>('', query);
}