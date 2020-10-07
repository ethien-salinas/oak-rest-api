import { Application } from "https://deno.land/x/oak/mod.ts";
import userRouter from "./route/users.ts";
import logger from "./middleware/logger.ts";
import responseTime from "./middleware/response-time.ts";

const app = new Application();

app.use(logger);
app.use(responseTime);
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

await app.listen({ port: 8000 });
