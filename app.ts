import { Application } from "https://deno.land/x/oak/mod.ts";
import userRouter from "./router/users.ts";
import logger from "./middleware/logger.ts";
import responseTime from "./middleware/responseTime.ts";
import resourceNotFound from "./middleware/resourceNotFound.ts";

const app = new Application();

app.use(logger);
app.use(responseTime);
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.use(resourceNotFound);
await app.listen({ port: 8000 });
