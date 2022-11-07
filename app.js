console.log("starting process");
import { Interpreter } from "./smart_contract/interpreter";
import { Blockchain } from "./blockchain/blockchain";
import { Block } from "./blockchain/block/block";
import express from "express";
import routes from "./api/routes";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

const corsOptions = {
  origin: true,
  credentials: true,
  exposedHeaders: ["Content-Length"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Listening at: ${PORT}`);
});

// const init = () => {
// const test = [
//   "PUSH",
//   2,
//   "JUMP",
//   "PUSH",
//   0,
//   "JUMP",
//   "PUSH",
//   "success",
//   "STOP",
// ];
// const interpreter = new Interpreter();
// const num = interpreter.runCode(test);
// console.log("number", num);
//   const blockchain = new Blockchain();

//   for (let i = 0; i < 5; i++) {
//     console.log("Iteration:", i);
//     const lastBlock = blockchain.chain[blockchain.chain.length - 1];
//     const block = Block.mine({ lastBlock, beneficiary: "test" });
//     blockchain.addBlock({ block });
//     console.log();
//   }
// };

// init();
