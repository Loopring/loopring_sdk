import {
	DEFAULT_TIMEOUT,
	LOOPRING_EXPORTED_ACCOUNT,
	LoopringAPI, signatureKeyPairMock, TOKEN_INFO,
	web3, web3_2,
} from "../../MockData";
import * as sdk from "../../../index";
import { AccountInfo, ChainId, NFTFactory_Collection } from '../../../index';
import { myLog } from '../../../utils/log_tools';

let mockData: {
	accInfo: AccountInfo,
	apiKey: string,
	eddsaKey: any
} | undefined = undefined;
describe("metaNFT", function () {
	beforeEach(async () => {
		// Step 1. getAccount
		const accInfo = (
			await LoopringAPI.exchangeAPI.getAccount({
				owner: LOOPRING_EXPORTED_ACCOUNT.address,
			})
		).accInfo;
		const eddsaKey = await signatureKeyPairMock(accInfo);

		// Step 3. apiKey
		const apiKey = (
			await LoopringAPI.userAPI.getUserApiKey(
				{
					accountId: accInfo.accountId,
				},
				eddsaKey.sk
			)
		).apiKey;

		mockData = {
			apiKey,
			accInfo,
			eddsaKey
		};
	}, DEFAULT_TIMEOUT * 3);
	it(
		"getUserOwnCollection",
		async () => {

			if (mockData) {
				const response = await LoopringAPI.userAPI
					.getUserOwenCollection(
						{
							owner: mockData.accInfo.owner,
							limit: 24,
							offset: 0,
							tokenAddress: undefined,
							isMintable: false //false
						},
						mockData.apiKey
					)
					.catch((_error) => {
						throw _error;
					});
				console.log('getUserNFFByCollection', response)
			}
		},
		DEFAULT_TIMEOUT
	);
	it(
		"getUserNFFByCollection",
		async () => {
			if (mockData) {
				const response = await LoopringAPI.userAPI
					.getUserNFTCollection(
						{
							accountId: mockData.accInfo.accountId.toString(),
							limit: 24,
							offset: 0,
						},
						mockData.apiKey
					)
					.catch((_error) => {
						throw _error;
					});
				console.log('getUserNFFByCollection', response)
			}

		},
		DEFAULT_TIMEOUT
	);

	it(
		"createCollection",
		async () => {
			if (mockData) {
				const response = await LoopringAPI.userAPI
					.submitNFTCollection({
							name: 'XXX' + Date.now(), //required, one account is not able to multiple
							tileUri: 'ipfs://QmaNZ2FCgvBPqnxtkbToVVbK2Nes6xk5K4Ns6BsmkPucAM', //required
							description: 'test',
							avatar: 'ipfs://QmaNZ2FCgvBPqnxtkbToVVbK2Nes6xk5K4Ns6BsmkPucAM',
							banner: 'ipfs://QmaNZ2FCgvBPqnxtkbToVVbK2Nes6xk5K4Ns6BsmkPucAM',
							nftFactory: NFTFactory_Collection[ LOOPRING_EXPORTED_ACCOUNT.chainId as ChainId ]
						},
						LOOPRING_EXPORTED_ACCOUNT.chainId as ChainId,
						mockData.apiKey,
						mockData.eddsaKey.sk)
				console.log('createCollection', response)
			}
		},
		DEFAULT_TIMEOUT
	);


});
