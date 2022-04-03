import {
  DEFAULT_TIMEOUT,
  LOOPRING_EXPORTED_ACCOUNT,
  LoopringAPI,
  web3,
} from "../../MockData";
import * as sdk from "../../../index";
describe("depositNFT", function () {
  it(
    "deposit NFTAction ERC1155",
    async () => {
      // step 1. getNFTBalance & getEthBalances
      const { ethBalance } = await LoopringAPI.exchangeAPI.getEthBalances({
        owner: LOOPRING_EXPORTED_ACCOUNT.address,
      });
      const nftBalance = await LoopringAPI.nftAPI.getNFTBalance({
        web3,
        account: LOOPRING_EXPORTED_ACCOUNT.address,
        tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
        nftId: LOOPRING_EXPORTED_ACCOUNT.nftId,
        nftType: sdk.NFTType.ERC1155,
      });

      // step 2. isApprovedForAll
      const isApprovedForAll = await LoopringAPI.nftAPI.isApprovedForAll({
        web3,
        from: LOOPRING_EXPORTED_ACCOUNT.address,
        exchangeAddress: LOOPRING_EXPORTED_ACCOUNT.exchangeAddress,
        nftType: sdk.NFTType.ERC1155,
        tokenAddress: LOOPRING_EXPORTED_ACCOUNT.nftTokenAddress,
      });
      console.log(`check is approveNFT`, isApprovedForAll);

      // step 3. approveNFT All
      if (!isApprovedForAll) {
        const nonce = await LoopringAPI.contractAPI.getNonce(
          web3,
          LOOPRING_EXPORTED_ACCOUNT.address
        );
        const approveNFT = await LoopringAPI.nftAPI.approveNFT({
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
        console.log(`nonce: ${nonce} approveNFT: ${approveNFT?.result}`);
      }

      // step 3. nonce
      const nonce = await LoopringAPI.contractAPI.getNonce(
        web3,
        LOOPRING_EXPORTED_ACCOUNT.address
      );

      // step 4. depositNFT
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
  //     const nonce = await LoopringAPI.contractAPI.getNonce(
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
});
