import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  signatureKeyPairMock,
  testTypedData,
  web3,
} from '../../MockData'
import * as sdk from '../../../index'
import {
  AccountInfo,
  getEdDSASig,
  getNftData,
  NFTOrderRequestV3,
  NFTTradeRequestV3,
  NFTType,
  SubmitOrderRequestV3,
} from '../../../index'
import { myLog } from '../../../utils/log_tools'
import { performance } from 'perf_hooks'
import { recoverAddress } from 'ethers/lib/utils'
import { serializeDataIfNeeded } from '../../../api/request'
import { EDDSAUtil } from '../../../api/sign/poseidon/EDDSAUtil'

let mockData:
  | {
      accInfo: AccountInfo
      apiKey: string
      eddsaKey: any
    }
  | undefined = undefined
describe('signature', function () {
  beforeEach(async () => {
    // Step 1. getAccount
    const accInfo = (
      await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      })
    ).accInfo
    const eddsaKey = await signatureKeyPairMock(accInfo)

    // Step 3. apiKey
    const apiKey = (
      await LoopringAPI.userAPI.getUserApiKey(
        {
          accountId: accInfo.accountId,
        },
        eddsaKey.sk,
      )
    ).apiKey

    mockData = {
      apiKey,
      accInfo,
      eddsaKey,
    }
  }, DEFAULT_TIMEOUT * 3)
  it(
    'generateKeyPair',
    async () => {
      const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      })
      const result = await signatureKeyPairMock(accInfo)
      console.log(result.sk)
    },
    DEFAULT_TIMEOUT,
  )
  /**
   * test case is not allow brock by Mock provider
   */
  // it(
  //   "getEcDSASig:eth_signTypedData_v4",
  //   async () => {
  //     // test case is not allow brock by Mock provider
  //     const result = await sdk.getEcDSASig(
  //       web3,
  //       testTypedData,
  //       LOOPRING_EXPORTED_ACCOUNT.address,
  //       sdk.GetEcDSASigType.HasDataStruct,
  //       sdk.ChainId.GOERLI,
  //       LOOPRING_EXPORTED_ACCOUNT.accountId,
  //       "",
  //       sdk.ConnectorNames.Unknown
  //     );
  //     console.log(
  //       "getEcDSASig:eth_signTypedData_v4",
  //       result,
  //       "ecdsaSig+sdk.SigSuffix.Suffix02",
  //       result.ecdsaSig + sdk.SigSuffix.Suffix02
  //     );
  //   },
  //   DEFAULT_TIMEOUT
  // );

  it('getEcDSASig:WithoutDataStruct(personalSign)', async () => {
    const result = await sdk.getEcDSASig(
      web3,
      testTypedData,
      LOOPRING_EXPORTED_ACCOUNT.address,
      sdk.GetEcDSASigType.WithoutDataStruct,
      sdk.ChainId.GOERLI,
      LOOPRING_EXPORTED_ACCOUNT.accountId,
      '',
      sdk.ConnectorNames.Unknown,
    )
    console.log('getEcDSASig:WithoutDataStruct(personalSign)', result)
  })

  it('genSigWithPadding', async () => {
    // const sign = genSigWithPadding(
    //   LOOPRING_EXPORTED_ACCOUNT.eddsaKey.sk,
    //   '4802789675835142786409394599364863978702692874349325354528260268536567293213',
    // )
    // console.log(sign)
  })
  it('getEdDSASig', async () => {
    if (mockData) {
      const sign = await sdk.getEdDSASig(
        'GET',
        'https://uat2.loopring.io',
        '/api/v3/apiKey/',
        {
          accountId: '10010',
        },
        mockData.eddsaKey.sk,
      )
      console.log(sign)
    }
  })
  it('getEdDSASig_100', async () => {
    if (mockData) {
      performance.now()
      for (let i = 100; i > 0; i--) {
        const sign = await sdk.getEdDSASig(
          'GET',
          'https://uat2.loopring.io',
          '/api/v3/apiKey/',
          {
            accountId: '10010',
          },
          mockData.eddsaKey.sk,
        )
        console.log(sign)
      }
      performance.now()
    }
  })
  /**
   * test case is not allow brock by Mock provider
   */
  // it("personalSign Contract", async () => {
  //   await sdk.getEcDSASig(
  //     web3,
  //     testTypedData,
  //     LOOPRING_EXPORTED_ACCOUNT.address,
  //     sdk.GetEcDSASigType.Contract,
  //     sdk.ChainId.GOERLI,
  //     LOOPRING_EXPORTED_ACCOUNT.accountId,
  //     "",
  //     sdk.ConnectorNames.Unknown
  //   );
  // });
  it.skip('NFTAction Trade Hash', async () => {
    try {
      const makerOrder: NFTOrderRequestV3 = {
        exchange: '0xD1221BA705B653d9Ea22569c911Bddf68264fAF4',
        accountId: 10979,
        storageId: 36,
        sellToken: {
          tokenId: 2,
          nftData: '',
          amount: '118117838',
        },
        buyToken: {
          tokenId: 32769,
          nftData: '0x26b32b508180c293e1a6581fd8a1ebff4734966578a008247c9f0bf9cdb5e492',
          amount: '2',
        },
        allOrNone: false,
        fillAmountBOrS: true,
        validUntil: 1680332114,
        maxFeeBips: 1000,
      }
      makerOrder.eddsaSignature =
        '0x2553b338ce18a9bc4f51412ccf2c37ba04538ef26e4897fdcf244d0bcf71fe270a0ccebe65cc4a13a3c3e6f84c3de919f7d81434df0a50b8f583e4c7b350b2a203c01b8472e3474c6b2225de41da6ae67a781986d43063ce8008d5978cab3c1f'

      const takerOrder: NFTOrderRequestV3 = {
        exchange: '0xD1221BA705B653d9Ea22569c911Bddf68264fAF4',
        accountId: 10092,
        storageId: 2,
        sellToken: {
          tokenId: 32769,
          nftData: '0x26b32b508180c293e1a6581fd8a1ebff4734966578a008247c9f0bf9cdb5e492',
          amount: '1',
        },
        buyToken: {
          tokenId: 2,
          nftData: '',
          amount: '59000000',
        },
        allOrNone: false,
        fillAmountBOrS: false,
        validUntil: 1680332114,
        maxFeeBips: 1000,
      }

      takerOrder.eddsaSignature =
        '0x28e1fef32e0e7d119d5f2a078bf9f0ad677f72eed18ef35d98326a389ebb5e900a92fe81cfd4fc0a2758dba3bbf55f79c073ac539490b5fc6e16a8046df946dd060025f14fc3d92ef72163639e4ec8cef629e335343c44a291aed5a6e8d646bf'

      const tradeRequest: NFTTradeRequestV3 = {
        maker: makerOrder,
        makerFeeBips: 99,
        taker: takerOrder,
        takerFeeBips: 99,
      }

      const hash = await sdk.getNftTradeHash(tradeRequest)

      // result should be 0x244b36f43e462167942bb336e180df74dcca5726742cfab9ae1b70b6dfe5f4a
      console.log('NFT Trade hash is 0x' + hash)
    } catch (err) {
      console.log(err)
    }
  })
  it.skip('ERC20 Order Hash', async () => {
    try {
      const orderRequest: SubmitOrderRequestV3 = {
        exchange: '0x2e76EBd1c7c0C8e7c2B875b6d505a260C525d25e',
        accountId: 11040,
        storageId: 10,
        sellToken: {
          tokenId: 1,
          volume: '986000000000000000000',
        },
        buyToken: {
          tokenId: 0,
          volume: '74861064000000000',
        },
        maxFeeBips: 60,
        validUntil: 1653995768,
        fillAmountBOrS: false,
        allOrNone: false,
        eddsaSignature: '',
      }

      const hash = await sdk.getOrderHash(orderRequest)

      // result should be : 0x15b965bbf0e01697939a5cd8be6e631f6cf4a3009ee9fb8631d193e0d5218b92
      console.log('ERC20 order hash is 0x' + hash)
    } catch (err) {
      console.log(err)
    }
  })
  it.skip('getNftData', async () => {
    const cid = 'QmNuqdeWUJ9iEiw5qZfJ2pJ9onqAS45ZffvV8JQSUzp7DQ'
    const nftID = LoopringAPI.nftAPI.ipfsCid0ToNftID(cid)
    const mintRequest = {
      exchange: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
      minterId: LOOPRING_EXPORTED_ACCOUNT.accountId,
      minterAddress: LOOPRING_EXPORTED_ACCOUNT.address,
      toAccountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
      toAddress: LOOPRING_EXPORTED_ACCOUNT.address,
      nftType: NFTType.ERC1155,
      tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
      nftId: nftID, //nftId.toString(16),
      amount: '1',
      validUntil: LOOPRING_EXPORTED_ACCOUNT.validUntil,
      storageId: 9,
      maxFee: {
        tokenId: 1,
        amount: '9400000000000000000',
      },
      royaltyPercentage: 5,
      forceToMint: true, // suggest use as false, for here is just for run test
    }
    myLog('cid', cid, 'nftID', nftID, 'result is:')
    getNftData({ ...mintRequest, nftId: nftID })
    myLog('nftID', '0x1', 'result is:')
    getNftData({ ...mintRequest, nftId: '0x1' })
  })
  it.skip('get hash', async () => {
  //   basePath: string,
  // api_url: string,
  // requestInfo: any,
    const sorted = serializeDataIfNeeded({
      "createData": {
        "l2": {
          "updateAccountData": "{\"accountId\":10134,\"counterFactualInfo\":{\"walletOwner\":\"0x75652e23a467aab68c7e2c90dbe2c6223b1f6b2f\",\"walletFactory\":\"0xe7d8df8f6546965a59dab007e8709965efe1255d\",\"walletSalt\":\"1711465569\"},\"ecdsaSignature\":\"0x2426ec6f8fc1e14f72fa00a4383e7f487f06db87a020f937c179264d2153f75005e3f77f04d0763bdcd1f7ee1128a09e3e1657e5fa3a692bb425aec492f800ca1c\",\"exchange\":\"0x5db136b5a3b2901f4d65bdc4547c5E45e4fb3587\",\"hashApproved\":\"0x87cf36017f0a8e19aa1483262250fb35fb8830af1bd6391cd8381e4f61e490ca\",\"maxFee\":{\"volume\":\"1608000000000000\",\"tokenId\":0},\"nonce\":0,\"owner\":\"0xdb5300df6159cf8aee728948453d4639fdf29215\",\"publicKey\":{\"x\":\"0x127dfe23f8383af0e6d8815d91898c3fe625dfdbadbfbe2720b72bff539d71ee\",\"y\":\"0x28711897b691ca93769dac305a8499a58c95ddc9912c065f8e36fa682a279da3\"},\"validUntil\":1899273791}"
        }
      },
      "network": "Sepolia",
      "orderId": 27,
      "owner": "0x75652e23a467aab68c7e2c90dbe2c6223b1f6b2f",
      "wallet": "0xdb5300df6159cf8aee728948453d4639fdf29215"
    })
    const sig2= "0x2426ec6f8fc1e14f72fa00a4383e7f487f06db87a020f937c179264d2153f75005e3f77f04d0763bdcd1f7ee1128a09e3e1657e5fa3a692bb425aec492f800ca1c"
    const obj = {
      "accountId": 10134,
      "counterFactualInfo": {
        "walletOwner": "0x75652e23a467aab68c7e2c90dbe2c6223b1f6b2f",
        "walletFactory": "0xe7d8df8f6546965a59dab007e8709965efe1255d",
        "walletSalt": "1711465569"
      },
      // "ecdsaSignature": "0x2426ec6f8fc1e14f72fa00a4383e7f487f06db87a020f937c179264d2153f75005e3f77f04d0763bdcd1f7ee1128a09e3e1657e5fa3a692bb425aec492f800ca1c",
      "exchange": "0x5db136b5a3b2901f4d65bdc4547c5E45e4fb3587",
      "hashApproved": "0x87cf36017f0a8e19aa1483262250fb35fb8830af1bd6391cd8381e4f61e490ca",
      "maxFee": {
        "volume": "1608000000000000",
        "tokenId": 0
      },
      "nonce": 0,
      "owner": "0xdb5300df6159cf8aee728948453d4639fdf29215",
      "publicKey": {
        "x": "0x127dfe23f8383af0e6d8815d91898c3fe625dfdbadbfbe2720b72bff539d71ee",
        "y": "0x28711897b691ca93769dac305a8499a58c95ddc9912c065f8e36fa682a279da3"
      },
      "validUntil": 1899273791
    }
    const sig = '0x0e5a5c48186e8ca96ad8c7fa9ad6651debb693f9ebd2494d1359406e5767b0424436d1d4ac6b5d154f21aafafd389a464001ef97dc1eb0c76694f4fcada0b0e91b'
    const hash = sdk.getRequstHash('POST', 'http://aa4c8da74cf154b52bdad56369956089-1213582495.us-east-2.elb.amazonaws.com', '/api/wallet/v3/submitL1L2CreationRequest', serializeDataIfNeeded(obj))
    const addr = recoverAddress(hash, sig)
    debugger
  })
  // it('aes decript', async () => {
  // //   basePath: string,
  // // api_url: string,
  // // requestInfo: any,
  // const crypto = require("crypto");

  // var key = "";
  // const iv =  "";
  // const token = "";
  
  
  // function decrypt(token:any, iv:any, _key: any) {
  //   const key = 
  //     const decrypter = crypto.createDecipheriv("aes-256-cbc", key, iv);
  //     let decrypted = decrypter.update(token, "hex", "utf8");
  //     decrypted += decrypter.final("utf8");
  //     return  decrypted
  // }
  
  // console.log(decrypt(token, iv, key));
  //   debugger
  // })
  it.only('eddsa', async () => {
    const packed = EDDSAUtil.pack('0x127dfe23f8383af0e6d8815d91898c3fe625dfdbadbfbe2720b72bff539d71ee', '0x28711897b691ca93769dac305a8499a58c95ddc9912c065f8e36fa682a279da3')
    const aaa = sdk.convertPublicKey({
      x: '0x127dfe23f8383af0e6d8815d91898c3fe625dfdbadbfbe2720b72bff539d71ee', 
      y: '0x28711897b691ca93769dac305a8499a58c95ddc9912c065f8e36fa682a279da3'
    }).toString(16)
    debugger
    // 28711897b691ca93769dac305a8499a58c95ddc9912c065f8e36fa682a279da3
  })
})

export default {}
