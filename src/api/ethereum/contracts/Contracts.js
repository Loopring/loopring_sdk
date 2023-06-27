/* eslint-disable */
import Contract from "./Contract";
import erc20Abi from "../../config/abis/erc20";
import exchange36Abi from "../../config/abis/exchange_3_6";
import contractWalletAbi from "../../config/abis/contractWallet";
import erc721Abi from "../../config/abis/erc721";
import erc1155Abi from "../../config/abis/erc1155";
import hebao from "../../config/abis/hebao";

const ERC20Token = new Contract(erc20Abi);
const ExchangeContract = new Contract(exchange36Abi);
const ContractWallet = new Contract(contractWalletAbi);
const ERC1155 = new Contract(erc1155Abi);
const ERC721 = new Contract(erc721Abi);
const HeBao = new Contract(hebao);

export default {
  ERC20Token,
  ERC1155,
  ERC721,
  ExchangeContract,
  ContractWallet,
  erc721Abi: erc721Abi,
  erc1155Abi: erc1155Abi,
  HeBao,
};
