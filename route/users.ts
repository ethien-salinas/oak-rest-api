import {
  Router,
} from "https://deno.land/x/oak/mod.ts";
import {
  getUsers,
  getUser,
  insertUser,
  updateUser,
  deleteUser,
} from "../controller/UserController.ts";

const router = new Router();

router
  .get("/users", getUsers)
  .get("/users/:username", getUser)
  .post("/users", insertUser)
  .put("/users/:username", updateUser)
  .delete("/users/:username", deleteUser);

export default router;
