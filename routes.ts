import {
  helpers,
  Router,
  RouterContext,
} from "https://deno.land/x/oak/mod.ts";

const userRouter = new Router();

userRouter
  .get("/users", (ctx: RouterContext) => {
    const { request, response } = ctx;
    response.status = 200;
    response.body = {
      sucess: true,
      msg: "[GET] /users",
      data: "there is no data right now",
    };
  })
  .get("/users/:username", (ctx: RouterContext) => {
    const { request, response, params } = ctx;
    const username = params.username;
    response.status = 200;
    response.body = {
      sucess: true,
      msg: `[GET] /users/${username}`,
      data: "there is no data right now",
    };
  })
  .post("/users", async (ctx: RouterContext) => {
    const { request, response } = ctx;
    const reqBody = request.body({ type: "json" });
    response.status = 201;
    response.body = {
      sucess: true,
      msg: `[POST] /users`,
      data: await reqBody.value,
    };
  })
  .put("/users/:username", async (ctx: RouterContext) => {
    const { request, response } = ctx;
    const { username } = helpers.getQuery(ctx, { mergeParams: true });
    const reqBody = await request.body({ type: "json" });
    response.status = 200;
    response.body = {
      sucess: true,
      msg: `[PUT] /users/${username}`,
      data: await reqBody.value,
    };
  })
  .delete("/users/:username", (ctx: RouterContext) => {
    const { params, response } = ctx;
    response.status = 200;
    response.body = {
      sucess: true,
      msg: `[DELETE] /users/${params.username}`,
      data: null,
    };
  });

export default userRouter;