/* eslint-disable @typescript-eslint/no-var-requires */
import { BaseAPI } from './base_api'
import CID from 'cids'
import * as loopring_defs from '../defs'
import {
  ChainId,
  ConnectorError,
  LoopringErrorCode,
  NftData,
  NFTFactory,
  NFTTokenInfo,
  ReqMethod,
  ReqParams,
  SIG_FLAG,
} from '../defs'
import { myLog } from '../utils/log_tools'
import * as ethUtil from 'ethereumjs-util'
import { genExchangeData, sendRawTx } from './contract_api'
import { contracts } from './ethereum/contracts'

import BN from 'bn.js'

const CREATION_CODE = {
  [ChainId.GOERLI]:
    '3d602d80600a3d3981f3363d3d373d3d3d363d735854e62554ce1c146a375c370bc0d323368b372d5af43d82803e903d91602b57fd5bf3',
  [ChainId.MAINNET]:
    '3d602d80600a3d3981f3363d3d373d3d3d363d73b25f6d711aebf954fb0265a3b29f7b9beba7e55d5af43d82803e903d91602b57fd5bf3',
  [ChainId.SEPOLIA]:
    '3d602d80600a3d3981f3363d3d373d3d3d363d73667fd554d808b65b12323b1f4f4a3847341626545af43d82803e903d91602b57fd5bf3',
}
const {
  Contracts: {
    erc721Abi: { erc721 },
    erc1155Abi: { erc1155 },
  },
} = contracts

export enum NFTType {
  ERC1155 = 0,
  ERC721,
}

export enum NFT_TYPE_STRING {
  ERC1155 = 'ERC1155',
  ERC721 = 'ERC721',
}

export enum NFTMethod {
  setApprovalForAll = 'setApprovalForAll',
  isApprovedForAll = 'isApprovedForAll',
  uri = 'uri',
  tokenURI = 'tokenURI',
  depositNFT = 'depositNFT',
  balanceOf = 'balanceOf',
  ownerOf = 'ownerOf',
  // Deposit = 'deposit',
  // ForceWithdraw = 'forceWithdraw'
}

export class NFTAPI extends BaseAPI {
  private async callContractMethod(
    web3: any,
    method: string,
    data: any[],
    contractAddress: string,
    type: NFTType = NFTType.ERC1155,
  ) {
    // return _genContractData(Contracts.ERC20Token, method, data)
    const contract = this._genContract(web3, contractAddress, type)
    return contract.methods[method](...data).call()
  }

  private _genContractData(Contract: any, method: string, data: any) {
    return Contract.encodeInputs(method, data)
  }

  private _genERC1155Data(method: string, data: any) {
    return this._genContractData(contracts.Contracts.ERC1155, method, data)
  }

  private _genERC721Data(method: string, data: any) {
    return this._genContractData(contracts.Contracts.ERC721, method, data)
  }

  private _genContract(web3: any, contractAddress: string, type: NFTType = NFTType.ERC1155) {
    return new web3.eth.Contract(type === NFTType.ERC1155 ? erc1155 : erc721, contractAddress)
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
  }: loopring_defs.UserNFTBalanceParam): Promise<{
    count?: string
  }> {
    try {
      if (nftType === NFTType.ERC721) {
        const result: string = await this.callContractMethod(
          web3,
          NFTMethod.ownerOf,
          [nftId],
          tokenAddress,
          nftType,
        )
        if (result.toLowerCase() === account.toLowerCase()) {
          return {
            count: '1',
          }
        } else {
          return {
            count: '0',
          }
        }
      } else {
        const result: string = await this.callContractMethod(
          web3,
          NFTMethod.balanceOf,
          [account, web3.utils.hexToNumberString(nftId)],
          tokenAddress,
          nftType,
        )
        return {
          count: result.toString(),
        }
      }
    } catch (err) {
      return {
        ...(err as any),
        code: LoopringErrorCode.CONTRACTNFT_BALANCE,
        message: ConnectorError.CONTRACTNFT_BALANCE,
      }
    }
  }

  /**
   * getInfoForNFTTokens
   * @param nftDatas NftData[]
   */
  public async getInfoForNFTTokens({
    nftDatas,
  }: {
    nftDatas: NftData[]
  }): Promise<{ [key: string]: NFTTokenInfo } | undefined> {
    try {
      const reqParams: ReqParams = {
        sigFlag: SIG_FLAG.NO_SIG,
        url: loopring_defs.LOOPRING_URLs.GET_NFTs_INFO,
        method: ReqMethod.GET,
        queryParams: { nftDatas: nftDatas.join(',') },
      }
      const raw_data = (await this.makeReq().request(reqParams)).data
      if (raw_data?.resultInfo) {
        return {
          ...raw_data?.resultInfo,
        }
      }
      const result = raw_data.reduce(
        (prev: { [key: string]: NFTTokenInfo }, item: NFTTokenInfo) => {
          if (item.nftId && item.nftId.startsWith('0x')) {
            const hashBN = new BN(item.nftId.replace('0x', ''), 16)
            item.nftId = '0x' + hashBN.toString('hex').padStart(64, '0')
          }
          prev[item.nftData] = item
          return prev
        },
        {},
      )
      return {
        ...result,
        raw_data,
      }
    } catch (err) {
      return undefined
    }
  }

  public async callRefreshNFT(
    request: loopring_defs.CallRefreshNFT,
  ): Promise<{ status: string; createdAt: number; updatedAt: number } | undefined> {
    try {
      const reqParams: ReqParams = {
        sigFlag: SIG_FLAG.NO_SIG,
        bodyParams: request,
        url: loopring_defs.LOOPRING_URLs.POST_NFT_VALIDATE_REFRESH_NFT,
        method: ReqMethod.POST,
      }
      const raw_data = (await this.makeReq().request(reqParams)).data
      if (raw_data?.resultInfo) {
        return {
          ...raw_data?.resultInfo,
        }
      }
      const result = raw_data.reduce(
        (prev: { [key: string]: NFTTokenInfo }, item: NFTTokenInfo) => {
          if (item.nftId && item.nftId.startsWith('0x')) {
            const hashBN = new BN(item.nftId.replace('0x', ''), 16)
            item.nftId = '0x' + hashBN.toString('hex').padStart(64, '0')
          }
          prev[item.nftData] = item
          return prev
        },
        {},
      )
      return {
        ...result,
        raw_data,
      }
    } catch (err) {
      return undefined
    }
  }

  /**
   * getContractNFTMeta
   * @param web3
   * @param tokenAddress
   * @param _id
   * @param nftType
   */
  public async getContractNFTMeta(
    { web3, tokenAddress, nftId, nftType = NFTType.ERC1155 }: loopring_defs.ContractNFTMetaParam,
    _IPFS_META_URL: string = loopring_defs.LOOPRING_URLs.IPFS_META_URL,
  ) {
    try {
      myLog(tokenAddress, 'nftid', nftId, web3.utils.hexToNumberString(nftId))
      let result: string
      result = await this.callContractMethod(
        web3,
        nftType === NFTType.ERC1155 ? NFTMethod.uri : NFTMethod.tokenURI,
        [web3.utils.hexToNumberString(nftId)],
        tokenAddress,
        nftType,
      )
      result = result.replace(/^ipfs:\/\/(ipfs\/)?/, loopring_defs.LOOPRING_URLs.IPFS_META_URL)
      result = result.replace('{id}', web3.utils.hexToNumberString(nftId))
      return await fetch(result).then((response) => response.json())
    } catch (err) {
      return {
        code: LoopringErrorCode.CONTRACTNFT_URI,
        message: ConnectorError.CONTRACTNFT_URI,
        ...(err as any),
      }
    }
  }

  /**
   * approveNFT
   * @param web3
   * @param from  The address that deposits the funds to the exchange
   * @param to  The address deposits to
   * @param nftId the nftId
   * @param chainId
   * @param nftType The type of NFTAction contract address (ERC721/ERC1155/...)
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
    nftId,
    nftType = NFTType.ERC1155,
    gasPrice,
    gasLimit,
    chainId,
    nonce,
    approved = true,
    sendByMetaMask = true,
  }: loopring_defs.ApproveParam) {
    let data: any

    if (nftType === NFTType.ERC1155) {
      data = this._genERC1155Data(NFTMethod.setApprovalForAll, {
        operator: depositAddress,
        approved,
      })
    } else if (nftType === NFTType.ERC721) {
      data = this._genERC721Data(NFTMethod.setApprovalForAll, {
        operator: depositAddress,
        approved,
      })
    }
    try {
      return await sendRawTx(
        web3,
        from,
        tokenAddress,
        '0',
        data,
        chainId,
        nonce,
        gasPrice,
        gasLimit,
        sendByMetaMask,
      )
    } catch (err) {
      return {
        ...(err as any),
        code: LoopringErrorCode.CONTRACTNFT_SET_APPROVE,
        message: ConnectorError.CONTRACTNFT_SET_APPROVE,
      }
    }
  }
  public ipfsCid0ToNftID(cidV0Str: string): string {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const cid = new CID(cidV0Str)
    const hashHex = Buffer.from(cid.multihash.slice(2)).toString('hex')
    const hashBN = new BN(hashHex, 16)
    return '0x' + hashBN.toString('hex').padStart(64, '0')
  }

  /**
   *
   * @param nftId  16
   */
  public ipfsNftIDToCid(nftId: string) {
    const hashBN = new BN(nftId.replace('0x', ''), 16)
    const hex = hashBN.toString(16, 64)
    const buf = Buffer.from('1220' + hex, 'hex')
    const cid = new CID(buf)
    return cid.toString()
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
  }: loopring_defs.IsApproveParam) {
    try {
      const result = await this.callContractMethod(
        web3,
        NFTMethod.isApprovedForAll,
        [from, exchangeAddress],
        tokenAddress,
        nftType,
      )
      return result
    } catch (err) {
      return {
        ...(err as any),
        code: LoopringErrorCode.CONTRACTNFT_IS_APPROVE,
        message: ConnectorError.CONTRACTNFT_IS_APPROVE,
      }
    }
  }

  /**
   * @DepositParam  an NFTAction to the specified account.
   * @param web3
   * @param from The address that deposits the funds to the exchange
   * @param to The account owner's address receiving the funds
   * @param nftType The type of NFTAction contract address (ERC721/ERC1155/...)
   * @param tokenAddress The address of NFTAction token
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
  }: loopring_defs.DepositNFTParam) {
    const data = genExchangeData(NFTMethod.depositNFT, {
      from,
      to: from,
      nftType,
      tokenAddress,
      nftId,
      amount,
      extraData: extraData ? extraData : '',
    })
    // myLog('depositNFT data',data)
    return await sendRawTx(
      web3,
      from,
      exchangeAddress,
      '0',
      data,
      chainId as ChainId,
      nonce,
      gasPrice,
      gasLimit,
      sendByMetaMask,
    )
  }

  /**
   *
   * @function computeNFTAddress
   * @param owner {string} nftOwner address
   * @param nftFactory {string} Hash address
   * @return tokenAddress
   * @throws Error
   */
  public computeNFTAddress({
    nftOwner,
    nftFactory = '0xDB42E6F6cB2A2eFcF4c638cb7A61AdE5beD82609',
    nftBaseUri = '',
  }: {
    nftOwner: string
    nftFactory?: string
    nftBaseUri?: string
  }): { tokenAddress: string } {
    try {
      if (!nftFactory) {
        nftFactory = NFTFactory[this.chainId]
      }
      if (nftOwner.startsWith('0x')) {
        nftOwner = nftOwner.slice(2)
      }

      const saltBuf = Buffer.concat([
        Buffer.from('NFT_CONTRACT_CREATION', 'utf8'),
        Buffer.from(nftOwner, 'hex'),
        Buffer.from(nftBaseUri, 'utf8'),
      ])

      const codeHash = ethUtil.keccak(Buffer.from(CREATION_CODE[this.chainId], 'hex'))

      const saltHash = ethUtil.keccak(saltBuf)

      const rawBuf = Buffer.concat([
        Buffer.from('ff', 'hex'),
        Buffer.from(nftFactory.slice(2), 'hex'),
        saltHash,
        codeHash,
      ])

      const addr = ethUtil.keccak(rawBuf).slice(12).toString('hex')
      return {
        tokenAddress: ethUtil.toChecksumAddress('0x' + addr),
      }
    } catch (err) {
      return err as any
    }
  }

  public async getPublicCollectionById<R extends loopring_defs.CollectionMeta>(request: {
    id: string
  }): Promise<({ raw_data: R } & loopring_defs.CollectionMeta) | loopring_defs.RESULT_INFO> {
    try {
      const reqParams: ReqParams = {
        sigFlag: SIG_FLAG.NO_SIG,
        queryParams: request,
        url: loopring_defs.LOOPRING_URLs.GET_NFT_COLLECTION_PUBLISH,
        method: ReqMethod.GET,
      }
      const raw_data = (await this.makeReq().request(reqParams)).data
      if (raw_data?.resultInfo) {
        return {
          ...raw_data?.resultInfo,
        }
      }
      const result = raw_data as loopring_defs.CollectionMeta
      return {
        ...result,
        raw_data,
      }
    } catch (err) {
      return {
        ...(err as any),
        code: exports.LoopringErrorCode.SKD_UNKNOW,
      }
    }
  }

  async getCollectionWholeNFTs<R>(request: loopring_defs.GetCollectionWholeNFTsRequest) {
    const reqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_COLLECTION_WHOLE_NFTS,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    if (raw_data.nftTokenInfos.length) {
      raw_data.nftTokenInfos = raw_data.nftTokenInfos.reduce(
        (prev: loopring_defs.UserNFTBalanceInfo[], item: loopring_defs.UserNFTBalanceInfo) => {
          if (item.nftId && item.nftId.startsWith('0x')) {
            const hashBN = new BN(item.nftId.replace('0x', ''), 16)
            item.nftId = '0x' + hashBN.toString('hex').padStart(64, '0')
            if (
              request.metadata === true &&
              item.metadata &&
              item.metadata.nftId &&
              item.metadata.nftId.startsWith('0x')
            ) {
              // const hashBN = new BN(item.metadata.nftId.replace("0x", ""), 16);
              item.metadata.nftId = '0x' + hashBN.toString('hex').padStart(64, '0')
            }
          }
          return [...prev, item]
        },
        [],
      )
      // const hashBN = new BN(raw_data.transactions.metadata.nftId.replace("0x", ""), 16);
      // raw_data.transactions.metadata.nftId= "0x" + hashBN.toString("hex").padStart(64, "0");
    }
    return {
      totalNum: raw_data?.totalNum,
      userNFTBalances: raw_data.nftTokenInfos as loopring_defs.UserNFTBalanceInfo[],
      raw_data,
    }
  }
  async getHadUnknownCollection<R>(request: { accountId: number }): Promise<boolean> {
    const reqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_USER_HAD_UNKNOWN_COLLECTION,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return raw_data
  }
  async getUserNFTBurnAddress<R>(request: {
    accountId: number
    tokenId: number
  }): Promise<boolean> {
    const reqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_USER_NFT_BURN_ADDRESS,
      queryParams: request,
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
    }
    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data?.resultInfo,
      }
    }
    return raw_data
  }
}
