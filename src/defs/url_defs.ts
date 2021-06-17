export enum LOOPRING_URLs {
    GET_RELAYER_CURRENT_TIME = '/api/v3/timestamp',
    API_KEY_ACTION = '/api/v3/apiKey', // get update
    GET_NEXT_STORAGE_ID = '/api/v3/storageId',
    ORDER_ACTION = '/api/v3/order', // get submit cancel
    GET_MULTI_ORDERS = '/api/v3/orders',
    GET_MARKETS = '/api/v3/exchange/markets',
    GET_TOKENS = '/api/v3/exchange/tokens',
    GET_TOKEN_BALANCES = '/api/v3/eth/tokenBalances',
    GET_ALLOWANCES = '/api/v3/eth/allowances',
    GET_EXCHANGE_INFO = '/api/v3/exchange/info',
    GET_MIX_MARKETS = '/api/v3/mix/markets',
    GET_DEPTH = '/api/v3/depth',
    GET_MIX_DEPTH = '/api/v3/mix/depth',
    GET_TICKER = '/api/v3/ticker',
    GET_MIX_TICKER = '/api/v3/mix/ticker',
    GET_CANDLESTICK = '/api/v3/candlestick',
    GET_MIX_CANDLESTICK = '/api/v3/mix/candlestick',
    GET_FIAT_PRICE = '/api/v3/price',
    GET_TRADES = '/api/v3/trade',
    POST_INTERNAL_TRANSFER = '/api/v3/transfer',
    ACCOUNT_ACTION = '/api/v3/account', // get update
    GET_USER_REG_TXS = '/api/v3/user/createInfo',
    GET_PWD_RESET_TXS = '/api/v3/user/updateInfo',
    GET_USER_EXCHANGE_BALANCES = '/api/v3/user/balances',
    GET_USER_DEPOSITS_HISTORY = '/api/v3/user/deposits',
    WITHDRAWALS_ACTION = '/api/v3/user/withdrawals',
    GET_USER_TRANFERS_LIST = '/api/v3/user/transfers',
    GET_USER_TRADE_HISTORY = '/api/v3/user/trades',
    GET_USER_FEE_RATE = '/api/v3/user/feeRates',
    GET_USER_ORDER_FEE_RATE = '/api/v3/user/orderFee',
    GET_MINIMAL_ORDER_AMT = '/api/v3/user/orderAmount', // IGNORE for now.
    GET_FEE_BASED_ORDER_AMT = '/api/v3/user/orderUserRateAmount',
    GET_OFFCHAIN_FEE_AMT = '/api/v3/user/offchainFee',
    GET_GAS_PRICE = '/api/v3/eth/recommendedGasPrice',

    GET_AMM_POOLS_CONF = '/api/v3/amm/pools',
    GET_AMM_POOLS_SNAPSHOT = '/api/v3/amm/balance',
    GET_AMM_POOLS_BALANCES = '/api/v3/amm/balances',
    GET_AMM_POOL_STATS = '/api/v2/amm/poolsStats',
    POST_JOIN_AMM_POOL = '/api/v3/amm/join',
    POST_EXIT_AMM_POOL = '/api/v3/amm/exit',
    GET_USER_AMM_POOL_TXS = '/api/v3/amm/user/transactions',
    GET_AMM_POOL_TRADE_TXS = '/api/v3/amm/trades',
    GET_AMM_ACTIVITY_RULES = 'api/v3/sidecar/activityRules',
    GET_AMMPOOL_USER_REWARDS = 'api/v2/amm/user/rewards',

    GET_LATEST_TOKEN_PRICES = '/api/wallet/v3/latestTokenPrices',

    GET_WS_KEY = '/v3/ws/key',
}

export enum ReqMethod {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
}

export enum SigPatchField {
    EddsaSignature = 'eddsaSignature',
}
