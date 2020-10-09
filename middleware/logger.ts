import { Context } from "https://deno.land/x/oak@v6.2.0/context.ts";
import { Middleware } from "https://deno.land/x/oak@v6.2.0/middleware.ts";

export const logger: Middleware = async (
  ctx: Context,
  next: Function,
) => {
  const { request, response } = ctx;
  await next();
  const responseTime = response.headers.get("X-Response-Time");
  console.log(
    `${request.method} calling ${request.url.pathname} took ${responseTime}`,
  );
};
