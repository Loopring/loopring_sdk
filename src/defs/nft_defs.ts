import Web3 from "web3";
import { ChainId } from "./web3_defs";
import { NFTType } from "../api";

/**
 *  @interface DepositNFTParam
 *  @description an NFT to the specified account.
 *  @property web3
 *  @property DepositParam
 *  @property from The address that deposits the funds to the exchange
 *  @property to The account owner's address receiving the funds
 *  @property nftType The type of NFT contract address (ERC721/ERC1155/...)
 *  @property tokenAddress The address of the token
 *  @property nftID The token type 'id`.
 *  @property amount The amount of tokens to deposit.
 *  @property nonce: number,
 *  @property gasPrice: number,
 *  @property gasLimit: number,
 *  @property extraData Optional extra data used by the deposit contract.
 *  @property chainId  0|5
 *  @property sendByMetaMask boolean
 */
export interface DepositNFTParam {
  web3: Web3;
  from: string;
  exchangeAddress: string;
  nftType?: NFTType;
  tokenAddress: string;
  nftID: string;
  amount: number;
  gasPrice: number;
  gasLimit: number;
  chainId?: ChainId;
  nonce: number;
  extraData?: any;
  sendByMetaMask?: boolean;
}

/**
 * isApprovedForAll
 * @property web3
 * @property from The address that deposits the funds to the exchange
 * @property exchangeAddress loopring exchange address
 * @property nftType  NFTType
 * @property tokenAddress  The address of NFT token
 */
export interface IsApproveParam {
  web3: Web3;
  from: string;
  exchangeAddress: string;
  nftType: NFTType;
  tokenAddress: string;
}

/**
 * approveNFT
 * @property web3
 * @property from  The address that deposits the funds to the exchange
 * @property to  The address  deposits to
 * @property loopringAddress loopring exchange Address
 * @property tokenId: the tokenId
 * @property chainId
 * @property nftType The type of NFT contract address (ERC721/ERC1155/...)
 * @property nonce
 * @property gasPrice
 * @property gasLimit
 * @property sendByMetaMask
 */
export interface ApproveParam {
  web3: Web3;
  from: string;
  depositAddress: string;
  tokenAddress: string;
  tokenId: string;
  nftType: NFTType;
  gasPrice: number;
  gasLimit: number;
  chainId: ChainId;
  nonce: number;
  sendByMetaMask?: boolean;
}

export interface ContractNFTMetaParam {
  web3: any;
  tokenAddress: string;
  _id: string;
  nftType?: NFTType;
}
