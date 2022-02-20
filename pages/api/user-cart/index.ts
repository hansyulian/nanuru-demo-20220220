// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { UserCartController } from 'backend/controllers/UserCartController';
import { sessionMiddleware } from 'backend/middlewares/SessionMiddleware';
import { RouteContext, router } from 'backend/modules/Router'

export default router({
  get: {
    middlewares: [sessionMiddleware],
    handler: async function (context: RouteContext) {
      return UserCartController.list(context.userId!);
    }
  },
  post: {
    middlewares: [sessionMiddleware],
    handler: async function (context: RouteContext<{ itemId: string, amount?: number }>) {
      const { amount, itemId } = context.body;
      return UserCartController.add({
        userId: context.userId!, itemId, amount
      });
    }
  }
})