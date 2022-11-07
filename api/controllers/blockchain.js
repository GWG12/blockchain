import { Blockchain } from "../../blockchain/blockchain";
import { Block } from "../../blockchain/block/block";
import blockchainState from "../../blockchain/state";

export const fetchChain = async (req, res) => {
  const { chain } = blockchainState;

  return res.status(200).json({ data: { chain } });
};

export const mine = async (req, res, next) => {
  const lastBlock = blockchainState.chain[blockchainState.chain.length - 1];
  const block = Block.mine({ lastBlock });

  try {
    await blockchainState.addBlock({ block });
    res.status(200).json({ data: { block } });
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};
