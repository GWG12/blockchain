import { Script } from "../script";
import CryptoJS from "crypto-js";
export class Tx {
  constructor(version, txIns, txOuts, locktime) {
    this.version = version;
    this.txIns = txIns;
    this.txOuts = txOuts;
    this.locktime = locktime;
  }

  isCoinbaseTx() {
    if (this.txIns.length !== 1) {
      return false;
    }

    const firstInput = this.txIns[0];
    if (firstInput.prevTx !== 0xffffffff) {
      return false;
    }
  }

  createID() {
    return this.hash();
  }

  hash() {
    return CryptoJS.SHA256(this.serialize());
  }

  signTx(hashedVal, prvKey) {
    const keypairTemp = ec.keyFromPrivate(prvKey);
    const buffferMsg = Buffer.from(hashedVal);
    let hexSignature = Buffer.from(
      keypairTemp.sign(buffferMsg).toDER()
    ).toString("hex");

    return hexSignature;
  }

  verifyTx(hashedVal, pubKey) {
    const keypairTemp = ec.keyFromPublic(pubKey, "hex");
    let binaryMessage = Buffer.from(hashedVal);

    return keypairTemp.verify(binaryMessage, sig);
  }

  serialize() {
    const strVersion = JSON.stringify(this.version);
    const strTxIns = JSON.stringify(this.txIns);
    const strTxOuts = JSON.stringify(this.txOuts);
    const strLocktime = JSON.stringify(this.locktime);
    return strVersion + strTxIns + strTxOuts + strLocktime;
  }
}
