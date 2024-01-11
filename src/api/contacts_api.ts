/* eslint-disable camelcase  */
import { BaseAPI } from './base_api'

import * as loopring_defs from '../defs'

export class ContactAPI extends BaseAPI {
  public async getContacts<R = loopring_defs.GetContactsResponse>(
    request: loopring_defs.GetContactsRequest,
    apiKey: string,
    // url: string = loopring_defs.LOOPRING_URLs.GET_CONTACTS
  ) {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.GET_CONTACTS,
      queryParams: request, //request
      method: loopring_defs.ReqMethod.GET,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
      apiKey,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data.resultInfo,
      }
    }
    return {
      ...raw_data,
      raw_data,
    } as {
      raw_data: R
    } & R
  }

  public async createContact(request: loopring_defs.CreateContactRequest, apiKey: string) {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.CREATE_CONTACT,
      bodyParams: request, //request
      method: loopring_defs.ReqMethod.POST,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
      apiKey,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data.resultInfo,
      }
    }
    return {
      ...raw_data,
      raw_data,
    }
  }

  public async updateContact(request: loopring_defs.UpdateContactRequest, apiKey: string) {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.UPDATE_CONTACT,
      bodyParams: request, //request
      method: loopring_defs.ReqMethod.POST,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
      apiKey,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data.resultInfo,
      }
    }
    return {
      ...raw_data,
      raw_data,
    }
  }
  public async deleteContact(
    request: loopring_defs.DeleteContactRequest,
    apiKey: string,
    // url: string = loopring_defs.LOOPRING_URLs.GET_CONTACTS
  ) {
    const reqParams: loopring_defs.ReqParams = {
      url: loopring_defs.LOOPRING_URLs.DELETE_CONTACT,
      bodyParams: request, //request
      method: loopring_defs.ReqMethod.DELETE,
      sigFlag: loopring_defs.SIG_FLAG.NO_SIG,
      apiKey,
    }

    const raw_data = (await this.makeReq().request(reqParams)).data
    if (raw_data?.resultInfo && raw_data?.resultInfo.code) {
      return {
        ...raw_data.resultInfo,
      }
    }
    return {
      ...raw_data,
      raw_data,
    }
  }
}

// ContactAPI.get
