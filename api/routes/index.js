import { Router } from "express";
import { blockchainRouter } from "./blockchain";

const router = Router();

router.use("/blockchain", blockchainRouter);

export default router;
