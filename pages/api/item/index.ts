import { ItemController } from 'controllers/ItemController';
import { router } from 'modules/Router'

export default router({
  get: {
    handler: async function handler() {
      return ItemController.list();
    }
  }
})

