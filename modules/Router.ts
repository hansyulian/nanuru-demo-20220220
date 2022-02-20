// eslint-disable-next-line @next/next/no-server-import-in-page
import { User } from "models/User";
import { NextApiResponse, NextApiRequest } from "next";

export type RouteContext<T = { [key: string]: string | number | boolean }> = {
  query: { [key: string]: string };
  body: T;
  userId?: string;
  user: User | null;
}

export type CustomApiEndpointHandlerAction<T = any> = (context: RouteContext<T>, req: NextApiRequest, res: NextApiResponse) => Promise<T>
export type ApiMethods = 'get' | 'post' | 'put' | 'delete';
export type Middleware<T> = (context: RouteContext<T>, req: NextApiRequest, res: NextApiResponse) => Promise<void>
export type RouteConfig<T = any> = {
  handler: CustomApiEndpointHandlerAction<T>;
  middlewares?: Middleware<T>[];
  view?: string;  // view render 
  filter?: string; // request filter
}

export function router(config: Partial<Record<ApiMethods, RouteConfig>>) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const method = (req!.method || 'GET').toLowerCase() as ApiMethods;
    const context: RouteContext = {
      body: req.body,
      query: req.query as { [key: string]: string },
      user: null
    };
    const routeConfig = config[method];
    if (!routeConfig) {
      return res.status(404).json({
        type: 'ApiNotFound',
      });
    }
    const middlewares = routeConfig.middlewares || [];
    try {
      for (const middleware of middlewares) {
        await middleware(context, req, res);
      }
      const result = await routeConfig.handler(context, req, res) || { sucess: true };
      res.status(200).json(result)
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
}