import { Context } from "https://deno.land/x/oak@v6.2.0/context.ts";
import { Middleware } from "https://deno.land/x/oak@v6.2.0/middleware.ts";

export const resourceNotFound: Middleware = async (ctx: Context) => {
  const { response } = ctx;
  response.status = 404;
  response.body = {
    success: false,
    msg: "Resource not found",
  };
};
