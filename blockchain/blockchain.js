// import { BlockHeader } from "./block/blockheader";
import { Block } from "./block/block";
// import { hash256 } from "./util/index";
// import { ZERO_HASH, VERSION } from "./constants";
// import { BlockchainDB } from "../db/blockchain-db";
// import { CoinbaseTx } from "./transaction/coinbase";

export class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock({ block }) {
    console.log("Block before add", JSON.stringify(block));
    this.chain.push(block);
  }

  //   genesisBlock() {
  //     const blockHeight = 0;
  //     const prevBlockHash = hash256(ZERO_HASH);
  //     this.addBlock(blockHeight, prevBlockHash);
  //   }

  //   addBlock(blockHeight, prevBlockHash) {
  //     const timestamp = Date.now();
  //     const coinBase = CoinbaseTx(blockHeight);
  //     const coinbaseTx = coinBase.coinbaseTransaction();
  //     const merkleRoot = coinbaseTx.txId;
  //     const bits = "ffff001f";
  //     const blockHeader = new BlockHeader(
  //       VERSION,
  //       prevBlockHash,
  //       merkleRoot,
  //       timestamp,
  //       bits
  //     );
  //     blockHeader.mine();
  //     const block = new Block(blockHeight, 1, blockHeader, 1, coinbaseTx);
  //     this.chain.push(block);
  //     console.log("Added block", JSON.stringify(this.chain, null, 2));
  //     this.readLastBlock();
  //     this.writeToDisk(block);
  //   }
}
