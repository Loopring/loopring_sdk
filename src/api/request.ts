import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ReqParams, ReqOptions } from "../defs/loopring_defs";

import { SIG_FLAG } from "../defs/loopring_enums";

import { getEdDSASig, getEdDSASigWithPoseidon } from "./sign/sign_tools";
import { sortObject } from "../utils/obj_tools";
import { myLog } from "../utils/log_tools";

/**
 *
 * @export
 */
export const setSearchParams = function (url: URL, ...objects: any[]) {
  const searchParams = new URLSearchParams(url.search);

  for (const object of objects) {
    if (object) {
      const objectTmp = sortObject(object);
      for (const key in objectTmp) {
        if (objectTmp[key] != undefined) searchParams.set(key, objectTmp[key]);
      }
    }
  }

  url.search = searchParams.toString();
};

/**
 *
 * @export
 */
export const serializeDataIfNeeded_For_SetReffer = function (value: any) {
  return JSON.stringify(value, Object.keys(value).sort());
};

export const serializeDataIfNeeded = function (value: any) {
  const nonString = typeof value !== "string";

  return nonString
    ? JSON.stringify(value !== undefined ? sortObject(value) : {})
    : value || "";
};

/**
 *
 * @export
 */
export const toPathString = function (url: URL) {
  return url.pathname + url.search + url.hash;
};

export class Request {
  private _axios: AxiosInstance;

  private baseOptions: any = {};

  public getIns() {
    return this._axios;
  }

  constructor(baseUrl: string, timeout: number) {
    this.baseOptions = {
      baseURL: baseUrl,
      timeout: timeout,

      headers: {
        // 'Accept': '*/*',
        // 'Accept-Encoding': 'gzip, deflate, br',
        feeVersion: "v2",
        "Content-Type": "application/json",
        pf: "web", // tag for recognizing source
      },

      validateStatus: function (status: any) {
        if ((status >= 200 && status < 300) || status === 400) {
          return true;
        }
        return false;
        // return true // always true, handle exception in each bussiness logic
      },

      insecure: true,
    };

    this._axios = axios.create(this.baseOptions);
  }

  public async request(params: ReqParams, options: any = {}) {
    const localUrl = new URL(params.url, this.baseOptions.baseURL);

    const localVarRequestOptions = { method: params.method, ...options };

    setSearchParams(localUrl, params?.queryParams);

    const urlPathStr = toPathString(localUrl);

    let headers: any = {};

    if (params?.apiKey) {
      headers["X-API-KEY"] = params?.apiKey;
    }

    let sig: any = params.sigObj?.sig;

    if (params.sigFlag !== SIG_FLAG.NO_SIG && !params?.sigObj?.dataToSig) {
      throw Error("no dataToSig field!");
    }

    switch (params.sigFlag) {
      case SIG_FLAG.NO_SIG:
        break;
      case SIG_FLAG.EDDSA_SIG_POSEIDON:
        sig = getEdDSASigWithPoseidon(
          params.sigObj?.dataToSig,
          params.sigObj?.PrivateKey
        ).result;
        break;
      case SIG_FLAG.EDDSA_SIG:
        sig = getEdDSASig(
          params.method,
          this.baseOptions.baseURL,
          params.url,
          params.sigObj?.dataToSig,
          params.sigObj?.PrivateKey
        );
        break;
      default:
        break;
    }

    if (sig) {
      headers["X-API-SIG"] = sig;
    } else if (params?.ecdsaSignature) {
      headers["X-API-SIG"] = params?.ecdsaSignature;
    } else if (params?.eddsaSignature) {
      headers["X-API-SIG"] = params?.eddsaSignature;
    }
    // myLog('headers["X-API-SIG"]', headers["X-API-SIG"]);
    if (params?.bodyParams) {
      const bodyParams = params?.bodyParams;
      if (sig && params.sigObj?.sigPatch) {
        bodyParams[params.sigObj?.sigPatch] = sig;
      }

      if (params?.ecdsaSignature) {
        bodyParams.ecdsaSignature = params?.ecdsaSignature;
      }

      if (params?.eddsaSignature) {
        bodyParams.eddsaSignature = params?.eddsaSignature;
      }

      localVarRequestOptions.data = serializeDataIfNeeded(bodyParams);
    }

    headers = { ...this.baseOptions.headers, ...headers };

    const optInOne = {
      ...this.baseOptions,
      ...{ headers },
      ...localVarRequestOptions,
      url: this.baseOptions.baseURL + urlPathStr,
    };

    // myLog(optInOne);
    // myLog("headers config", optInOne);
    return await this._axios.request(optInOne);
  }

  public updateOpt(reqOpt: ReqOptions) {
    this._axios.interceptors.request.use((req: AxiosRequestConfig) => {
      if (reqOpt?.baseUrl) {
        req.baseURL = reqOpt?.baseUrl;
      }
      if (reqOpt?.url) {
        req.url = reqOpt?.url;
      }
      if (reqOpt?.apiKey) {
        req.headers["X-API-KEY"] = reqOpt?.apiKey;
      }
      if (reqOpt?.signature) {
        req.headers["X-API-SIG"] = reqOpt?.signature;
      }
      return req;
    });
    return this;
  }

  public addApiKey(apiKey: string) {
    return this.updateOpt({ apiKey });
  }

  public addSig(signature: string) {
    return this.updateOpt({ signature });
  }

  public updateBaseUrl(baseUrl: string) {
    return this.updateOpt({ baseUrl });
  }

  public handle400(callback: any = undefined) {
    this._axios.interceptors.response.use((res: AxiosResponse) => {
      if (res.status == 400) {
        // eslint-disable-next-line no-console
        console.log(res.request + " got " + res.statusText);
      }

      if (callback) {
        callback();
      }

      return res;
    });
  }
}
