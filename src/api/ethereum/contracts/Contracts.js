/* eslint-disable */
import Contract from "./Contract";

const erc20Abi = require("../../config/abis/erc20.json");
const exchange31Abi = require("../../config/abis/exchange_3_1.json");
const exchange36Abi = require("../../config/abis/exchange_3_6.json");
const contractWalletAbi = require("../../config/abis/contractWallet.json");
const erc721Abi = require("../../config/abis/erc721.json");
const erc1155Abi = require("../../config/abis/erc1155.json");
const hebao = require("../../config/abis/hebao.json");
const ERC20Token = new Contract(erc20Abi);
const Exchange31Contract = new Contract(exchange31Abi);
const ExchangeContract = new Contract(exchange36Abi);
const ContractWallet = new Contract(contractWalletAbi);
const ERC1155 = new Contract(erc1155Abi);
const ERC721 = new Contract(erc721Abi);
const HeBao = new Contract(hebao);

export default {
  ERC20Token,
  ERC1155,
  ERC721,
  Exchange31Contract,
  ExchangeContract,
  ContractWallet,
  erc721Abi: erc721Abi,
  erc1155Abi: erc1155Abi,
  HeBao,
};
