import { ChainId } from "../defs/web3_defs";

import { GlobalAPI } from "../api/global_api";
import { loopring_exported_account } from "./utils";
import { DelegateAPI } from "../api";

let api: GlobalAPI;
let delegateApi: DelegateAPI;
describe("global test", function () {
  beforeEach(() => {
    api = new GlobalAPI({ chainId: ChainId.GOERLI });
    delegateApi = new DelegateAPI({ chainId: ChainId.GOERLI });
  });

  it("getActiveFeeInfo without accountId", async () => {
    const response = await api.getActiveFeeInfo({});
    console.log(response);
  });
  it("getActiveFeeInfo with accountId", async () => {
    const response = await api.getActiveFeeInfo({
      accountId: loopring_exported_account.accountId,
    });
    console.log(response);
  });
  it("getCode", async () => {
    const response = await delegateApi.getCode(
      loopring_exported_account.address
    );
    console.log(response);
  });
});
