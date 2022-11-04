import { fromInt64ToBytes, decodeBase } from "../util";
import { ZERO_HASH, REWARD } from "../constants";
import { TxIn } from "./tx-in";
import { TxOut } from "./tx-out";
import { Tx } from "./tx";
import { Script } from "../script";

const privateKey =
  "3aba4162c7251c891207b747840551a71939b0de081f85c4e44cf7c13e41daa6";
const address =
  "6GEY5MZi64CMrTqDZVECYecmM2rJTLpJDd2DWyHiN2s6Uvhpueg9oVKFUTLZ1Ym";

export class CoinbaseTx {
  constructor(blockHeight) {
    this.blockHeightLE = fromInt64ToBytes(blockHeight);
  }

  coinbaseTransaction() {
    prevTx = ZERO_HASH;
    prevIndex = "0xffffffff";

    txIns = [];
    txIns.push(TxIn(prevTx, prevIndex));
    txIns[0].scriptSig.cmd.push(this.blockHeight);

    txOuts = [];
    targetAmount = REWARD * MINIMUM_COIN;
    targetH160 = decodeBase(address);
    targetScript = Script.p2pkhScript(targetH160);

    txOuts.push(TxOut(targetAmount, targetScript));
    const coinbaseTx = Tx(1, txIns, txOuts, 0);
    coinbaseTx.txId = coinbaseTx.createID();
    return coinbaseTx;
  }
}
