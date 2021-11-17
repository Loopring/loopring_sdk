export enum LOOPRING_URLs {

    GET_RELAYER_CURRENT_TIME = '/api/v3/timestamp',
    API_KEY_ACTION = '/api/v3/apiKey', // get update
    GET_NEXT_STORAGE_ID = '/api/v3/storageId',
    ORDER_ACTION = '/api/v3/order', // get submit cancel
    ORDER_CANCEL_HASH_LIST = '/api/v2/orders/byHash', // cancel multiple orders by hashs
    ORDER_CANCEL_CLIENT_ORDER_ID_LIST = '/api/v2/orders/byClientOrderId', // cancel multiple orders by clientOrderids
    GET_MULTI_ORDERS = '/api/v3/orders',
    GET_MARKETS = '/api/v3/exchange/markets',
    GET_TOKENS = '/api/v3/exchange/tokens',
    GET_EXCHANGE_INFO = '/api/v3/exchange/info',
    GET_WITHDRAWAL_AGENTS = '/api/v3/exchange/withdrawalAgents',
    GET_EXCHANGE_FEEINFO = '/api/v3/exchange/feeInfo',

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
    ACCOUNT_ACTION = '/api/v3/account', // get or update
    GET_USER_REG_TXS = '/api/v3/user/createInfo',
    GET_PWD_RESET_TXS = '/api/v3/user/updateInfo',
    GET_USER_EXCHANGE_BALANCES = '/api/v3/user/balances',
    GET_USER_DEPOSITS_HISTORY = '/api/v3/user/deposits',
    WITHDRAWALS_ACTION = '/api/v3/user/withdrawals', // post get
    GET_USER_TRANFERS_LIST = '/api/v3/user/transfers',
    GET_USER_TRADE_HISTORY = '/api/v3/user/trades',
    GET_USER_TXS = '/api/v3/user/transactions',
    GET_USER_FEE_RATE = '/api/v3/user/feeRates', // deprecated
    GET_USER_ORDER_FEE_RATE = '/api/v3/user/orderFee',
    GET_MINIMAL_ORDER_AMT = '/api/v3/user/orderAmount', // IGNORE for now.
    GET_MINIMUM_TOKEN_AMT = '/api/v3/user/orderUserRateAmount',
    GET_OFFCHAIN_FEE_AMT = '/api/v3/user/offchainFee',


    GET_ALLOWANCES = '/api/v3/eth/allowances',
    GET_ETH_NONCE = '/api/v3/eth/nonce',
    GET_ETH_BALANCES = '/api/v3/eth/balances',
    GET_TOKEN_BALANCES = '/api/v3/eth/tokenBalances',
    GET_GAS_PRICE = '/api/v3/eth/recommendedGasPrice',
    GET_GAS_PRICE_RANGE = '/api/v3/eth/recommendedGasPriceRange',

    GET_RECOMENDED_MARKETS = '/api/v3/exchange/recommended',

    GET_AMM_POOLS_CONF = '/api/v3/amm/pools',
    GET_AMM_POOLS_SNAPSHOT = '/api/v3/amm/balance',
    GET_AMM_POOLS_BALANCES = '/api/v3/amm/balances',
    GET_AMM_POOL_STATS = '/api/v2/amm/poolsStats',
    POST_JOIN_AMM_POOL = '/api/v3/amm/join',
    POST_EXIT_AMM_POOL = '/api/v3/amm/exit',
    GET_AMM_POOL_TXS = '/api/v3/amm/transactions',
    GET_USER_AMM_POOL_TXS = '/api/v3/amm/user/transactions',
    GET_AMM_POOL_TRADE_TXS = '/api/v3/amm/trades',
    GET_AMM_ACTIVITY_RULES = '/api/v3/sidecar/activityRules',
    GET_AMMPOOL_USER_REWARDS = '/api/v2/amm/user/rewards',
    GET_AMMPOOL_GAME_RANK = '/api/v2/game/rank',
    GET_AMMPOOL_GAME_USER_RANK = '/api/v2/game/user/rank',
    GET_LIQUIDITY_MINING = '/api/v2/sidecar/liquidityMining',
    GET_DELEGATE_GET_CODE = '/api/v2/delegator/getCode',
    GET_LIQUIDITY_MINING_USER_HISTORY = '/api/v2/sidecar/liquidityMiningUserHistory',
    GET_PROTOCOL_PORTRAIT = '/api/v3/sidecar/ProtocolPortrait',

    GET_AMM_ASSET_HISTORY = '/api/v3/amm/assets',

    SET_REFERRER = '/api/v3/refer',

    GET_WS_KEY = '/v3/ws/key',
    
    GET_USER_ASSETS = '/api/wallet/v3/userAssets',
    GET_USER_TRADE_AMOUNT = '/api/v3/datacenter/getUserTradeAmount',
    GET_TOKEN_PRICES = '/api/wallet/v3/tokenPrices',
    GET_LATEST_TOKEN_PRICES = '/api/wallet/v3/latestTokenPrices',

    GET_ACCOUNT_SERVICES = '/api/v3/spi/getAccountServices',

    // NFT
    // GET_USER_NFT_BALANCES = '/api/v3/user/nft/balances', 

    // VIP
    GET_USER_VIP_INFO = '/api/v3/user/vipInfo',
    // VIP calc assets
    GET_USER_VIP_ASSETS = '/api/v3/datacenter/getUserAssets',
    GET_USER_NFT_BALANCES = '/api/v3/user/nft/balances',
    GET_NFT_OFFCHAIN_FEE_AMT = '/api/v3/user/nft/offchainFee',
    POST_NFT_INTERNAL_TRANSFER = '/api/v3/nft/transfer',
    POST_NFT_WITHDRAWALS = '/api/v3/nft/withdrawal', // post get
    POST_NFT_MINT = 'api/v3/nft/mint', // post get
    GET_NFTs_INFO = '/api/v3/nft/info/nfts',
    GET_USER_NFT_TRANSFER_HISTORY = '/api/v3/user/nft/transfers',
    GET_USER_NFT_DEPOSIT_HISTORY = '/api/v3/user/nft/deposits',
    GET_USER_NFT_WITHDRAW_HISTORY = '/api/v3/user/nft/withdrawals',

}
