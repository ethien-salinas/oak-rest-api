import { Application } from "https://deno.land/x/oak/mod.ts";
import userRouter from "./routes/users.ts";

const app = new Application();

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

await app.listen({ port: 8000 });
