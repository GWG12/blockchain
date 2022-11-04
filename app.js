console.log("starting process");
import { Interpreter } from "./smart_contract/interpreter";
import { Blockchain } from "./blockchain/blockchain";
import { Block } from "./blockchain/block/block";

const init = () => {
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
  const blockchain = new Blockchain();

  for (let i = 0; i < 5; i++) {
    console.log("Iteration:", i);
    const lastBlock = blockchain.chain[blockchain.chain.length - 1];
    const block = Block.mine({ lastBlock, beneficiary: "test" });
    blockchain.addBlock({ block });
    console.log();
  }
};

init();
