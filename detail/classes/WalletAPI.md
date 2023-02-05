[@loopring-web/loopring-sdk](../README.md) / [Exports](../modules.md) / WalletAPI

# Class: WalletAPI

## Hierarchy

- [`BaseAPI`](BaseAPI.md)

  ↳ **`WalletAPI`**

## Table of contents

### Constructors

- [constructor](WalletAPI.md#constructor)

### Properties

- [baseUrl](WalletAPI.md#baseurl)
- [chainId](WalletAPI.md#chainid)
- [KEY\_MESSAGE](WalletAPI.md#key_message)

### Methods

- [encodeAddressesPacked](WalletAPI.md#encodeaddressespacked)
- [genErr](WalletAPI.md#generr)
- [getAddressByENS](WalletAPI.md#getaddressbyens)
- [getApproveRecoverTypedData](WalletAPI.md#getapproverecovertypeddata)
- [getApproveRecoverV2TypedData](WalletAPI.md#getapproverecoverv2typeddata)
- [getAvailableBroker](WalletAPI.md#getavailablebroker)
- [getContractType](WalletAPI.md#getcontracttype)
- [getCounterFactualInfo](WalletAPI.md#getcounterfactualinfo)
- [getEnsByAddress](WalletAPI.md#getensbyaddress)
- [getGuardianApproveList](WalletAPI.md#getguardianapprovelist)
- [getHebaoConfig](WalletAPI.md#gethebaoconfig)
- [getHebaoOperationLogs](WalletAPI.md#gethebaooperationlogs)
- [getLatestTokenPrices](WalletAPI.md#getlatesttokenprices)
- [getProtectors](WalletAPI.md#getprotectors)
- [getTokenPrices](WalletAPI.md#gettokenprices)
- [getUserAssets](WalletAPI.md#getuserassets)
- [getUserTradeAmount](WalletAPI.md#getusertradeamount)
- [getWalletModules](WalletAPI.md#getwalletmodules)
- [getWalletType](WalletAPI.md#getwallettype)
- [lockHebaoWallet](WalletAPI.md#lockhebaowallet)
- [makeReq](WalletAPI.md#makereq)
- [rejectApproveHash](WalletAPI.md#rejectapprovehash)
- [rejectHebao](WalletAPI.md#rejecthebao)
- [returnTxHash](WalletAPI.md#returntxhash)
- [sendMetaTx](WalletAPI.md#sendmetatx)
- [setBaseUrl](WalletAPI.md#setbaseurl)
- [setChainId](WalletAPI.md#setchainid)
- [signHebaoApproveWithDataStructureForContract](WalletAPI.md#signhebaoapprovewithdatastructureforcontract)
- [signHebaoApproveWithoutDataStructure](WalletAPI.md#signhebaoapprovewithoutdatastructure)
- [submitApproveSignature](WalletAPI.md#submitapprovesignature)

## Constructors

### constructor

• **new WalletAPI**(`param`, `timeout?`, `baseUrlMap?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `param` | [`InitParam`](../interfaces/InitParam.md) | `undefined` |
| `timeout` | `number` | `6000` |
| `baseUrlMap` | `Object` | `undefined` |
| `baseUrlMap.1` | `string` | `"https://api3.loopring.io"` |
| `baseUrlMap.5` | `string` | `"https://uat2.loopring.io"` |

#### Inherited from

[BaseAPI](BaseAPI.md).[constructor](BaseAPI.md#constructor)

#### Defined in

[api/base_api.ts:104](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/base_api.ts#L104)

## Properties

### baseUrl

• `Protected` **baseUrl**: `string` = `""`

#### Inherited from

[BaseAPI](BaseAPI.md).[baseUrl](BaseAPI.md#baseurl)

#### Defined in

[api/base_api.ts:39](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/base_api.ts#L39)

___

### chainId

• `Protected` **chainId**: [`ChainId`](../enums/ChainId.md) = `ChainId.MAINNET`

#### Inherited from

[BaseAPI](BaseAPI.md).[chainId](BaseAPI.md#chainid)

#### Defined in

[api/base_api.ts:40](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/base_api.ts#L40)

___

### KEY\_MESSAGE

▪ `Static` **KEY\_MESSAGE**: `string` = `KEY_MESSAGE`

#### Inherited from

[BaseAPI](BaseAPI.md).[KEY_MESSAGE](BaseAPI.md#key_message)

#### Defined in

[api/base_api.ts:38](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/base_api.ts#L38)

## Methods

### encodeAddressesPacked

▸ **encodeAddressesPacked**(`addrs`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `addrs` | `string`[] |

#### Returns

`Buffer`

#### Defined in

[api/wallet_api.ts:302](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/wallet_api.ts#L302)

___

### genErr

▸ **genErr**(`err`): [`RESULT_INFO`](../interfaces/RESULT_INFO.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` \| `AxiosResponse`<`any`\> & `Error` |

#### Returns

[`RESULT_INFO`](../interfaces/RESULT_INFO.md)

#### Inherited from

[BaseAPI](BaseAPI.md).[genErr](BaseAPI.md#generr)

#### Defined in

[api/base_api.ts:41](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/base_api.ts#L41)

___

### getAddressByENS

▸ **getAddressByENS**<`R`, `T`\>(`request`): `Promise`<{ `address`: `undefined` \| `string` ; `raw_data`: `R`  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | extends `unknown` |
| `T` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetEnsAddressRequest`](../interfaces/GetEnsAddressRequest.md) |

#### Returns

`Promise`<{ `address`: `undefined` \| `string` ; `raw_data`: `R`  }\>

#### Defined in

[api/wallet_api.ts:426](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/wallet_api.ts#L426)

___

### getApproveRecoverTypedData

▸ `Private` **getApproveRecoverTypedData**(`chainId`, `guardiaContractAddress`, `wallet`, `validUntil`, `newOwner`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) |
| `guardiaContractAddress` | `any` |
| `wallet` | `any` |
| `validUntil` | `any` |
| `newOwner` | `any` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `domain` | { `chainId`: [`ChainId`](../enums/ChainId.md) = chainId; `name`: `string` = "GuardianModule"; `verifyingContract`: `any` = guardiaContractAddress; `version`: `string` = "1.2.0" } |
| `domain.chainId` | [`ChainId`](../enums/ChainId.md) |
| `domain.name` | `string` |
| `domain.verifyingContract` | `any` |
| `domain.version` | `string` |
| `message` | { `newOwner`: `any` = newOwner; `validUntil`: `any` = validUntil; `wallet`: `any` = wallet } |
| `message.newOwner` | `any` |
| `message.validUntil` | `any` |
| `message.wallet` | `any` |
| `primaryType` | `string` |
| `types` | { `EIP712Domain`: { `name`: `string` = "name"; `type`: `string` = "string" }[] ; `recover`: { `name`: `string` = "wallet"; `type`: `string` = "address" }[]  } |
| `types.EIP712Domain` | { `name`: `string` = "name"; `type`: `string` = "string" }[] |
| `types.recover` | { `name`: `string` = "wallet"; `type`: `string` = "address" }[] |

#### Defined in

[api/wallet_api.ts:96](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/wallet_api.ts#L96)

___

### getApproveRecoverV2TypedData

▸ **getApproveRecoverV2TypedData**(`chainId`, `guardiaContractAddress`, `wallet`, `validUntil`, `newOwner`, `newGuardians`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) |
| `guardiaContractAddress` | `any` |
| `wallet` | `any` |
| `validUntil` | `any` |
| `newOwner` | `any` |
| `newGuardians` | `any` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `domain` | { `chainId`: [`ChainId`](../enums/ChainId.md) = chainId; `name`: `string` = "GuardianModule"; `verifyingContract`: `any` = guardiaContractAddress; `version`: `string` = "1.2.0" } |
| `domain.chainId` | [`ChainId`](../enums/ChainId.md) |
| `domain.name` | `string` |
| `domain.verifyingContract` | `any` |
| `domain.version` | `string` |
| `message` | { `newGuardians`: `any` = newGuardians; `newOwner`: `any` = newOwner; `validUntil`: `any` = validUntil; `wallet`: `any` = wallet } |
| `message.newGuardians` | `any` |
| `message.newOwner` | `any` |
| `message.validUntil` | `any` |
| `message.wallet` | `any` |
| `primaryType` | `string` |
| `types` | { `EIP712Domain`: { `name`: `string` = "name"; `type`: `string` = "string" }[] ; `recover`: { `name`: `string` = "wallet"; `type`: `string` = "address" }[]  } |
| `types.EIP712Domain` | { `name`: `string` = "name"; `type`: `string` = "string" }[] |
| `types.recover` | { `name`: `string` = "wallet"; `type`: `string` = "address" }[] |

#### Defined in

[api/wallet_api.ts:132](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/wallet_api.ts#L132)

___

### getAvailableBroker

▸ **getAvailableBroker**(`request`): `Promise`<{ `broker`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetAvailableBrokerRequest`](../interfaces/GetAvailableBrokerRequest.md) |

#### Returns

`Promise`<{ `broker`: `string`  }\>

#### Inherited from

[BaseAPI](BaseAPI.md).[getAvailableBroker](BaseAPI.md#getavailablebroker)

#### Defined in

[api/base_api.ts:123](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/base_api.ts#L123)

___

### getContractType

▸ **getContractType**<`T`\>(`__namedParameters`): `Promise`<{ `contractType`: `undefined` \| `T` ; `raw_data`: `T`  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`ContractType`](../interfaces/ContractType.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`GET_WALLET_TYPE`](../interfaces/GET_WALLET_TYPE.md) |

#### Returns

`Promise`<{ `contractType`: `undefined` \| `T` ; `raw_data`: `T`  }\>

#### Defined in

[api/wallet_api.ts:484](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/wallet_api.ts#L484)

___

### getCounterFactualInfo

▸ **getCounterFactualInfo**<`T`\>(`request`): `Promise`<{ `counterFactualInfo`: `undefined` \| [`CounterFactualInfo`](../interfaces/CounterFactualInfo.md) ; `error?`: [`RESULT_INFO`](../interfaces/RESULT_INFO.md) ; `raw_data`: `T`  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetCounterFactualInfoRequest`](../interfaces/GetCounterFactualInfoRequest.md) |

#### Returns

`Promise`<{ `counterFactualInfo`: `undefined` \| [`CounterFactualInfo`](../interfaces/CounterFactualInfo.md) ; `error?`: [`RESULT_INFO`](../interfaces/RESULT_INFO.md) ; `raw_data`: `T`  }\>

#### Inherited from

[BaseAPI](BaseAPI.md).[getCounterFactualInfo](BaseAPI.md#getcounterfactualinfo)

#### Defined in

[api/base_api.ts:136](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/base_api.ts#L136)

___

### getEnsByAddress

▸ **getEnsByAddress**<`R`, `T`\>(`request`): `Promise`<{ `ensName`: `undefined` \| `string` ; `raw_data`: `R`  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | extends `unknown` |
| `T` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetEnsNameRequest`](../interfaces/GetEnsNameRequest.md) |

#### Returns

`Promise`<{ `ensName`: `undefined` \| `string` ; `raw_data`: `R`  }\>

#### Defined in

[api/wallet_api.ts:543](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/wallet_api.ts#L543)

___

### getGuardianApproveList

▸ **getGuardianApproveList**<`R`, `T`\>(`request`): `Promise`<{ `guardiansArray`: `T`[] ; `raw_data`: `R`  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | extends `unknown` |
| `T` | extends [`Guardian`](../modules.md#guardian) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetGuardianApproveListRequest`](../interfaces/GetGuardianApproveListRequest.md) |

#### Returns

`Promise`<{ `guardiansArray`: `T`[] ; `raw_data`: `R`  }\>

#### Defined in

[api/wallet_api.ts:653](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/wallet_api.ts#L653)

___

### getHebaoConfig

▸ **getHebaoConfig**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Defined in

[api/wallet_api.ts:616](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/wallet_api.ts#L616)

___

### getHebaoOperationLogs

▸ **getHebaoOperationLogs**<`R`, `T`\>(`request`): `Promise`<{ `operationArray`: `T`[] ; `raw_data`: `R`  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | extends `unknown` |
| `T` | extends [`HebaoOperationLog`](../modules.md#hebaooperationlog) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`HebaoOperationLogs`](../interfaces/HebaoOperationLogs.md) |

#### Returns

`Promise`<{ `operationArray`: `T`[] ; `raw_data`: `R`  }\>

#### Defined in

[api/wallet_api.ts:733](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/wallet_api.ts#L733)

___

### getLatestTokenPrices

▸ **getLatestTokenPrices**(`request?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request?` | [`getLatestTokenPricesRequest`](../interfaces/getLatestTokenPricesRequest.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/wallet_api.ts:821](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/wallet_api.ts#L821)

___

### getProtectors

▸ **getProtectors**<`R`, `T`\>(`request`, `apiKey`): `Promise`<{ `protectorArray`: `T`[] ; `raw_data`: `R`  }\>

getProtectors

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | extends `unknown` |
| `T` | extends [`Protector`](../modules.md#protector) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetProtectorRequest`](../interfaces/GetProtectorRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `protectorArray`: `T`[] ; `raw_data`: `R`  }\>

#### Defined in

[api/wallet_api.ts:696](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/wallet_api.ts#L696)

___

### getTokenPrices

▸ **getTokenPrices**(`request`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetTokenPricesRequest`](../interfaces/GetTokenPricesRequest.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/wallet_api.ts:785](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/wallet_api.ts#L785)

___

### getUserAssets

▸ **getUserAssets**(`request`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserAssetsRequest`](../interfaces/GetUserAssetsRequest.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/wallet_api.ts:41](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/wallet_api.ts#L41)

___

### getUserTradeAmount

▸ **getUserTradeAmount**(`request`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetUserTradeAmount`](../interfaces/GetUserTradeAmount.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/wallet_api.ts:763](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/wallet_api.ts#L763)

___

### getWalletModules

▸ **getWalletModules**<`T`\>(`__namedParameters`): `Promise`<{ `raw_data`: `T` ; `walletModule`: `undefined` \| `T`  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`ModuleType`](../interfaces/ModuleType.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`GET_WALLET_TYPE`](../interfaces/GET_WALLET_TYPE.md) |

#### Returns

`Promise`<{ `raw_data`: `T` ; `walletModule`: `undefined` \| `T`  }\>

#### Defined in

[api/wallet_api.ts:514](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/wallet_api.ts#L514)

___

### getWalletType

▸ **getWalletType**<`T`\>(`__namedParameters`): `Promise`<{ `raw_data`: `T` ; `walletType`: `undefined` \| [`WalletType`](../interfaces/WalletType.md)  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`GET_WALLET_TYPE`](../interfaces/GET_WALLET_TYPE.md) |

#### Returns

`Promise`<{ `raw_data`: `T` ; `walletType`: `undefined` \| [`WalletType`](../interfaces/WalletType.md)  }\>

#### Defined in

[api/wallet_api.ts:453](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/wallet_api.ts#L453)

___

### lockHebaoWallet

▸ **lockHebaoWallet**(`__namedParameters`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`LockHebaoHebaoParam`](../interfaces/LockHebaoHebaoParam.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/wallet_api.ts:570](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/wallet_api.ts#L570)

___

### makeReq

▸ `Protected` **makeReq**(): `Request`

#### Returns

`Request`

#### Inherited from

[BaseAPI](BaseAPI.md).[makeReq](BaseAPI.md#makereq)

#### Defined in

[api/base_api.ts:182](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/base_api.ts#L182)

___

### rejectApproveHash

▸ **rejectApproveHash**(`request`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Object` |
| `request.approveRecordId` | `any` |
| `request.signer` | `any` |

#### Returns

`string`

#### Defined in

[api/wallet_api.ts:172](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/wallet_api.ts#L172)

___

### rejectHebao

▸ **rejectHebao**(`req`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`RejectHebaoRequestV3WithPatch`](../interfaces/RejectHebaoRequestV3WithPatch.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/wallet_api.ts:192](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/wallet_api.ts#L192)

___

### returnTxHash

▸ `Protected` **returnTxHash**<`T`\>(`raw_data`): [`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| `Omit`<`T`, ``"resultInfo"``\> & { `raw_data`: `Omit`<`T`, ``"resultInfo"``\>  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`TX_HASH_API`](../modules.md#tx_hash_api) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `raw_data` | `T` |

#### Returns

[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| `Omit`<`T`, ``"resultInfo"``\> & { `raw_data`: `Omit`<`T`, ``"resultInfo"``\>  }

#### Inherited from

[BaseAPI](BaseAPI.md).[returnTxHash](BaseAPI.md#returntxhash)

#### Defined in

[api/base_api.ts:82](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/base_api.ts#L82)

___

### sendMetaTx

▸ **sendMetaTx**<`R`, `T`\>(`request`, `apiKey`): `Promise`<{ `raw_data`: `R`  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | extends `unknown` |
| `T` | extends `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`SendMetaTxRequest`](../interfaces/SendMetaTxRequest.md) |
| `apiKey` | `string` |

#### Returns

`Promise`<{ `raw_data`: `R`  }\>

#### Defined in

[api/wallet_api.ts:631](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/wallet_api.ts#L631)

___

### setBaseUrl

▸ **setBaseUrl**(`baseUrl`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `baseUrl` | `string` |

#### Returns

`void`

#### Inherited from

[BaseAPI](BaseAPI.md).[setBaseUrl](BaseAPI.md#setbaseurl)

#### Defined in

[api/base_api.ts:178](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/base_api.ts#L178)

___

### setChainId

▸ **setChainId**(`chainId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) |

#### Returns

`void`

#### Inherited from

[BaseAPI](BaseAPI.md).[setChainId](BaseAPI.md#setchainid)

#### Defined in

[api/base_api.ts:170](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/base_api.ts#L170)

___

### signHebaoApproveWithDataStructureForContract

▸ **signHebaoApproveWithDataStructureForContract**(`web3`, `owner`, `guardian`, `chainId`, `newOwner?`, `newGuardians?`, `masterCopy?`, `forwarderModuleAddress?`): `Promise`<{ `sig`: `any` = result.ecdsaSig }\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `web3` | `default` | `undefined` |
| `owner` | `string` | `undefined` |
| `guardian` | [`Guardian`](../modules.md#guardian) | `undefined` |
| `chainId` | [`ChainId`](../enums/ChainId.md) | `undefined` |
| `newOwner` | `string` | `""` |
| `newGuardians` | `any` | `undefined` |
| `masterCopy` | `undefined` \| `string` | `undefined` |
| `forwarderModuleAddress` | `undefined` \| `string` | `undefined` |

#### Returns

`Promise`<{ `sig`: `any` = result.ecdsaSig }\>

#### Defined in

[api/wallet_api.ts:254](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/wallet_api.ts#L254)

___

### signHebaoApproveWithoutDataStructure

▸ **signHebaoApproveWithoutDataStructure**(`web3`, `owner`, `guardian`, `chainId`, `walletType`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3` | `default` |
| `owner` | `string` |
| `guardian` | [`Guardian`](../modules.md#guardian) |
| `chainId` | [`ChainId`](../enums/ChainId.md) |
| `walletType` | [`ConnectorNames`](../enums/ConnectorNames.md) |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[api/wallet_api.ts:236](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/wallet_api.ts#L236)

___

### submitApproveSignature

▸ **submitApproveSignature**<`T`\>(`req`, `guardians?`, `isContract1XAddress?`, `masterCopy?`, `forwarderModuleAddress?`): `Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| [`TX_HASH_RESULT`](../modules.md#tx_hash_result)<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`TX_HASH_API`](../modules.md#tx_hash_api) |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `req` | [`SubmitApproveSignatureRequestWithPatch`](../interfaces/SubmitApproveSignatureRequestWithPatch.md) | `undefined` |
| `guardians` | `string`[] | `[]` |
| `isContract1XAddress?` | `boolean` | `undefined` |
| `masterCopy?` | `string` | `undefined` |
| `forwarderModuleAddress` | `string` | `""` |

#### Returns

`Promise`<[`RESULT_INFO`](../interfaces/RESULT_INFO.md) \| [`TX_HASH_RESULT`](../modules.md#tx_hash_result)<`T`\>\>

#### Defined in

[api/wallet_api.ts:311](https://github.com/Loopring/loopring_sdk/blob/24fdf4c/src/api/wallet_api.ts#L311)
