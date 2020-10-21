import {Router} from "express";
import bookkeepingRouter from "./bookkeeping";

const apiRouter = new Router();

apiRouter.use("/bookeeping", bookkeepingRouter);

export default apiRouter;