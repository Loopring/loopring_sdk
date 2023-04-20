import { AxiosResponse } from "axios";

export enum LoopringErrorCode {
  Unknown_Error = 100000,
  Invalid_Args = 100001,

  Address_Not_Found = 101001,
  User_Not_Found = 101002,

  ExchangeId_Incorrect = 102001,
  Unsupported_TokenId = 102002,
  Invalid_AccountId = 102003, //dup
  Invalid_OrderId = 102004,
  Market_Not_Supported = 102005, //dup
  Illegal_Rate = 102006,
  Order_Already_Existed = 102007,
  Order_Already_Expired = 102008,
  Order_Missing_Sig = 102010,
  Invalid_User_Balance = 102011,
  Order_Amount_Too_Small = 102012,
  Failed_To_Freeze_Amt = 102014,
  Exceed_Max_Order_Amt = 102020,
  Invalid_Nonce = 102021,
  Invalid_Transfer_Sender = 102022,
  Invalid_Transfer_Receiver = 102023,
  Unsuported_Fee_Token = 102024,
  Transfer_Token_Is_Not_Consistent_With_Fee_Token = 102025,

  Sumbit_Order_Failed = 102027,
  No_Order_To_Cancel = 102117,
  Fail_To_Cancel_Order = 102118,
  Order_Is_Not_Valid = 102120,

  Empty_Apikey = 104001,
  Invalid_Apikey = 104002,
  Invalid_AccountID = 104003, //dup
  No_Sig_Provided = 104004,
  Wrong_Sig = 104005,

  User_Cannot_Be_Empty = 107001,
  Orderhash_Cannot_Be_Empty = 107002,
  Order_Not_Exist = 107003,

  Unsupported_Market = 108000, //dup
  Unsupported_Depth_Level = 108001,
  SKD_UNKNOW = 500000,
  CONTRACTNFT_URI = 500001,
  CONTRACTNFT_BALANCE = 500002,
  CONTRACTNFT_IS_APPROVE = 500003,
  CONTRACTNFT_SET_APPROVE = 500004,
  NOT_SUPPORT_ERROR = 500005,
  USER_DENIED = 500006,
  USER_DENIED_2 = 500007,
  NO_EDDSA_KEY = 500008,
  HTTP_ERROR = 500009,
  BTRADE_NO_DEPTH_ERROR = 500010,
  BTRADE_NO_PRODUCT = 500011,
}

export enum ConnectorError {
  NOT_SUPPORT_ERROR = "Not supported on this device",
  USER_DENIED = "User denied message signature",
  USER_DENIED_2 = "personalSign err before Validate",
  CONTRACTNFT_URI = "contract nft uri Error",
  CONTRACTNFT_BALANCE = "contract nft balance error",
  CONTRACTNFT_IS_APPROVE = "ContractNFT is Approve error",
  CONTRACTNFT_SET_APPROVE = "ContractNFT set Approve error",
  NO_EDDSA_KEY = "No EDDSA KEY",
  HTTP_ERROR = "HTTP Request Failed!",
  BTRADE_NO_DEPTH_ERROR = "NO Depth for BTRADE",
  BTRADE_NO_PRODUCT = "NO Market for BTRADE",
}

export interface RESULT_INFO {
  code?: number;
  msg?: string;
  message?: string;
}
export type ERROR_INFO = {
  resultInfo: RESULT_INFO;
};

export const checkErrorInfo = (
  errorInfo: RESULT_INFO,
  isFirstTime?: boolean
) => {
  const message = errorInfo.message;
  if (isFirstTime && message === "NOT_SUPPORT_ERROR") {
    return ConnectorError.NOT_SUPPORT_ERROR;
  } else if (message === "USER_DENIED" || message === "USER_DENIED_2") {
    return ConnectorError.USER_DENIED;
  } else if (
    message &&
    (message.startsWith("personalSign last") ||
      message.indexOf("User denied transaction") > 0)
  ) {
    return ConnectorError.USER_DENIED;
  }
  return message;
};
