import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  web3,
} from "../../MockData";
import * as sdk from "../../../index";
describe("nft test", function () {
  it(
    "approveNFT",
    async () => {
      const nonce = await sdk.getNonce(web3, LOOPRING_EXPORTED_ACCOUNT.address);
      const response = await LoopringAPI.nftAPI.approveNFT({
        web3,
        from: LOOPRING_EXPORTED_ACCOUNT.address,
        depositAddress: LOOPRING_EXPORTED_ACCOUNT.depositAddress,
        tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
        // tokenId: LOOPRING_EXPORTED_ACCOUNT.nftId,
        nftType: sdk.NFTType.ERC1155,
        gasPrice: LOOPRING_EXPORTED_ACCOUNT.gasPrice,
        gasLimit: LOOPRING_EXPORTED_ACCOUNT.gasLimit,
        chainId: sdk.ChainId.GOERLI,
        nonce,
        approved: true,
        sendByMetaMask: true,
      });
      console.log(`nonce: ${nonce} approveNFT: ${response?.result}`);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "approveNFT",
    async () => {
      const nonce = await sdk.getNonce(web3, LOOPRING_EXPORTED_ACCOUNT.address);
      const response = await LoopringAPI.nftAPI.approveNFT({
        web3,
        from: LOOPRING_EXPORTED_ACCOUNT.address,
        depositAddress: LOOPRING_EXPORTED_ACCOUNT.depositAddress,
        tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
        nftType: sdk.NFTType.ERC1155,
        gasPrice: LOOPRING_EXPORTED_ACCOUNT.gasPrice,
        gasLimit: LOOPRING_EXPORTED_ACCOUNT.gasLimit,
        chainId: sdk.ChainId.GOERLI,
        nonce,
        sendByMetaMask: true,
      });
      console.log(`nonce: ${nonce} approveNFT: ${response?.result}`);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "notApproveNFT",
    async () => {
      const nonce = await sdk.getNonce(web3, LOOPRING_EXPORTED_ACCOUNT.address);
      const response = await LoopringAPI.nftAPI.approveNFT({
        web3,
        from: LOOPRING_EXPORTED_ACCOUNT.address,
        depositAddress: LOOPRING_EXPORTED_ACCOUNT.depositAddress,
        tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
        nftType: sdk.NFTType.ERC1155,
        gasPrice: LOOPRING_EXPORTED_ACCOUNT.gasPrice,
        gasLimit: LOOPRING_EXPORTED_ACCOUNT.gasLimit,
        chainId: sdk.ChainId.GOERLI,
        nonce,
        approved: false,
        sendByMetaMask: true,
      });
      console.log(`nonce: ${nonce} approveNFT: ${response?.result}`);
    },
    DEFAULT_TIMEOUT
  );

  it(
    "deposit NFTAction ERC1155",
    async () => {
      const nonce = await sdk.getNonce(web3, LOOPRING_EXPORTED_ACCOUNT.address);
      const response = await LoopringAPI.nftAPI.depositNFT({
        web3,
        from: LOOPRING_EXPORTED_ACCOUNT.address,
        exchangeAddress: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
        nftType: sdk.NFTType.ERC1155,
        tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
        nftId: LOOPRING_EXPORTED_ACCOUNT.nftId,
        amount: 1,
        gasPrice: LOOPRING_EXPORTED_ACCOUNT.gasPrice,
        gasLimit: LOOPRING_EXPORTED_ACCOUNT.gasLimit,
        chainId: sdk.ChainId.GOERLI,
        nonce,
        sendByMetaMask: true,
      });

      console.log(`nonce: ${nonce} deposit NFT ERC1155: `, response);
    },
    DEFAULT_TIMEOUT
  );

  // it(
  //   "deposit NFTAction ERC721",
  //   async () => {
  //     const nonce = await sdk.getNonce(
  //       web3,
  //       LOOPRING_EXPORTED_ACCOUNT.address
  //     );
  //     const response = await LoopringAPI.nftAPI.depositNFT({
  //       web3,
  //       from: LOOPRING_EXPORTED_ACCOUNT.address,
  //       exchangeAddress: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
  //       nftType: NFTType.ERC721,
  //       tokenAddress: '// TODO:',
  //       nftId:  '// TODO:',
  //       amount: 1,
  //       gasPrice: LOOPRING_EXPORTED_ACCOUNT.gasPrice,
  //       gasLimit: LOOPRING_EXPORTED_ACCOUNT.gasLimit,
  //       chainId: ChainId.GOERLI,
  //       nonce,
  //       sendByMetaMask: true,
  //     });
  //
  //     console.log(`nonce: ${nonce} deposit NFT ERC1155: `, response);
  //   },
  //   DEFAULT_TIMEOUT
  // );

  it(
    "isApprovedForAll",
    async () => {
      const response = await LoopringAPI.nftAPI.isApprovedForAll({
        web3,
        from: LOOPRING_EXPORTED_ACCOUNT.address,
        exchangeAddress: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
        nftType: sdk.NFTType.ERC1155,
        tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
      });
      console.log(`check is approveNFT`, response);
    },
    DEFAULT_TIMEOUT
  );
});
