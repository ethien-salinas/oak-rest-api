import { Context } from "https://deno.land/x/oak@v6.2.0/context.ts";
import { Middleware } from "https://deno.land/x/oak@v6.2.0/middleware.ts";

export const responseTime: Middleware = async (
  ctx: Context,
  next: Function,
) => {
  const { request, response } = ctx;
  const start = Date.now();
  await next();
  const responseTime = Date.now() - start;
  response.headers.set("X-Response-Time", `${responseTime} ms`);
};
