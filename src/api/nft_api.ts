import { BaseAPI } from "./base_api";
import { LOOPRING_URLs } from "../defs/url_defs";
import {
  ChainId,
  ConnectorError,
  LoopringErrorCode,
  NftData,
  NFTTokenInfo,
  ReqMethod,
  ReqParams,
  SIG_FLAG,
} from "../defs";
import { myLog } from "../utils/log_tools";
import * as ethUtil from "ethereumjs-util";
import { genExchangeData, sendRawTx } from "./contract_api";
import contracts from "./ethereum/contracts";
import {
  ApproveParam,
  ContractNFTMetaParam,
  DepositNFTParam,
  IsApproveParam,
  UserNFTBalanceParam,
} from "../defs/nft_defs";
import { values } from "lodash";

const CREATION_CODE = {
  [ChainId.GOERLI]:
    "3d602d80600a3d3981f3363d3d373d3d3d363d732df3ce66d930959afb2ef01486e3dada00a865095af43d82803e903d91602b57fd5bf3",
  [ChainId.MAINNET]:
    "3d602d80600a3d3981f3363d3d373d3d3d363d73d2b58140f90d66f73acbe873a81e5ae06a6d61195af43d82803e903d91602b57fd5bf3",
};

export enum NFTType {
  ERC1155 = 0,
  ERC721,
}

export enum NFTMethod {
  setApprovalForAll = "setApprovalForAll",
  isApprovedForAll = "isApprovedForAll",
  uri = "uri",
  tokenURI = "tokenURI",
  depositNFT = "depositNFT",
  balanceOf = "balanceOf",
  ownerOf = "ownerOf",
  // Deposit = 'deposit',
  // ForceWithdraw = 'forceWithdraw'
}

export class NFTAPI extends BaseAPI {
  private async callContractMethod(
    web3: any,
    method: string,
    data: any[],
    contractAddress: string,
    type: NFTType = NFTType.ERC1155
  ) {
    // return _genContractData(Contracts.ERC20Token, method, data)
    const contract = this._genContract(web3, contractAddress, type);
    return contract.methods[method](...data).call();
  }

  private _genContractData(Contract: any, method: string, data: any) {
    return Contract.encodeInputs(method, data);
  }

  private _genERC1155Data(method: string, data: any) {
    return this._genContractData(contracts.Contracts.ERC1155, method, data);
  }

  private _genERC721Data(method: string, data: any) {
    return this._genContractData(contracts.Contracts.ERC721, method, data);
  }

  private _genContract(
    web3: any,
    contractAddress: string,
    type: NFTType = NFTType.ERC1155
  ) {
    return new web3.eth.Contract(
      type === NFTType.ERC1155
        ? contracts.Contracts.erc1155Abi
        : contracts.Contracts.erc721Abi,
      contractAddress
    );
  }

  /**
   * getNFTBalance
   * @param web3
   * @param tokenAddress
   * @param account
   * @param nftId
   * @param nftType
   */
  public async getNFTBalance({
    web3,
    tokenAddress,
    account,
    nftId,
    nftType = NFTType.ERC1155,
  }: UserNFTBalanceParam): Promise<{
    count?: string;
    error?: { code: LoopringErrorCode; msg: string };
  }> {
    try {
      if (nftType === NFTType.ERC721) {
        const result: string = await this.callContractMethod(
          web3,
          NFTMethod.ownerOf,
          [nftId],
          tokenAddress,
          nftType
        );
        if (result.toLowerCase() === account.toLowerCase()) {
          return {
            count: "1",
          };
        } else {
          return {
            count: "0",
          };
        }
      } else {
        const result: string = await this.callContractMethod(
          web3,
          NFTMethod.balanceOf,
          [account, web3.utils.hexToNumberString(nftId)],
          tokenAddress,
          nftType
        );
        return {
          count: result.toString(),
        };
      }
    } catch (e) {
      return {
        error: {
          code: LoopringErrorCode.CONTRACTNFT_BALANCE,
          msg: ConnectorError.CONTRACTNFT_BALANCE,
          ...e,
        },
      };
    }
  }

  /**
   * getInfoForNFTTokens
   * @param nftDatas NftData[]
   */
  public async getInfoForNFTTokens({
    nftDatas,
  }: {
    nftDatas: NftData[];
  }): Promise<{ [key: string]: NFTTokenInfo } | undefined> {
    try {
      const reqParams: ReqParams = {
        sigFlag: SIG_FLAG.NO_SIG,
        url: LOOPRING_URLs.GET_NFTs_INFO,
        method: ReqMethod.GET,
        queryParams: { nftDatas: nftDatas.join(",") },
      };
      const raw_data = (await this.makeReq().request(reqParams)).data;
      const result = raw_data.reduce(
        (prev: { [key: string]: NFTTokenInfo }, item: any) => {
          prev[item.nftData] = item;
          return prev;
        },
        {}
      );
      return {
        ...result,
        raw_data,
      };
    } catch (error) {
      return undefined;
    }
  }

  /**
   * getContractNFTMeta
   * @param web3
   * @param tokenAddress
   * @param _id
   * @param nftType
   */
  public async getContractNFTMeta({
    web3,
    tokenAddress,
    nftId,
    nftType = NFTType.ERC1155,
  }: ContractNFTMetaParam) {
    try {
      myLog(tokenAddress, "nftid", nftId, web3.utils.hexToNumberString(nftId));
      let result: string;
      result = await this.callContractMethod(
        web3,
        nftType === NFTType.ERC1155 ? NFTMethod.uri : NFTMethod.tokenURI,
        [web3.utils.hexToNumberString(nftId)],
        tokenAddress,
        nftType
      );
      // if (nftType === NFTType.ERC1155) {
      //
      // } else {
      //   result = await this.callContractMethod(
      //     web3,
      //     NFTMethod.tokenURI,
      //     [web3.utils.hexToNumberString(nftId)],
      //     tokenAddress,
      //     nftType
      //   );
      // }

      result = result.replace("ipfs://", LOOPRING_URLs.IPFS_META_URL);
      result = result.replace("{id}", web3.utils.hexToNumberString(nftId));
      return await fetch(result).then((response) => response.json());
    } catch (error) {
      return {
        error: {
          code: LoopringErrorCode.CONTRACTNFT_URI,
          msg: ConnectorError.CONTRACTNFT_URI,
          ...error,
        },
      };
    }
  }

  /**
   * approveNFT
   * @param web3
   * @param from  The address that deposits the funds to the exchange
   * @param to  The address deposits to
   * @param loopringAddress loopring exchange Address
   * @param tokenId: the tokenId
   * @param chainId
   * @param nftType The type of NFT contract address (ERC721/ERC1155/...)
   * @param nonce
   * @param gasPrice
   * @param gasLimit
   * @param sendByMetaMask
   */
  public async approveNFT({
    web3,
    from,
    depositAddress,
    tokenAddress,
    tokenId,
    nftType = NFTType.ERC1155,
    gasPrice,
    gasLimit,
    chainId,
    nonce,
    approved = true,
    sendByMetaMask = true,
  }: ApproveParam) {
    let data: any;

    if (nftType === NFTType.ERC1155) {
      data = this._genERC1155Data(NFTMethod.setApprovalForAll, {
        operator: depositAddress,
        approved,
      });
    } else if (nftType === NFTType.ERC721) {
      //TODO list not support now
      data = this._genERC721Data(NFTMethod.setApprovalForAll, {
        operator: depositAddress,
        approved,
      });
    }
    try {
      return await sendRawTx(
        web3,
        from,
        tokenAddress,
        "0",
        data,
        chainId,
        nonce,
        gasPrice,
        gasLimit,
        sendByMetaMask
      );
    } catch (error) {
      return {
        error: {
          code: LoopringErrorCode.CONTRACTNFT_SET_APPROVE,
          msg: ConnectorError.CONTRACTNFT_SET_APPROVE,
          ...error,
        },
      };
    }
  }

  /**
   * isApprovedForAll
   * @param web3
   * @param from The address that deposits the funds to the exchange
   * @param exchangeAddress loopring exchange address
   * @param nftType  NFTType
   * @param tokenAddress  The address of NFT token
   */
  public async isApprovedForAll({
    web3,
    from,
    exchangeAddress,
    nftType = NFTType.ERC1155,
    tokenAddress,
  }: IsApproveParam) {
    try {
      const result = await this.callContractMethod(
        web3,
        NFTMethod.isApprovedForAll,
        [from, exchangeAddress],
        tokenAddress,
        nftType
      );
      return result;
    } catch (error) {
      return {
        error: {
          code: LoopringErrorCode.CONTRACTNFT_IS_APPROVE,
          msg: ConnectorError.CONTRACTNFT_IS_APPROVE,
          ...error,
        },
      };
    }
  }

  /**
   * @DepositParam  an NFT to the specified account.
   * @param web3
   * @param from The address that deposits the funds to the exchange
   * @param to The account owner's address receiving the funds
   * @param nftType The type of NFT contract address (ERC721/ERC1155/...)
   * @param tokenAddress The address of NFT token
   * @param nftId The token type 'id`.
   * @param amount The amount of tokens to deposit.
   * @param nonce: number,
   * @param gasPrice: number,
   * @param gasLimit: number,
   * @param extraData Optional extra data used by the deposit contract.
   * @param chainId  0|5
   * @param sendByMetaMask boolean
   */
  public async depositNFT({
    web3,
    from,
    exchangeAddress,
    nftType = NFTType.ERC1155,
    tokenAddress,
    nftId,
    amount,
    gasPrice,
    gasLimit,
    chainId = ChainId.MAINNET,
    nonce,
    extraData,
    sendByMetaMask = true,
  }: DepositNFTParam) {
    const data = genExchangeData(NFTMethod.depositNFT, {
      from,
      to: from,
      nftType,
      tokenAddress,
      nftId,
      amount,
      extraData: extraData ? extraData : "",
    });
    // myLog('depositNFT data',data)
    return await sendRawTx(
      web3,
      from,
      exchangeAddress,
      "0",
      data,
      chainId,
      nonce,
      gasPrice,
      gasLimit,
      sendByMetaMask
    );
  }

  /**
   * @function computeNFTAddress
   * @param owner {string} nftOwner address
   * @param nftFactory {string} Hash address
   * @param chainId {ChainId}
   * @return tokenAddress
   * @throws Error
   */
  public computeNFTAddress({
    nftOwner,
    nftFactory,
    chainId = ChainId.MAINNET,
  }: {
    nftOwner: string;
    nftFactory: string;
    chainId?: ChainId;
  }): { tokenAddress: string } {
    try {
      if (nftOwner.startsWith("0x")) {
        nftOwner = nftOwner.slice(2);
      }

      const saltBuf = Buffer.concat([
        Buffer.from("NFT_CONTRACT_CREATION", "utf8"),
        Buffer.from(nftOwner, "hex"),
        Buffer.from("", "utf8"),
      ]);

      const codeHash = ethUtil.keccak(
        Buffer.from(CREATION_CODE[chainId], "hex")
      );

      const saltHash = ethUtil.keccak(saltBuf);

      const rawBuf = Buffer.concat([
        Buffer.from("ff", "hex"),
        Buffer.from(nftFactory.slice(2), "hex"),
        saltHash,
        codeHash,
      ]);

      const addr = ethUtil.keccak(rawBuf).slice(12).toString("hex");
      return {
        tokenAddress: ethUtil.toChecksumAddress("0x" + addr),
      };
    } catch (e) {
      return e;
    }
  }
}
