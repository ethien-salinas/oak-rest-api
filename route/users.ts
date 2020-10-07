import {
  helpers,
  Router,
  RouterContext,
} from "https://deno.land/x/oak/mod.ts";
import { IUser } from "../model/IUser.ts";

let Users: Array<IUser> = [
  { username: "Ethien", password: "qwerty" },
  { username: "Pablo", password: "asdfgh" },
  { username: "Lisandro", password: "zxcvbn" },
];

const router = new Router();

router
  .get("/users", (ctx: RouterContext) => {
    const { request, response } = ctx;
    response.status = 200;
    response.body = {
      sucess: true,
      msg: "[GET] /users",
      data: Users.map((usr) => {
        return {
          username: usr.username,
        };
      }),
    };
  })
  .get("/users/:username", (ctx: RouterContext) => {
    const { request, response, params } = ctx;
    const user: IUser | undefined = Users.find((usr) =>
      usr.username.toLowerCase() === params.username?.toLocaleLowerCase()
    );
    const data: any = user ? user : ``;
    const username = params.username;
    response.status = 200;
    response.body = {
      sucess: true,
      msg: `[GET] /users/${username}`,
      data: user
        ? `${user?.username} has been found`
        : `${params.username} has not been found`,
    };
  })
  .post("/users", async (ctx: RouterContext) => {
    const { request, response } = ctx;
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        sucess: false,
        msg: "[POST] /users",
        data: "request body has not been sent",
      };
    } else {
      const reqBody = request.body({ type: "json" });
      Users.push(<IUser> (await reqBody.value));
      response.status = 201;
      response.body = {
        sucess: true,
        msg: `[POST] /users`,
        data: await reqBody.value,
      };
    }
  })
  .put("/users/:username", async (ctx: RouterContext) => {
    const { request, response, params } = ctx;
    const { username } = helpers.getQuery(ctx, { mergeParams: true });
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        sucess: false,
        msg: `[PUT] /users/${username}`,
        data: "request body has not been sent",
      };
    } else {
      let user: IUser | undefined = Users.find((usr: IUser) =>
        usr.username.toLowerCase() === params.username?.toLocaleLowerCase()
      );
      if (!user) {
        response.status = 404;
        response.body = {
          sucess: false,
          msg: `[PUT] /users/${username}`,
          data: "user do not found",
        };
        return;
      }
      const reqBody = request.body({ type: "json" });
      user = { ...user, ...await reqBody.value };
      Users = [
        ...Users.filter((usr: IUser) =>
          usr.username.toLowerCase() !== username.toLowerCase()
        ),
        user!,
      ];
      response.status = 200;
      response.body = {
        sucess: true,
        msg: `[PUT] /users/${username}`,
        data: await reqBody.value,
      };
    }
  })
  .delete("/users/:username", (ctx: RouterContext) => {
    const { params, response } = ctx;
    let user: IUser | undefined = Users.find((usr: IUser) =>
      usr.username.toLowerCase() === params.username?.toLocaleLowerCase()
    );
    if (!user) {
      response.status = 404;
      response.body = {
        sucess: false,
        msg: `[DELETE] /users/${params.username}`,
        data: "user do not found",
      };
      return;
    }
    Users = [
      ...Users.filter((usr: IUser) =>
        usr.username.toLowerCase() !== params.username?.toLocaleLowerCase()
      ),
    ];
    response.status = 200;
    response.body = {
      sucess: true,
      msg: `[DELETE] /users/${params.username} has been deleted`,
      data: user.username,
    };
  });

export default router;
