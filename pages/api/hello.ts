import { router } from 'backend/modules/Router'

export default router({
  get: {
    handler: async function handler() {
      return { name: "John Doe" }
    }
  }
})

