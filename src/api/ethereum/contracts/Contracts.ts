/* eslint-disable */
import {
  contractWalletAbi,
  erc20Abi,
  erc721Abi,
  erc1155Abi,
  exchange36Abi,
  hebao,
} from '../../config/abis'
import { Contract } from './Contract'

const ERC20Token = new Contract(erc20Abi.erc20)
const ExchangeContract = new Contract(exchange36Abi.exchange)
const ContractWallet = new Contract(contractWalletAbi.contractWallet)
const ERC1155 = new Contract(erc1155Abi.erc1155)
const ERC721 = new Contract(erc721Abi.erc721)
const HeBao = new Contract(hebao.hebao)

export {
  ERC20Token,
  ERC1155,
  ERC721,
  ExchangeContract,
  ContractWallet,
  erc721Abi,
  erc1155Abi,
  HeBao,
  exchange36Abi
}
