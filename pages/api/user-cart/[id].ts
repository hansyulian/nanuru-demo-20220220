// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { UserCartController } from 'backend/controllers/UserCartController';
import { sessionMiddleware } from 'backend/middlewares/SessionMiddleware';
import { RouteContext, router } from 'backend/modules/Router'

export default router({
  put: {
    middlewares: [sessionMiddleware],
    handler: async function (context: RouteContext<{ amount: number }>) {
      return UserCartController.update(context.userId!, context.query.id, context.body);
    }
  },
})