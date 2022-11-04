export class Block {
  constructor(height, blocksize, blockheader, txCount, txs) {
    this.height = height;
    this.blocksize = blocksize;
    this.blockheader = blockheader;
    this.txCount = txCount;
    this.txs = txs;
  }
}

// export default Block;
