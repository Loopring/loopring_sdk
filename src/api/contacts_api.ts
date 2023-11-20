/* eslint-disable camelcase  */
import { BaseAPI } from './base_api'

import {
  CreateContactRequest,
  DeleteContactRequest,
  GetContactsRequest,
  GetContactsResponse,
  LOOPRING_URLs,
  ReqMethod,
  ReqParams,
  SIG_FLAG,
  UpdateContactRequest,
} from '../defs'

export class ContactAPI extends BaseAPI {
  public async getContacts<R = GetContactsResponse>(
    request: GetContactsRequest,
    apiKey: string,
    // url: string = LOOPRING_URLs.GET_CONTACTS
  ) {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.GET_CONTACTS,
      queryParams: request, //request
      method: ReqMethod.GET,
      sigFlag: SIG_FLAG.NO_SIG,
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

  public async createContact(request: CreateContactRequest, apiKey: string) {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.CREATE_CONTACT,
      bodyParams: request, //request
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.NO_SIG,
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

  public async updateContact(request: UpdateContactRequest, apiKey: string) {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.UPDATE_CONTACT,
      bodyParams: request, //request
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.NO_SIG,
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
    request: DeleteContactRequest,
    apiKey: string,
    // url: string = LOOPRING_URLs.GET_CONTACTS
  ) {
    const reqParams: ReqParams = {
      url: LOOPRING_URLs.DELETE_CONTACT,
      bodyParams: request, //request
      method: ReqMethod.DELETE,
      sigFlag: SIG_FLAG.NO_SIG,
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
