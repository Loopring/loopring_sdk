export enum LOOPRING_URLs {
  GET_AVAILABLE_BROKER = '/api/v3/getAvailableBroker',
  GET_RELAYER_CURRENT_TIME = '/api/v3/timestamp',
  API_KEY_ACTION = '/api/v3/apiKey', // get update
  GET_NEXT_STORAGE_ID = '/api/v3/storageId',
  ORDER_ACTION = '/api/v3/order', // get submit cancel
  ORDER_CANCEL_HASH_LIST = '/api/v3/orders/byHash', // cancel multiple orders by hashs
  ORDER_CANCEL_CLIENT_ORDER_ID_LIST = '/api/v3/orders/byClientOrderId', // cancel multiple orders by clientOrderids
  GET_MULTI_ORDERS = '/api/v3/orders',
  GET_MARKETS = '/api/v3/exchange/markets',
  GET_TOKENS = '/api/v3/exchange/tokens',
  GET_EXCHANGE_INFO = '/api/v3/exchange/info',
  GET_WITHDRAWAL_AGENTS = '/api/v3/exchange/withdrawalAgents',
  GET_EXCHANGE_FEEINFO = '/api/v3/exchange/feeInfo',
  GET_IGNORE_WITHDRAW = '/api/v3/exchange/notWithdrawContractTokens',

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
  COUNTER_FACTUAL_INFO = '/api/v3/counterFactualInfo',
  GET_USER_REG_TXS = '/api/v3/user/createInfo',
  GET_PWD_RESET_TXS = '/api/v3/user/updateInfo',
  GET_USER_EXCHANGE_BALANCES = '/api/v3/user/balances',
  GET_USER_DEPOSITS_HISTORY = '/api/v3/user/deposits',
  WITHDRAWALS_ACTION = '/api/v3/user/withdrawals', // post get
  POST_FORCE_WITHDRAWALS = '/api/v3/user/forceWithdrawals',

  GET_USER_TRANSFERS_LIST = '/api/v3/user/transfers',
  GET_USER_TRADE_HISTORY = '/api/v3/user/trades',
  GET_USER_TXS = '/api/v3/user/transactions',
  GET_USER_FEE_RATE = '/api/v3/user/feeRates', // deprecated
  GET_USER_ORDER_FEE_RATE = '/api/v3/user/orderFee',
  GET_MINIMAL_ORDER_AMT = '/api/v3/user/orderAmount', // IGNORE for now.
  GET_MINIMUM_TOKEN_AMT = '/api/v3/user/orderUserRateAmount',
  GET_OFFCHAIN_FEE_AMT = '/api/v3/user/offchainFee',
  GET_USER_BILLS = '/api/v3/user/bills',

  // Contacts
  GET_CONTACTS = '/api/v3/user/contact',
  CREATE_CONTACT = '/api/v3/user/contact/add',
  UPDATE_CONTACT = '/api/v3/user/contact/update',
  DELETE_CONTACT = '/api/v3/user/contact',

  // Refer
  GET_REFER_DOWNSIDES = '/api/v3/user/refer/profit/downsides',
  GET_REFER_SELF = '/api/v3/user/refer/profit/self',
  GET_REFER_STATISTIC = '/api/v3/user/refer/statistic',

  // Notification
  GET_NOTIFICATION_ALL = '/api/v3/user/notification',
  POST_NOTIFICATION_CLEAR = '/api/v3/user/notification/clearAll',
  POST_NOTIFICATION_READ_ALL = '/api/v3/user/notification/readAll',
  POST_NOTIFICATION_READ_ONE = '/api/v3/user/notification/read',

  GET_ALLOWANCES = '/api/v3/eth/allowances',
  GET_ETH_NONCE = '/api/v3/eth/nonce',
  GET_ETH_BALANCES = '/api/v3/eth/balances',
  GET_TOKEN_BALANCES = '/api/v3/eth/tokenBalances',
  GET_AKK_TOKEN_BALANCES = '/api/v3/eth/tokenBalances/all',

  GET_GAS_PRICE = '/api/v3/eth/recommendedGasPrice',
  GET_GAS_PRICE_RANGE = '/api/v3/eth/recommendedGasPriceRange',

  GET_RECOMENDED_MARKETS = '/api/v3/exchange/recommended',

  GET_AMM_POOLS_CONF = '/api/v3/amm/pools',
  GET_AMM_POOLS_SNAPSHOT = '/api/v3/amm/balance',
  GET_AMM_POOLS_BALANCES = '/api/v3/amm/balances',
  GET_AMM_POOL_STATS = '/api/v3/amm/poolsStats',
  POST_JOIN_AMM_POOL = '/api/v3/amm/join',
  POST_EXIT_AMM_POOL = '/api/v3/amm/exit',
  GET_AMM_POOL_TXS = '/api/v3/amm/transactions',
  GET_USER_AMM_POOL_TXS = '/api/v3/amm/user/transactions',
  GET_AMM_POOL_TRADE_TXS = '/api/v3/amm/trades',
  GET_AMM_ACTIVITY_RULES = '/api/v3/sidecar/activityRules',
  GET_AMMPOOL_USER_REWARDS = '/api/v3/amm/user/rewards',
  GET_AMMPOOL_REWARDS = '/api/v3/amm/rewards',
  GET_AMMPOOL_GAME_RANK = '/api/v3/game/rank',
  GET_AMMPOOL_GAME_USER_RANK = '/api/v3/game/user/rank',
  GET_LIQUIDITY_MINING = '/api/v3/sidecar/liquidityMining',
  GET_DELEGATE_GET_CODE = '/api/v3/delegator/getCode',
  GET_DELEGATE_GET_IPFS = '/api/v3/delegator/ipfs',
  GET_LIQUIDITY_MINING_USER_HISTORY = '/api/v3/sidecar/liquidityMiningUserHistory',
  GET_PROTOCOL_PORTRAIT = '/api/v3/sidecar/ProtocolPortrait',
  GET_PROTOCOL_REWARDS = '/api/v3/sidecar/commissionReward',
  GET_AMM_ASSET_HISTORY = '/api/v3/amm/assets',
  GET_ASSET_LOCK_RECORDS = '/api/v3/user/lockRecords',

  GET_DEFI_TOKENS = '/api/v3/defi/tokens',
  GET_DEFI_MARKETS = '/api/v3/defi/markets',
  POST_DEFI_ORDER = '/api/v3/defi/order',
  GET_DEFI_REWARDS = '/api/v3/defi/rewards',
  GET_DEFI_TRANSACTIONS = '/api/v3/defi/transactions',

  SET_REFERRER = '/api/v3/refer',

  GET_WS_KEY = '/v3/ws/key',
  GET_LATEST_TOKEN_PRICES = '/api/v3/datacenter/getLatestTokenPrices',
  GET_USER_TRADE_AMOUNT = '/api/v3/datacenter/getUserTradeAmount',
  GET_SUPPORT_TOKENS = '/api/v3/datacenter/getSupportTokens',
  GET_QUOTE_TREND = '/api/v3/datacenter/getTokenQuoteTrend',
  GET_QUOTE_TOKEN_INFO = '/api/v3/datacenter/getTokenInfo',
  GET_QUOTE_TOKEN_OHLCV_TREND = '/api/v3/datacenter/getTokenOHLCVTrend',
  GET_QUOTE_TOKEN_GETCMCTOKENRELATIONS = '/api/v3/datacenter/getCmcTokenRelations',

  GET_USER_ASSETS = '/api/wallet/v3/userAssets',
  GET_TOKEN_PRICES = '/api/wallet/v3/tokenPrices',
  GET_GUARDIAN_APPROVE_LIST = '/api/wallet/v3/getGuardianApproveList',
  GET_PROTECTORS = '/api/wallet/v3/getProtects',
  GET_OPERATION_LOGS = '/api/wallet/v3/operationLogs',
  GET_HEBAO_CONFIG = '/api/wallet/v3/getAppConfigs',
  GET_WALLET_TYPE = '/api/wallet/v3/wallet/type',
  GET_WALLET_MODULES = '/api/wallet/v3/walletModules',
  GET_WALLET_CONTRACTVERSION = '/api/wallet/v3/contractVersion',
  RESOLVE_ENS = '/api/wallet/v3/resolveEns',
  RESOLVE_NAME = '/api/wallet/v3/resolveName',
  //
  SUBMIT_APPROVE_SIGNATURE = '/api/wallet/v3/submitApproveSignature',
  REJECT_APPROVE_SIGNATURE = '/api/wallet/v3/rejectApproveSignature',
  // OFFICIAL_LOCK_OR_UNLOCK = "/api/wallet/v3/officialLockOrUnlock",
  SEND_META_TX = '/api/wallet/v3/sendMetaTx',

  GET_ACCOUNT_SERVICES = '/api/v3/spi/getAccountServices',
  // VIP
  GET_USER_VIP_INFO = '/api/v3/user/vipInfo',
  GET_USER_VIP_ASSETS = '/api/v3/datacenter/getUserAssets',
  GET_USER_NFT_BALANCES = '/api/v3/user/nft/balances',
  GET_USER_NFT_BALANCES_BY_COLLECTION = '/api/v3/user/nft/collection/balances',
  GET_NFT_OFFCHAIN_FEE_AMT = '/api/v3/user/nft/offchainFee',
  POST_NFT_INTERNAL_TRANSFER = '/api/v3/nft/transfer',
  POST_NFT_WITHDRAWALS = '/api/v3/nft/withdrawal',
  POST_NFT_MINT = '/api/v3/nft/mint',
  POST_NFT_TRADE = '/api/v3/nft/trade',
  POST_NFT_VALIDATE_ORDER = '/api/v3/nft/validateOrder', // post get
  POST_NFT_EDIT_COLLECTION = '/api/v3/nft/collection/edit',
  POST_NFT_CREATE_LEGACY_COLLECTION = '/api/v3/nft/collection/legacy/tokenAddress',
  POST_NFT_VALIDATE_REFRESH_NFT = '/api/v3/nft/image/refresh',
  POST_DEPLOY_COLLECTION = '/api/v3/collection/deployTokenAddress',
  POST_NFT_LEGACY_UPDATE_COLLECTION = '/api/v3/nft/collection/legacy/updateNftCollection',
  POST_NFT_UPDATE_NFT_GROUP = '/api/v3/user/nft/updateNftPreference',
  GET_NFT_COLLECTION = '/api/v3/nft/collection',
  POST_NFT_CREATE_COLLECTION = '/api/v3/nft/collection',
  DELETE_NFT_CREATE_COLLECTION = '/api/v3/nft/collection',
  GET_COLLECTION_WHOLE_NFTS = '/api/v3/nft/public/collection/items',
  GET_NFT_COLLECTION_PUBLISH = '/api/v3/nft/public/collection',
  GET_NFT_COLLECTION_HASNFT = '/api/v3/user/collection/details',
  GET_NFT_LEGACY_COLLECTION = '/api/v3/nft/collection/legacy',
  GET_NFT_LEGACY_TOKENADDRESS = '/api/v3/nft/collection/legacy/tokenAddress',
  GET_NFT_LEGACY_BALANCE = '/api/v3/nft/collection/legacy/balance',
  GET_USER_LOCKSUMMAR = '/api/v3/user/lockSummary',
  GET_USER_HAD_UNKNOWN_COLLECTION = '/api/v3/nft/collection/unknown',

  GET_NFTs_INFO = '/api/v3/nft/info/nfts',
  GET_USER_NFT_TRANSFER_HISTORY = '/api/v3/user/nft/transfers',
  GET_USER_NFT_DEPOSIT_HISTORY = '/api/v3/user/nft/deposits',
  GET_USER_NFT_WITHDRAW_HISTORY = '/api/v3/user/nft/withdrawals',
  GET_USER_NFT_TRANSACTION_HISTORY = '/api/v3/user/nft/transactions',
  GET_USER_NFT_TRADE_HISTORY_OLD = '/api/v3/user/nft/trades',
  GET_USER_NFT_TRADE_HISTORY = '/api/v3/new/user/nft/trades',
  GET_USER_NFT_MINT_HISTORY = '/api/v3/user/nft/mints',
  GET_USER_NFT_BURN_ADDRESS = '/api/v3/datacenter/getNftBurnAddress',

  GET_DEPLOY_TOKEN_ADDRESS = '/api/v3/nft/deployTokenAddress',
  IPFS_META_URL = 'https://ipfs.loopring.io/ipfs/',

  GET_DUAL_INDEX = '/api/v3/dual/index',
  GET_DUAL_PRICES = '/api/v3/dual/prices',
  GET_DUAL_INFOS = '/api/v3/dual/infos',
  GET_DUAL_TRANSACTIONS = '/api/v3/dual/transactions',
  GET_DUAL_BALANCE = '/api/v3/dual/balance',
  GET_DUAL_RULE = '/api/v3/dual/rules',
  POST_DUAL_ORDER = '/api/v3/dual/order',
  GET_DUAL_USER_LOCKED = '/api/v3/dual/lockRecordAmount',
  POST_DUAL_EDIT = '/api/v3/dual/order/reinvest',

  GET_LUCK_TOKEN_AGENTS = '/api/v3/luckyToken/agents',
  GET_LUCK_TOKEN_AUTHORIZEDSIGNERS = '/api/v3/luckyToken/authorizedSigners',
  GET_LUCK_TOKEN_CLAIMHISTORY = '/api/v3/luckyToken/user/claimHistory',
  GET_LUCK_TOKEN_LUCKYTOKENS = '/api/v3/luckyToken/user/luckyTokens',
  GET_LUCK_TOKEN_LUCKYTOKENDETAIL = '/api/v3/luckyToken/user/luckyTokenDetail',
  GET_LUCK_TOKEN_BLINDBOXDETAIL = '/api/v3/luckyToken/user/blindBoxDetail',
  GET_LUCK_TOKEN_WITHDRAWALS = '/api/v3/luckyToken/user/withdraws ',
  GET_LUCK_TOKEN_BALANCES = '/api/v3/luckyToken/user/balances',
  GET_LUCK_TOKEN_CLAIMEDLUCKYTOKENS = '/api/v3/luckyToken/user/claimedLuckyTokens',
  GET_LUCK_TOKEN_CLAIMEDBLINDBOX = '/api/v3/luckyToken/user/claimBlindBoxHistory',
  GET_LUCK_TOKEN_SUMMARY = '/api/v3/luckyToken/user/summary',
  GET_LUCK_TOKEN_NFTBALANCES = '/api/v3/luckyToken/user/nftBalances',
  POST_LUCK_TOKEN_SENDLUCKYTOKEN = '/api/v3/luckyToken/sendLuckyToken',
  POST_LUCK_TOKEN_CLAIMLUCKYTOKEN = '/api/v3/luckyToken/claimLuckyToken',
  POST_LUCK_TOKEN_CLAIMBLINDBOX = '/api/v3/luckyToken/claimBlindBox',
  POST_LUCK_TOKEN_WITHDRAWALS = '/api/v3/luckyToken/user/withdrawals',
  POST_LUCK_TOKEN_UNCLAIMNFTANDBLINDCNT = '/api/v3/luckyToken/user/unclaimNftAndBlindCnt',
  GET_LUCK_TOKEN_LUCKYTOKENTARGETS = '/api/v3/luckyToken/user/luckyTokenTargets',
  POST_LUCK_TOKEN_SUBMITADDTARGET = '/api/v3/luckyToken/submitAddTarget',

  GET_BANXA_API_KEY = '/api/v3/hmacAuthentication',
  GET_STAKE_PRODUCTS = '/api/v3/stake/products',
  POST_STAKE_CLAIM = '/api/v3/stake/claim',
  POST_STAKE = '/api/v3/stake/stake',
  POST_STAKE_REDEEM = '/api/v3/stake/redeem',
  GET_STAKE_SUMMARY = '/api/v3/stake/user/summary',
  GET_STAKE_TRANSACTIONS = '/api/v3/stake/user/transactions',

  // CEFI_MARKETS
  GET_BTRATE_MARKETS = '/api/v3/btrade/markets',
  GET_BTRATE_DEPTH = '/api/v3/btrade/depth',
  GET_BTRATE_ORDERS = '/api/v3/btrade/orders',
  POST_BTRATE_ORDER = '/api/v3/btrade/order',

  GET_TOTAL_CLAIM_INFO = '/api/v3/claim/totalClaimInfo',
  POST_TOTAL_CLAIM = '/api/v3/claim/claim',
  GET_VAULT_TOKENS = '/api/v3/vault/tokens',
  GET_VAULT_MARKETS = '/api/v3/vault/markets',
  GET_VAULT_GETAVAILABLENFT = '/api/v3/vault/getAvailableNft',
  GET_VAULT_ACCOUNT = '/api/v3/vault/account',
  GET_VAULT_GETOPERATIONS = '/api/v3/vault/getOperations',
  GET_VAULT_GETOPERATIONBY_HASH = '/api/v3/vault/getOperationByHash',
  GET_VAULT_INFOS = '/api/v3/vault/infos',
  GET_VAULT_DEPTH = '/api/v3/vault/depth',
  GET_VAULT_BALANCE = '/api/v3/vault/balances',
  POST_VAULT_JOIN = '/api/v3/vault/join',
  POST_VAULT_ORDER = '/api/v3/vault/order',
  POST_VAULT_EXIT = '/api/v3/vault/exit',
  POST_VAULT_TRANSFER = '/api/v3/vault/transfer',
  POST_VAULT_LOAN = '/api/v3/vault/loan',
  POST_VAULT_REPAY = '/api/v3/vault/repay',
  GET_VAULT_PRICE = '/api/v3/vault/tokenPrice',
  GET_VAULT_CREDIT = '/api/v3/vault/getCredit',
  GET_VAULT_COLLATERALS = '/api/v3/vault/getCollaterals',
  GET_VAULT_SUBMIT_LEVERAGE = '/api/v3/vault/submitLeverage',
  GET_VAULT_SUBMIT_DUST_COLLECTOR = '/api/v3/vault/submitDustCollector',
  GET_VAULT_GEMAX_BORROWABLE = '/api/v3/vault/getMaxBorrowable',

  GET_DEFI_APYS = '/api/v3/datacenter/getDefiApys',
  GET_DEFI_STAKE_TRANSACTIONS = '/api/v3/defi/stake/transactions',
}
