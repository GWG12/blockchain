import * as elliptic from "elliptic";
import { randomBytes } from "crypto";
import CryptoJS from "crypto-js";
import { base58Encoding } from "../util";

export class Account {
  constructor() {
    const { address } = this.generateAddress();
    this.address = address;
  }

  generateKey() {
    // const privateKey = crypto.randomBytes(256);
    // const hexPrivateKey = token.toString("hex");
    // const intPrivateKey = parseInt(hexPrivateKey, 16);
    const EC = elliptic.default.ec;
    const ec = new EC("secp256k1");
    // const key = ec.genKeyPair();
    const key = ec.keyFromPrivate(
      "3aba4162c7251c891207b747840551a71939b0de081f85c4e44cf7c13e41daa6"
    );
    // (better do it once and reuse it)

    // Then generate the public point/key corresponding to your secret key.
    const privateKey = key.getPrivate().toString("hex");
    const pubKey = key.getPublic();
    return { pubKey, privateKey };
  }

  generateAddress() {
    let compressedKey;
    const { pubKey, privateKey } = this.generateKey();
    console.log("puiblic key", pubKey.encode("hex"));
    const y = pubKey.getY().toString("hex");
    const x = pubKey.getX().toString("hex");
    if (BigInt("0x" + y) % 2n === 0n) {
      compressedKey = "02" + x;
    } else {
      compressedKey = "03" + x;
    }
    console.log("Compressed", compressedKey);
    // const pubKeyHex = pubKey.encode("hex");
    // console.log("pub point", pubKeyHex);
    const compressedKeyHex = CryptoJS.enc.Hex.parse(compressedKey);
    const publicKeyFirstHash = CryptoJS.SHA256(compressedKeyHex).toString();
    const publicKeyFirstHashHex = CryptoJS.enc.Hex.parse(publicKeyFirstHash);
    const preBase58Address = CryptoJS.RIPEMD160(
      publicKeyFirstHashHex
    ).toString();
    const address = base58Encoding(preBase58Address);
    console.log("address ", address);
    console.log("private key ", privateKey);
    return { address, privateKey };
  }
}
