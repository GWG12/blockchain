import {
  MAX_HASH_VALUE,
  HASH_LENGTH,
  MAX_NONCE_VALUE,
} from "../commons/constants";
import { MINING_RATE } from "../../config";

export class ProofOfWork {
  static adjustDifficulty({ lastBlock, timestamp }) {
    const { difficulty } = lastBlock.blockHeaders;
    console.log("Current difficulty", difficulty);

    if (timestamp - lastBlock.blockHeaders.timestamp > MINING_RATE) {
      return difficulty - 1;
    }

    if (difficulty < 1) {
      return 1;
    }
    return difficulty + 1;
  }

  static calculateBlockTargetHash({ lastBlock }) {
    const val = (MAX_HASH_VALUE / lastBlock.blockHeaders.difficulty).toString(
      16
    );

    if (val.length > HASH_LENGTH) {
      return "f".repeat(HASH_LENGTH);
    }

    return "0".repeat(HASH_LENGTH - val.length) + val;
  }
}
