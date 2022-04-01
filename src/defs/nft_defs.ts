import Web3 from "web3";
import { ChainId } from "./web3_defs";
import { NFTType } from "../api";

/**
 *  @interface DepositNFTParam
 *  @description an NFTAction to the specified account.
 *  @property web3
 *  @property DepositParam
 *  @property from The address that deposits the funds to the exchange
 *  @property to The account owner's address receiving the funds
 *  @property nftType The type of NFTAction contract address (ERC721/ERC1155/...)
 *  @property tokenAddress The address of the token
 *  @property nftId The token type 'id`.
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
  nftId: string;
  amount: number;
  gasPrice: number;
  gasLimit: number | undefined;
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
 * @property tokenAddress  The address of NFTAction token
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
 * @property from string address that deposits the funds to the exchange
 * @property to string address  deposits to
 * @property loopringAddress string loopring exchange Address
 * @property nftId  ntId
 * @property chainId number
 * @property nftType number The type of NFTAction contract address (ERC721/ERC1155)
 * @property nonce number
 * @property gasPrice
 * @property gasLimit
 * @property sendByMetaMask
 */
export interface ApproveParam {
  web3: Web3;
  from: string;
  depositAddress: string;
  tokenAddress: string;
  nftId?: string;
  nftType: NFTType;
  gasPrice: number;
  gasLimit: number | undefined;
  chainId: ChainId;
  nonce: number;
  approved?: boolean;
  sendByMetaMask?: boolean;
}

export type ContractNFTParam = {
  web3: any;
  tokenAddress: string;
  nftId: string;
  nftType?: NFTType;
};
export type ContractNFTMetaParam = ContractNFTParam & { _id?: string };

export type UserNFTBalanceParam = ContractNFTParam & { account: string };
