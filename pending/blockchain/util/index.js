import CryptoJS from "crypto-js";
import bs58 from "bs58";
import { BASE_58_ALPHABET } from "../constants";

export const hash256 = (value) => {
  const firstHashedValHex = CryptoJS.enc.Hex.parse(value);
  const hashedVal = CryptoJS.SHA256(firstHashedValHex).toString();
  const hashedValHex = CryptoJS.enc.Hex.parse(hashedVal);
  const doubleHashedVal = CryptoJS.SHA256(hashedValHex);
  return doubleHashedVal.toString();
};

export const base58Encoding = (payload) => {
  const prefixedPayload = "00" + payload;
  console.log("prefix payload", prefixedPayload);
  const hashedPayload = hash256(prefixedPayload);
  console.log("hashed", hashedPayload);
  const checkSummedPayload = prefixedPayload + hashedPayload.substring(0, 8);
  console.log("check sum", checkSummedPayload);
  const address = bs58.encode(Buffer.from(checkSummedPayload, "hex"));
  // const address = bs58.encode(checkSummedPayload);
  return address;
};

export const fromInt64ToBytes = (number, littleEndian = true) => {
  const bigNumber = BigInt(number);
  // Create 8 bytes Buffer
  const bytes = Buffer.alloc(8);
  // Writes Little Endian big 64 bits Int to Buffer
  if (littleEndian) {
    bytes.writeBigInt64LE(bigNumber);
  } else {
    bytes.writeBigInt64BE(bigNumber);
  }
  console.log("Bytes from int in endian", bytes);
  return bytes;
};

export const decodeBase = (address) => {
  const bytesBE = bs58.decode(address);
  console.log();
  console.log(
    "Decoded base58 address from lib",
    bytesBE,
    bytesBE.slice(1, bytesBE.length - 4)
  );
  const decodedBase58 = Buffer.from(bytesBE).toString("hex");
  console.log("decoded address", decodedBase58);
  console.log();
  const checksum = decodedBase58.substring(
    decodedBase58.length - 8,
    decodedBase58.length
  );

  const decodedBase58Data = decodedBase58.substring(
    0,
    decodedBase58.length - 8
  );

  const hashedPayload = hash256(decodedBase58Data);
  const checksummExtract = hashedPayload.substring(0, 8);

  if (checksummExtract !== checksum) {
    throw Error("Bad address");
  }

  return bytesBE.slice(1, bytesBE.length - 4);
};

// export const bytesSizeOfInt(val) => {
//     return ( val < 2 )?1:Math.ceil(Math.log2(val)/4);
// }

// export const toBytesInt32(num, numOfBytes) => {
//   arr = new ArrayBuffer(numOfBytes); // an Int32 takes 4 bytes
//   view = new DataView(arr);
//   view.setUint32(0, num, false); // byteOffset = 0; litteEndian = false
//   return arr;
// }
