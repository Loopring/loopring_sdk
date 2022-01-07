import { ChainId } from "../defs/web3_defs";

import {GlobalAPI} from "../api/global_api";
import {loopring_exported_account} from "./utils";

let api: GlobalAPI;
describe("global test", function () {
  beforeEach(() => {
    api = new GlobalAPI({chainId: ChainId.GOERLI});
  });

  it(
    "getActiveFeeInfo without accountId",
    async () => {
      const response = await api.getActiveFeeInfo({});
      console.log(response);
    },
  );
  it(
    "getActiveFeeInfo with accountId",
    async () => {
      const response = await api.getActiveFeeInfo({accountId:loopring_exported_account.accountId});
      console.log(response);
    },
  );
})