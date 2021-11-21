# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> Changelogs are for humans, not machines.
> There should be an entry for every single version.
> The same types of changes should be grouped.
> Versions and sections should be linkable.
> The latest version comes first.
> The release date of each version is displayed.
> Mention whether you follow Semantic Versioning.

Types of changes

- ### Added - for new features.
- ### Changed - for changes in existing functionality.
- ### Deprecated - for soon-to-be removed features.
- ### Removed - for now removed features.
- ### Fixed - for any bug fixes.
- ### Security - in case of vulnerabilities.

## [0.0.99]

### Added

- update swap calc function.
- add getWithdrawalAgents
- update TradeChannel enum

## [0.0.90]

### Added

- Callback to updateaccount transfer and withdraw.

## [0.0.87]

### Added

- Symbol to DepthData.

### Fix

- No amm swap calc issue.

## [0.0.85]

### Added

- getUserTxs api.

## [0.0.82]

### Changed

- Response of some apis according to backend's change.

## [0.0.81]

### Changed

- init method of BaseApi.
- Response of some apis.

## [0.0.78]

### Added

- GetLiquidityMiningUserHistory

### Changed

- Response of submitOrder, updateAccount transfer and withdraw

## [0.0.75]

### Added

- getAmmAssetHistory function.

### Fix

- null pointer exceptions.

## [0.0.71]

### Added

- error_code defs.

### Changed

- Account and ammpoolsnapshot response.

## [0.0.69]

### Added

- status === 400 to status validation.

## [0.0.68]

### Added

- getRecommendedMarkets to exchange api.

## [0.0.67]

### Added

- feeVersion: v2 to request's header.

## [0.0.60]

### Fix

- Swap calc utils bug

## [0.0.59]

### Added

- amountMap to getMinimumTokenAmt

## [0.0.58]

### Changed

- Error log level

## [0.0.54]

### Changed

- Swap calc response

## [0.0.50]

### Changed

- getUserOnchainWithdrawalHistory response

## [0.0.48]

### Added

- Tags to AccountInfo

### Fix

- covertPublickey issue.

## [0.0.45]

### Changed

- Make join/exit request

## [0.0.43]

### Changed

- getEthBalances response.

## [0.0.41]

### Added

- getEthBalances function.

## [0.0.39]

### Fix

- swap_calc_utils format bug.

## [0.0.37]

### Added

- getAllMixTickers function to exchangeApi.

## [0.0.36]

### Fix

- swap calc bug.

## [0.0.30]

### Changed

- Code arch. seperate enums and constants.

## [0.0.28]

### Fix

- TransferTxType def issue.
- AmmTxType def issue.

## [0.0.27]

### Added

- walletApi support

### Fix

- AmmPoolSnapshot struct bug

## [0.0.24]

### Changed

- getAmmPoolGameUserRank response

## [0.0.23]

### Added

- isLpToken to TokenInfo struct

## [0.0.22]

### Fixed

- GetDepthRequest param format issue

## [0.0.21]

### Added

- ruleType def to getAmmPoolActivityRules

## [0.0.20]

### Changed

- getAmmPoolUserRewards. add ammPoolMarkets support.

## [0.0.19]

### Changed

- getDepth. add amt/vol Total stat support.

## [0.0.18]

### Changed

- getAmmPoolActivityRules. add support for grouping by ruleType and status.
- getDepth. update response format.

## [0.0.16]

### Changed

- modify getMixMarkets.

## [0.0.15]

### Added

- getAmmPoolTxs api.

## [0.0.13]

### Changed

- metamask.js to typescript.

### Fix

- Missing params issue.

## [0.0.12]

### Added

- Missing function for APIs.

### Fix

- Response arch of some APIs.

## [0.0.11]

### Changed

- getTicker api. modify fields.
- TokenVolumeV3 def.

## [0.0.10]

### Changed

- Update interface definitions for APIs.

## [0.0.9]

### Added

- interface definitions for APIs.

## [0.0.8]

### Added

- setChainId to BaseAPI.

### Changed

- UpdateAccount api.

## [0.0.7]

### Changed

- refine response arch;
- interface defs.

## [0.0.6]

### Added

- ammpool rank api.

### Fix

- deposit confliction.

## [0.0.5]

### Fix

- sign_tool functions export issue.
