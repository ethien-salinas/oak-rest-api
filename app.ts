import {
  Application,
  Router,
  RouterContext,
} from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const userRouter = new Router();

userRouter.get("/users", (ctx: RouterContext) => {
  const { request, response } = ctx;
  response.status = 200;
  response.body = {
    sucess: true,
    msg: "[GET] /users",
    data: "there is no data right now",
  };
});
userRouter.get("/users/:username", (ctx: RouterContext) => {
  const { request, response, params } = ctx;
  const username = params.username;
  response.status = 200;
  response.body = {
    sucess: true,
    msg: `[GET] /users/${username}`,
    data: "there is no data right now",
  };
});
userRouter.post("/users", async (ctx: RouterContext) => {
  const { request, response } = ctx;
  const reqBody = await request.body({ type: "json" });
  // console.log(`reqBody: ${JSON.stringify(await reqBody.value)}`);
  // const reqBodyValue = await reqBody.value;
  // console.log(`reqBodyValue: ${JSON.stringify(reqBodyValue)}`);
  response.status = 201;
  response.body = {
    sucess: true,
    msg: `[POST] /users`,
    data: await reqBody.value,
  };
});
userRouter.put("/users/:username", (ctx: RouterContext) => {
  const username = ctx.params.username;
  ctx.response.body = `[PUT] /users/${username}`;
});
userRouter.delete("/users/:username", (ctx: RouterContext) => {
  const username = ctx.params.username;
  ctx.response.body = `[DELETE] /users/${username}`;
});

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

await app.listen({ port: 8000 });
