import { Router, type IRouter } from "express";
import healthRouter from "./health";
import demoRequestsRouter from "./demoRequests";

const router: IRouter = Router();

router.use(healthRouter);
router.use(demoRequestsRouter);

export default router;
