import { GENESIS_DATA } from "../../config";
import { BlockHeader } from "./blockheader";
import { ProofOfWork } from "../consensus/proofOfWork";
import { keccakHash } from "../../util/encryption";
import { MAX_NONCE_VALUE } from "../commons/constants";

export class Block extends ProofOfWork {
  constructor(blockHeaders) {
    super();
    this.blockHeaders = blockHeaders;
  }

  static genesis() {
    const GENESIS_BLOCK = new BlockHeader(GENESIS_DATA.blockHeaders);
    return new this(GENESIS_BLOCK);
  }

  static mine({ lastBlock, beneficiary }) {
    const target = ProofOfWork.calculateBlockTargetHash({ lastBlock });
    let timestamp, truncatedBlockHeaders, header, nonce, underTargetHash;

    do {
      timestamp = Date.now();
      truncatedBlockHeaders = {
        parentHash: keccakHash(lastBlock.blockHeaders),
        beneficiary,
        difficulty: ProofOfWork.adjustDifficulty({ lastBlock, timestamp }),
        number: lastBlock.blockHeaders.number + 1,
        timestamp,
      };
      header = keccakHash(truncatedBlockHeaders);
      nonce = Math.floor(Math.random() * MAX_NONCE_VALUE);

      underTargetHash = keccakHash(header + nonce);
      const del = underTargetHash < target;
      console.log(
        `Prov blockHeader: ${JSON.stringify(
          truncatedBlockHeaders
        )} --- Target: ${target} --- Under: ${underTargetHash} --- Difficulty: ${
          truncatedBlockHeaders.difficulty
        }`
      );
    } while (underTargetHash > target);
    return new Block({
      ...truncatedBlockHeaders,
      nonce,
    });
  }

  static validateBlock({ lastBlock, block }) {
    return new Promise(function (resolve, reject) {
      if (keccakHash(block) === keccakHash(Block.genesis())) {
        return resolve();
      }

      if (
        keccakHash(lastBlock.blockHeaders) !== block.blockHeaders.parentHash
      ) {
        return reject(new Error("Invalid parent hash"));
      }

      if (block.blockHeaders.number !== lastBlock.blockHeaders.number + 1) {
        return reject(new Error("Block number incorrect"));
      }

      if (
        Math.abs(
          block.blockHeaders.difficulty - lastBlock.blockHeaders.difficulty
        ) > 1
      ) {
        return reject(new Error("Difficulty must be adjusted by 1 at most"));
      }

      const target = Block.calculateBlockTargetHash({ lastBlock });
      const { blockHeaders } = block;
      const { nonce } = blockHeaders;
      const truncatedBlockHeaders = { ...blockHeaders };
      delete truncatedBlockHeaders.nonce;
      const header = keccakHash(truncatedBlockHeaders);
      const underTargetHash = keccakHash(header + nonce);

      if (underTargetHash > target) {
        return reject(new Error("Proof of work invalid"));
      }

      return resolve();
    });
  }
}

// export default Block;
