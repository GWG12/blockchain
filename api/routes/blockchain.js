import { Router } from "express";
import { fetchChain, mine } from "../controllers";

const blockchainRouter = Router();

blockchainRouter.get("/", fetchChain);
blockchainRouter.get("/mine", mine);

export { blockchainRouter };
