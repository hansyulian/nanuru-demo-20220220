import { router } from 'modules/Router'

export default router({
  get: {
    handler: async function handler() {
      return { name: "John Doe" }
    }
  }
})

