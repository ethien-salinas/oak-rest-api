import { Context } from "https://deno.land/x/oak@v6.2.0/context.ts";
import { Middleware } from "https://deno.land/x/oak@v6.2.0/middleware.ts";

export const errorHandler: Middleware = async (
  ctx: Context,
  next: Function,
) => {
  const { response } = ctx;
  try {
    await next();
  } catch (err) {
    response.body = {
      success: false,
      msg: err.message,
    };
  }
};
