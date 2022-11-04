export class BlockHeader {
  constructor({
    parentHash,
    beneficiary,
    difficulty,
    number,
    timestamp,
    nonce,
  }) {
    this.parentHash = parentHash;
    this.beneficiary = beneficiary;
    this.difficulty = difficulty;
    this.number = number;
    this.timestamp = timestamp;
    this.nonce = nonce;
  }

  //   mine() {
  //     //while (this.nonce < 5) {
  //     while (this.blockHash.slice(0, 2) !== "00") {
  //       let valuesToHash = `${this.version.toString()}${this.prevBlockHash}${
  //         this.merkleRoot
  //       }${this.timestamp.toString()}${this.bits}${this.nonce.toString()}}`;
  //       //console.log("val to hash in mining", valuesToHash);
  //       this.blockHash = hash256(valuesToHash);
  //       //console.log("new block hash", this.blockHash);
  //       this.nonce += 1;
  //       console.log("nonce", this.nonce);
  //     }
  //   }
}

// export default BlockHeader;
