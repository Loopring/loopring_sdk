import { BaseAPI } from './base_api'

import { ReqParams, } from '../defs/loopring_defs'

import { SIG_FLAG, ReqMethod, } from '../defs/loopring_enums'

import { LOOPRING_URLs, } from '../defs/url_defs'

import * as loopring_defs from '../defs/loopring_defs'

export class WalletAPI extends BaseAPI {

    /*
    * Get user assets
    */
    public async getUserAssets(request: loopring_defs.GetUserAssetsRequest) {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_USER_ASSETS,
            queryParams: request,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        let assetSeries: string[] = []
        let timestampSeries : number[] = []
        let dateSeries : string[] = []

        if (raw_data.data) {

            raw_data.data.forEach((item: loopring_defs.UserAssetInfo) => {
                assetSeries.push(item.amount)
                timestampSeries.push(item.createdAt)
                dateSeries.push(item.createdAtStr)
            })

        }
        
        return {
            assetSeries,
            timestampSeries,
            dateSeries,
            userAssets: raw_data.data as loopring_defs.UserAssetInfo[],
            raw_data,
        }

    }

    /*
    * Get token prices
    * e.g. http://api3.loopring.io/api/wallet/v3/tokenPrices?token=0xdac17f958d2ee523a2206206994597c13d831ec7&intervalType=1&limit=30&currency=CNY
    */
    public async getTokenPrices(request: loopring_defs.GetTokenPricesRequest) {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_TOKEN_PRICES,
            queryParams: request,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        let priceSeries: string[] = []
        let timestampSeries : number[] = []

        raw_data.data.forEach((item: loopring_defs.TokenPriceInfo) => {
            priceSeries.push(item.price)
            timestampSeries.push(item.createdAt)
        })
        
        return {
            tokenPrices: raw_data.data as loopring_defs.TokenPriceInfo[],
            priceSeries,
            timestampSeries,
            raw_data,
        }

    }

    /*
    * Fetches, for all the tokens supported by Loopring, their fiat price.
    * response: { [key: string]: <price> }  key is token address
    */
    public async getLatestTokenPrices() {

        const reqParams: ReqParams = {
            url: LOOPRING_URLs.GET_LATEST_TOKEN_PRICES,
            method: ReqMethod.GET,
            sigFlag: SIG_FLAG.NO_SIG,
        }

        const raw_data = (await this.makeReq().request(reqParams)).data

        let tokenPrices: loopring_defs.LoopringMap<number> = {}

        raw_data.data.forEach((item: any) => {
            tokenPrices[item.token] = parseFloat(item.price)
        })

        return {
            tokenPrices,
            raw_data,
        }

    }

}
