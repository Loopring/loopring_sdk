import {
  CUSTOMER_KEY_SEED,
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT as acc,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  TOKEN_INFO,
  web3,
} from "../data";
import {
  ChainId,
  ConnectorNames,
  GetAccountRequest,
  GetCounterFactualInfoRequest,
  GetEthNonceRequest,
  GetUserApiKeyRequest,
  VALID_UNTIL,
} from "../../defs";
import * as contract from "../../api/contract_api";
import * as sign_tools from "../../api/sign/sign_tools";
import { BaseAPI } from "../../api/base_api";
import { ExchangeAPI, NFTType } from "../../api";

describe("Account test", function () {
  beforeEach(() => {
    LoopringAPI.InitApi(ChainId.GOERLI);
  });
  it("getWalletType", async () => {
    const [
      { walletType: CFWalletType },
      { walletType: EOAWalletType },
      { walletType: ContractWalletType },
    ] = await Promise.all([
      LoopringAPI.walletAPI.getWalletType({
        wallet: LOOPRING_EXPORTED_ACCOUNT.addressCF,
      }),
      LoopringAPI.walletAPI.getWalletType({
        wallet: LOOPRING_EXPORTED_ACCOUNT.address,
      }),
      LoopringAPI.walletAPI.getWalletType({
        wallet: LOOPRING_EXPORTED_ACCOUNT.addressContractWallet,
      }),
    ]);
    console.log(
      "CFWalletType, EOAWalletType, ContractWalletType",
      CFWalletType,
      EOAWalletType,
      ContractWalletType
    );
    // if (walletType && walletType?.isInCounterFactualStatus) {
    //   setIsCFAddress(true);
    // } else {
    //   setIsCFAddress(false);
    // }
  });
  it(
    "getAccount",
    async () => {
      const response = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      });
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "updateAccount",
    async () => {
      // step 1. get account info
      const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      });
      if (!accInfo) {
        return;
      }

      /*
       * @replace LOOPRING_EXPORTED_ACCOUNT.exchangeAddr =  exchangeInfo.exchangeAddress
       */
      const { exchangeInfo } = await LoopringAPI.exchangeAPI.getExchangeInfo();
      const keySeed =
        accInfo.keySeed && accInfo.keySeed !== ""
          ? accInfo.keySeed
          : BaseAPI.KEY_MESSAGE.replace(
              "${exchangeAddress}",
              exchangeInfo.exchangeAddress
            ).replace("${nonce}", accInfo.nonce.toString());
      console.log("accInfo:", accInfo);
      const eddsaKey = await sign_tools.generateKeyPair({
        web3,
        address: accInfo.owner,
        keySeed,
        // exchangeAddress: exchangeInfo.exchangeAddress,
        // keyNonce: accInfo.nonce,
        walletType: ConnectorNames.MetaMask,
        chainId: ChainId.GOERLI,
      });
      console.log("eddsakey:", eddsaKey.sk);
      const request = {
        exchange: exchangeInfo.exchangeAddress,
        owner: accInfo.owner,
        accountId: accInfo.accountId,
        publicKey: { x: eddsaKey.formatedPx, y: eddsaKey.formatedPy },
        maxFee: {
          tokenId: 1,
          volume: "171600000000000000",
        },
        keySeed,
        validUntil: VALID_UNTIL,
        nonce: accInfo.nonce as number,
      };
      const result = await LoopringAPI.userAPI.updateAccount({
        request,
        web3,
        chainId: ChainId.GOERLI,
        walletType: ConnectorNames.Unknown,
        isHWAddr: false,
      });
      console.log("updateAccount result: ", JSON.stringify(result));
      const { accInfo: afterAccInfo } =
        await LoopringAPI.exchangeAPI.getAccount({
          owner: LOOPRING_EXPORTED_ACCOUNT.address,
        });
      console.log("getAccount afterAccInfo: ", JSON.stringify(afterAccInfo));
    },
    DEFAULT_TIMEOUT + 20000
  );

  it(
    "customer_keySeed",
    async () => {
      // step 1. get account info
      const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      });

      if (!accInfo) {
        return;
      }

      /*
       * @replace LOOPRING_EXPORTED_ACCOUNT.exchangeAddr =  exchangeInfo.exchangeAddress
       */
      const { exchangeInfo } = await LoopringAPI.exchangeAPI.getExchangeInfo();

      const keySeed = CUSTOMER_KEY_SEED.replace(
        "${nonce}",
        accInfo.nonce.toString()
      );
      console.log("accInfo:", accInfo);
      const eddsaKey = await sign_tools.generateKeyPair({
        web3,
        address: accInfo.owner,
        keySeed,
        walletType: ConnectorNames.MetaMask,
        chainId: ChainId.GOERLI,
      });
      console.log(CUSTOMER_KEY_SEED, keySeed, "eddsakey:", eddsaKey.sk);
      const request = {
        exchange: exchangeInfo.exchangeAddress,
        owner: accInfo.owner,
        accountId: accInfo.accountId,
        publicKey: { x: eddsaKey.formatedPx, y: eddsaKey.formatedPy },
        maxFee: {
          tokenId: 1,
          volume: "122700000000000000",
        },
        keySeed,
        validUntil: VALID_UNTIL,
        nonce: accInfo.nonce as number,
      };
      const result = await LoopringAPI.userAPI.updateAccount({
        request,
        web3,
        chainId: ChainId.GOERLI,
        walletType: ConnectorNames.Unknown,
        isHWAddr: false,
      });
      console.log("updateAccount result: ", JSON.stringify(result));
      const { accInfo: afterAccInfo } =
        await LoopringAPI.exchangeAPI.getAccount({
          owner: LOOPRING_EXPORTED_ACCOUNT.address,
        });
      const nonce = afterAccInfo.nonce;
      console.log(
        "getAccount afterAccInfo: ",
        JSON.stringify(afterAccInfo),
        accInfo.keySeed
      );
      console.log("afterAccInfo keySeed: ", afterAccInfo.keySeed);
      const afterEddsaKey = await sign_tools.generateKeyPair({
        web3,
        address: accInfo.owner,
        keySeed:
          accInfo.keySeed && accInfo.keySeed !== ""
            ? accInfo.keySeed
            : BaseAPI.KEY_MESSAGE.replace(
                "${exchangeAddress}",
                LOOPRING_EXPORTED_ACCOUNT.exchangeAddr
              ).replace("${nonce}", (nonce - 1).toString()),
        // exchangeAddress: exchangeInfo.exchangeAddress,
        // keyNonce: accInfo.nonce,
        walletType: ConnectorNames.MetaMask,
        chainId: ChainId.GOERLI,
      });

      console.log("afterEddsaKey: ", JSON.stringify(afterEddsaKey));
    },
    DEFAULT_TIMEOUT + 20000
  );

  it(
    "getUserApiKey",
    async () => {
      // const provider = new PrivateKeyProvider(
      //   LOOPRING_EXPORTED_ACCOUNT.privateKey,
      //   "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
      // );
      //
      // const web3 = new Web3(provider);

      const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      });
      const nonce = accInfo.nonce;
      const eddsaKey = await sign_tools.generateKeyPair({
        web3,
        address: accInfo.owner,
        keySeed:
          accInfo.keySeed && accInfo.keySeed !== ""
            ? accInfo.keySeed
            : BaseAPI.KEY_MESSAGE.replace(
                "${exchangeAddress}",
                LOOPRING_EXPORTED_ACCOUNT.exchangeAddr
              ).replace("${nonce}", (nonce - 1).toString()),
        walletType: ConnectorNames.MetaMask,
        chainId: ChainId.GOERLI,
      });
      console.log("eddsakey:", eddsaKey.sk);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "Layer1_ETH_Balance",
    async () => {
      const { ethBalance } = await LoopringAPI.exchangeAPI.getEthBalances({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      });
      console.log(`Layer1 ethBalance: ${ethBalance}`);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "Layer1_ERC20_Balance",
    async () => {
      const { tokenBalances } = await LoopringAPI.exchangeAPI.getTokenBalances({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
        token: [TOKEN_INFO.tokenMap.LRC.address],
      });
      console.log(
        `Layer1 ERC20 Balance LRC: ${
          tokenBalances[TOKEN_INFO.tokenMap.LRC.address]
        }`
      );
    },
    DEFAULT_TIMEOUT
  );

  it(
    "Layer2_getUserBalances",
    async () => {
      const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      });

      const eddsakey = await sign_tools.generateKeyPair({
        web3,
        address: accInfo.owner,
        keySeed:
          accInfo.keySeed && accInfo.keySeed !== ""
            ? accInfo.keySeed
            : BaseAPI.KEY_MESSAGE.replace(
                "${exchangeAddress}",
                LOOPRING_EXPORTED_ACCOUNT.exchangeAddr
              ).replace("${nonce}", (accInfo.nonce - 1).toString()),
        walletType: ConnectorNames.MetaMask,
        chainId: ChainId.GOERLI,
      });

      console.log("eddsakey:", eddsakey.sk);

      // step 3 get apikey
      const request: GetUserApiKeyRequest = {
        accountId: accInfo.accountId,
      };

      let { apiKey } = await LoopringAPI.userAPI.getUserApiKey(
        request,
        eddsakey.sk
      );
      const { userBalances } = await LoopringAPI.userAPI.getUserBalances(
        { accountId: LOOPRING_EXPORTED_ACCOUNT.accountId, tokens: "" },
        apiKey
      );
      // const { tokenBalances } = await LoopringAPI.userAPI.getUserBalances({
      //   owner: LOOPRING_EXPORTED_ACCOUNT.address,
      //   token: [TOKEN_INFO.tokenMap.LRC.address],
      // });
      console.log(`Layer2 ERC20 Balance: ${userBalances}`);
    },
    DEFAULT_TIMEOUT
  );

  it("Layer1_getNFTBalance", async () => {
    const response = await LoopringAPI.nftAPI.getNFTBalance({
      web3,
      account: LOOPRING_EXPORTED_ACCOUNT.address,
      tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
      nftId: LOOPRING_EXPORTED_ACCOUNT.nftId,
      nftType: NFTType.ERC1155,
    });
    console.log(response);
  });

  it(
    "Layer2_getUserNFTBalances",
    async () => {
      const { accInfo } = await LoopringAPI.exchangeAPI.getAccount({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      });

      const eddsakey = await sign_tools.generateKeyPair({
        web3,
        address: accInfo.owner,
        keySeed:
          accInfo.keySeed && accInfo.keySeed !== ""
            ? accInfo.keySeed
            : BaseAPI.KEY_MESSAGE.replace(
                "${exchangeAddress}",
                LOOPRING_EXPORTED_ACCOUNT.exchangeAddr
              ).replace("${nonce}", (accInfo.nonce - 1).toString()),
        walletType: ConnectorNames.MetaMask,
        chainId: ChainId.GOERLI,
      });

      console.log("eddsakey:", eddsakey.sk);

      // step 3 get apikey
      const request: GetUserApiKeyRequest = {
        accountId: accInfo.accountId,
      };

      let { apiKey } = await LoopringAPI.userAPI.getUserApiKey(
        request,
        eddsakey.sk
      );
      const { userNFTBalances } = await LoopringAPI.userAPI.getUserNFTBalances(
        { accountId: accInfo.accountId, limit: 20 },
        apiKey
      );
      console.log(`Layer2 NFT Balance: ${userNFTBalances}`);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getAccountWhitelisted",
    async () => {
      const request: GetAccountRequest = {
        owner: LOOPRING_EXPORTED_ACCOUNT.whitelistedAddress,
      };
      const response = await LoopringAPI.exchangeAPI.getAccount(request);
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );
  it(
    "getAccount_Not_Found",
    async () => {
      const request: GetAccountRequest = {
        owner: "Ox",
      };
      const response = await LoopringAPI.exchangeAPI.getAccount(request);
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getCounterFactualInfo",
    async () => {
      const request: GetCounterFactualInfoRequest = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        accountId: LOOPRING_EXPORTED_ACCOUNT.accountIdCF, // TODO
      };
      const response = await LoopringAPI.exchangeAPI.getCounterFactualInfo(
        request
      );
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "getEthNonce",
    async () => {
      const req: GetEthNonceRequest = {
        owner: acc.address,
      };
      const response = await LoopringAPI.exchangeAPI.getEthNonce(req);
      console.log(response);
    },
    DEFAULT_TIMEOUT
  );

  it("getActiveFeeInfo without accountId", async () => {
    const response = await LoopringAPI.globalAPI.getActiveFeeInfo({});
    console.log(response);
  });

  it("getActiveFeeInfo with accountId", async () => {
    const response = await LoopringAPI.globalAPI.getActiveFeeInfo({
      accountId: LOOPRING_EXPORTED_ACCOUNT.accountId,
    });
    console.log(response);
  });
});
