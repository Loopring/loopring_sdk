
import * as sdk from '../../../index'
import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  signatureKeyPairMock,
  testTypedData, TOKEN_INFO,
  web3,
} from "../../test.MockData"
import {webAssemblySign} from "../../../api/sign/webAssemblySign";
import {getEdDSASigWithPoseidon} from "../../../index";

describe('signature', function () {
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
  it('ORDER_SIGN', async () => {
    const inputValue = 0.0017999
    const slippage = 0.1
    const sell = 'ETH' //sellSymbol
    const buy = 'LRC' //buySymbol

    const eddsaKey = await signatureKeyPairMock({
      owner: LOOPRING_EXPORTED_ACCOUNT.address,
      nonce: 1,
      keySeed: '',
      // accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
    } as any)

    const dataToSig = [
      LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
      1,
      LOOPRING_EXPORTED_ACCOUNT.accountId,
      TOKEN_INFO.tokenMap[sell].tokenId,
      TOKEN_INFO.tokenMap[buy].tokenId,
      '100',
      '599906670000',
      LOOPRING_EXPORTED_ACCOUNT.validUntil,
      5,
      0,
      0,
    ]

    const { hash, result } = await webAssemblySign.getEdDSASigWithPoseidon(dataToSig, eddsaKey.sk)
    const {hash:_jHash,result:_result} = getEdDSASigWithPoseidon(dataToSig, eddsaKey.sk)
    console.log('hash, result', hash,_jHash, result,_result)

  })
  it('signRequest', async () => {
    const eddsaKey = await signatureKeyPairMock({
      owner: LOOPRING_EXPORTED_ACCOUNT.address,
      nonce: 1,
      keySeed: '',
      // accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
    } as any)

    const sign = await sdk.signRequest(
        'GET',
        'https://uat2.loopring.io',
        '/api/v3/apiKey/',
        new Map([
          ["accountId", '10010'],
          ["params",'1,2,3,4'],
          ["someUndefinet", undefined],
          ["special","!'()"],
        ])
        ,
        eddsaKey.sk,
    )
    const _sign = await webAssemblySign.signRequest(eddsaKey.sk,
        'GET',
        'https://uat2.loopring.io',
        '/api/v3/apiKey/',
        new Map([
          ["accountId", '10010'],
          ["params",'1,2,3,4'],
          ["someUndefinet", undefined],
          ["special","!'()"],
        ])
        ,
    )
    console.log('sdk Sign, webAssemblySign',sign,_sign)
  })
  it('signRequestPost', async () => {
    const eddsaKey = await signatureKeyPairMock({
      owner: LOOPRING_EXPORTED_ACCOUNT.address,
      nonce: 1,
      keySeed: '',
      // accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
    } as any)

    const sign = await sdk.signRequest(
        'POST',
        'https://uat2.loopring.io',
        '/api/v3/apiKey/',
        new Map([
          ["accountId", '10010'],
          ["order",JSON.stringify({
            tokenId:1,
            amount:'0x1123124312'
          })],
          ["array",JSON.stringify([1,2,3])],
          ["someUndefinet", undefined],
          ["special","!'()"],
        ]),
        eddsaKey.sk,
    )
    const _sign = await webAssemblySign.signRequest(eddsaKey.sk,
        'POST',
        'https://uat2.loopring.io',
        '/api/v3/apiKey/',
        new Map([
          ["accountId", '10010'],
          ["order",JSON.stringify({
            tokenId:1,
            amount:'0x1123124312'
          })],
          ["array",JSON.stringify([1,2,3])],
          ["someUndefinet", undefined],
          ["special","!'()"],
        ])
    )
    console.log('sdk Sign',sign,'webAssemblySign',_sign)
  })
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
})

export default {}
