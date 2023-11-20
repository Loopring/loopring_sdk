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

const ERC20Token = new Contract(erc20Abi)
const ExchangeContract = new Contract(exchange36Abi)
const ContractWallet = new Contract(contractWalletAbi)
const ERC1155 = new Contract(erc1155Abi)
const ERC721 = new Contract(erc721Abi)
const HeBao = new Contract(hebao)

export {
  ERC20Token,
  ERC1155,
  ERC721,
  ExchangeContract,
  ContractWallet,
  erc721Abi,
  erc1155Abi,
  HeBao,
}
