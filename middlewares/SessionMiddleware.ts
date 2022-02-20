import { UserNotFoundException } from "exceptions/NotFoundExceptions";
import models from "models";
import { RouteContext } from "modules/Router";

export async function sessionMiddleware(context: RouteContext) {
  context.userId = '00000000-0000-4000-0000-000000000001';
  context.user = await models.User.findByPk(context.userId);
  if (!context.user) {
    throw new UserNotFoundException({
      id: context.userId
    });
  }
}