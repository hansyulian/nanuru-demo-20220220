import { ItemController } from './ItemController';

describe('ItemController', () => {
  describe('list', () => {

    it('01. Should be able to get list of items', async () => {
      const result = await ItemController.list();
      expect(result.count).toStrictEqual(10);
      expect(result.records.length).toStrictEqual(10);

    });
  })
})