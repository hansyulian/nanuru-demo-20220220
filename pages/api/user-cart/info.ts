// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { UserCartController } from 'controllers/UserCartController';
import { sessionMiddleware } from 'middlewares/SessionMiddleware';
import { RouteContext, router } from 'modules/Router'

export default router({
  get: {
    middlewares: [sessionMiddleware],
    handler: async function (context: RouteContext) {
      return UserCartController.info(context.userId!);
    }
  },
})