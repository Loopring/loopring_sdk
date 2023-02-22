export * from "./utils";

export * from "./defs";

export * from "./api";

import { ContactAPI } from "./api";
// import { ContactAPI } from "./api/contacts_api";
import contractWallet_abi from "./api/config/abis/contractWallet.json";
import erc20_abi from "./api/config/abis/erc20.json";
import exchange_abi from "./api/config/abis/exchange_3_6.json";
import hebao_abi from "./api/config/abis/hebao.json";

export { contractWallet_abi, erc20_abi, exchange_abi, hebao_abi };
