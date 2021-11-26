# CHANGELOG

### JS SDK Version ChangeLog
### v0.2.9
    FIX: AccountInfo.fronzen to frozen
### v0.2.8
    1) NFT refactory the interface fot doc
### v0.2.7
    1) NFT withdraw L2 -> L1
    2) NFT Deposit L1 -> L2  (NFT approvedAll fot Exchange)
    3) NFT Transfer L2 -> L2  
    4) NFT Mint L2
    5) NFT META
    6) NFT Action Check History L2


### v0.0.99
    1) update swap calc function.
    2) add getWithdrawalAgents
    3) update TradeChannel enum

### v0.0.90
    1) add callback to updateaccount transfer and withdraw.

### v0.0.87
    1) fix no amm swap calc issue.
    2) add symbol to DepthData.

### v0.0.85
    1) add getUserTxs api. 

### v0.0.82
    1) update response of some apis according to backend's change.

### v0.0.81
    1) change init method of BaseApi.
    2) update response of some apis.

### v0.0.78
    1) add GetLiquidityMiningUserHistory
    2) update response of submitOrder, updateAccount transfer and withdraw

### v0.0.75
    1) add getAmmAssetHistory function.
    2) fix null pointer exceptions.

### v0.0.71
    1) add error_code defs.
    2) update account and ammpoolsnapshot response.

### v0.0.69
    1) add status === 400 to status validation.

### v0.0.68
    1) add getRecommendedMarkets to exchange api.

### v0.0.67
    1) add feeVersion: v2 to request's header.

### v0.0.60
    1) fix swap calc utils bug

### v0.0.59
    1) add amountMap to getMinimumTokenAmt

### v0.0.58
    1) update error log level
    
### v0.0.54
    1) update swap calc response

### v0.0.50
    1) update getUserOnchainWithdrawalHistory response
    
### v0.0.48
    1) add tags to AccountInfo
    2) fix covertPublickey issue.

### v0.0.45
    1) update make join/exit request

### v0.0.43
    1) update getEthBalances response.

### v0.0.41
    1) add getEthBalances function.

### v0.0.39
    1) fix swap_calc_utils format bug.

### v0.0.37
    1) add getAllMixTickers function to exchangeApi.

### v0.0.36
    1) fix swap calc bug.

### v0.0.30
    1) refine code arch. seperate enums and constants.

### v0.0.28
    1) fix TransferTxType def issue.
    2) fix AmmTxType def issue.

### v0.0.27
    1) add walletApi support
    2) fix AmmPoolSnapshot struct bug

### v0.0.24
    1) update getAmmPoolGameUserRank response

### v0.0.23
    1) add isLpToken to TokenInfo struct

### v0.0.22
    1) fix GetDepthRequest param format issue

### v0.0.21
    1) add ruleType def to getAmmPoolActivityRules

### v0.0.20
    1) modify getAmmPoolUserRewards. add ammPoolMarkets support.

### v0.0.19
    1) modify getDepth. add amt/vol Total stat support.

### v0.0.18
    1) modify getAmmPoolActivityRules. add support for grouping by ruleType and status.
    2) modify getDepth. update response format.

### v0.0.16
    1) modify getMixMarkets.

### v0.0.15
    1) add getAmmPoolTxs api.

### v0.0.13
    1) change metamask.js to typescript.
    2) fix missing params issue.

### v0.0.12
    1) add missing function for APIs.
    2) fix response arch of some APIs.

### v0.0.11
    1) update getTicker api. modify fields.
    2) change TokenVolumeV3 def.

#### v0.0.10
    1) update interface definitions for APIs.

#### v0.0.9
    1) add interface definitions for APIs.

#### v0.0.8
    1) update UpdateAccount api.
    2) add setChainId to BaseAPI.

#### v0.0.7
    1) refine response arch;
    2) update interface defs.

#### v0.0.6
    1) add ammpool rank api;
    2) fix deposit confliction;

#### v0.0.5
    1) fix sign_tool functions export issue.

---

## PYTHON SDK Version ChangeLog
