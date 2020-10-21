import {Router} from "express";
import authControler from "./controler";

const authRouter = new Router();
authRouter.post("/register", authControler.register);
authRouter.post("/login", authControler.login);

export default authRouter;