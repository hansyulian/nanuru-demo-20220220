import { ItemController } from 'backend/controllers/ItemController';
import { router } from 'backend/modules/Router'

export default router({
  get: {
    handler: async function handler() {
      return ItemController.list();
    }
  }
})

