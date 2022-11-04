import { fromInt64ToBytes } from "../util";

export class TxIn {
  constructor(prevTx, prevIndex, scriptSig, sequence = "0xffffffff") {
    this.prevTx = prevTx;
    this.prevIndex = prevIndex;
    if (!scriptSig) {
      this.scriptSig = Script();
    } else {
      this.scriptSig = scriptSig;
    }
    this.sequence = sequence;
  }
}
