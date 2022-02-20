import { RecordList } from 'CustomTypes';
import models from 'backend/models'
import { Item } from 'backend/models/Item';

export const ItemController = {
  list,
}

async function list(): Promise<RecordList<Item>> {
  const result = await models.Item.findAndCountAll();
  return {
    records: result.rows,
    count: result.count,
  }
}