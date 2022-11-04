import pkg from "js-sha3";
const { keccak256 } = pkg;

const sortCharacters = (data) => {
  return JSON.stringify(data).split("").sort().join("");
};

export const keccakHash = (data) => {
  const hash = keccak256.create();

  hash.update(sortCharacters(data));

  return hash.hex();
};
