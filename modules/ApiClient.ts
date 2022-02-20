import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { frontendConfig } from 'config/frontendConfig';
import { Resolve, Reject, KeyValuePair } from 'CustomTypes';
import jwt from 'jsonwebtoken';
import { fromNowSeconds } from 'utils/fromNow';
// import { ImageFileBase64 } from 'Models/LocalFile';
import { cleanUndefined } from 'utils/clean';
import { normalizeUrl } from 'utils/normalizeUrl';
import { serializeQuery } from 'utils/query';
import { serverResourcePath } from 'utils/serverResourcePath';
import { uuid } from 'utils/uuid';

export type UserSession = {
  id?: string;
  secret?: string;
  companyUserId?: string;
}
export const userSession: UserSession = {

}

export interface ApiClientOptions {
  baseUrl?: string;
  defaultHeaders?: Headers;
  debug?: boolean;
}

export type ApiRequestKeyValuePair = Record<string, string | number>;
export interface ApiRequestConfig {
  baseUrl?: string;
  url: string;
  method: ApiClientRequestMethod;
  headers?: ApiRequestKeyValuePair;
  data?: any;
  params?: Record<string, unknown>;
  debug?: boolean;
  haveFile?: boolean;
}

export type ApiClientRequestMethod = 'get' | 'post' | 'put' | 'delete';

export type RequestQueueCallback<T> = () => Promise<T>;
export type RequestQueue<T = any> = {
  callback: RequestQueueCallback<T>,
  resolve: Resolve,
  reject: Reject,
}

export class ApiClient {
  public baseUrl: string;
  public defaultHeaders: ApiRequestKeyValuePair;
  public path: string;
  public debug: boolean;
  static requestQueue: RequestQueue[] = [];
  static requestQueueMutex = frontendConfig.requestQueueLength;

  constructor(path: string, options: ApiClientOptions = {}) {
    const {
      defaultHeaders = {},
      baseUrl = frontendConfig.apiEndpoint,
      debug = false,
    } = options;
    this.baseUrl = baseUrl;
    this.defaultHeaders = defaultHeaders;
    this.path = path;
    this.debug = debug;
  }

  public async requestFile<T>(requestConfig: ApiRequestConfig): Promise<T> {
    const formData = new FormData();
    const dataEntries = Object.entries(requestConfig.data);
    for (const dataEntry of dataEntries) {
      formData.append(dataEntry[0], dataEntry[1] as any);
    }
    const calculatedUrl = normalizeUrl(this.path, requestConfig.url || '');
    return this.post(calculatedUrl, formData);
  }

  public async request<T>(requestConfig: ApiRequestConfig): Promise<T> {
    const debug = requestConfig.debug === undefined ? this.debug : requestConfig.debug;
    const headers: ApiRequestKeyValuePair = {
      ...this.defaultHeaders,
      ...this.extraHeaders,
      ...requestConfig.headers,
    }
    const cleanedData = cleanUndefined(requestConfig.data || {});
    const axiosRequestSettings: AxiosRequestConfig = {
      baseURL: requestConfig.baseUrl || this.baseUrl,
      url: normalizeUrl(this.path, requestConfig.url || ''),
      method: requestConfig.method || 'get',
      headers: stringifyHeader(headers),
      data: cleanedData,
      params: requestConfig.params,
    }
    if (requestConfig.haveFile) {
      const formData = new FormData();
      const entries = Object.entries(cleanedData);
      for (const entry of entries) {
        formData.append(entry[0], entry[1] as any);
      }
      axiosRequestSettings.data = formData;
      if (!axiosRequestSettings.headers) {
        axiosRequestSettings.headers = {};
      }
      axiosRequestSettings.headers['Content-Type'] = 'multipart/form-data';
    }
    if (debug) {
      console.log(`--------------------- ${new Date().toLocaleString()}`);
      console.log(JSON.stringify(axiosRequestSettings, null, 4));
      console.log('\n\n');
    }
    return new Promise<T>((resolve: Resolve, reject: Reject) => {
      axios(axiosRequestSettings).then(async (response) => {
        if (debug) {
          console.log('Status: success\n\n');
          console.log(JSON.stringify(response.data, null, 4));
          console.log('=============================\n\n');
        }
        resolve(response.data);
      })
        .catch(async (err) => {
          const { data } = err.response;
          if (this.debug) {
            console.log('Status: failed\n\n');
            console.log(err.message);
            console.log('=============================\n\n');
          }
          reject(data);
        });
    });

  }

  // async postFile<T>(url: string, data: any = {}) {
  //   const formData = new FormData();
  //   const entries = Object.entries(data);
  //   for (const entry of entries) {
  //     formData.append(entry[0], entry[1] as any);
  //   }
  //   return this.request<T>({
  //     url,
  //     method: 'post',
  //     data: formData,
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     }
  //   });
  //   // const calculatedUrl = normalizeUrl(this.baseUrl, url || '');
  //   // const formData = new FormData();
  //   // const entries = Object.entries(data);
  //   // for (const entry of entries) {
  //   //   formData.append(entry[0], entry[1] as any);
  //   // }
  //   // // return await axios.post(calculatedUrl, formData) as T;
  //   // return await axios({
  //   //   headers: {
  //   //     'Content-Type': 'multipart/form-data',
  //   //   },
  //   //   url: calculatedUrl,
  //   //   data: formData,
  //   //   method: 'post',
  //   // }) as unknown as T
  // }

  // public getImageBase64(url: string, params: any = {}): Promise<ImageFileBase64> {
  //   return ApiClient.queueRequest(() => this.get<ImageFileBase64>(url, params));
  // }

  static async queueRequest<T>(callback: RequestQueueCallback<T>): Promise<T> {
    const response = new Promise<T>((resolve, reject) => {
      ApiClient.requestQueue.push({
        callback,
        reject,
        resolve
      });
    });
    ApiClient.startRequestQueue();
    return response;
  }

  static async startRequestQueue() {
    if (ApiClient.requestQueueMutex <= 0) {
      return;
    }
    ApiClient.requestQueueMutex -= 1;
    let queuedRequest = ApiClient.requestQueue.shift();
    while (queuedRequest) {
      try {
        const result = await queuedRequest.callback();
        queuedRequest.resolve(result);
      } catch (err) {
        queuedRequest.reject(err);
      }
      queuedRequest = ApiClient.requestQueue.shift();
    }
    ApiClient.requestQueueMutex += 1;
  }

  get<T>(url: string, params: any = {}) {
    return this.request<T>({
      url,
      method: 'get',
      params,
    })
  }

  post<T>(url: string, data: any = {},) {
    return this.request<T>({
      url,
      method: 'post',
      data,
    })
  }

  putFile<T>(url: string, data: any = {}) {
    return this.request<T>({
      url,
      method: 'put',
      data,
      haveFile: true,
    })
  }


  postFile<T>(url: string, data: any = {},) {
    return this.request<T>({
      url,
      method: 'post',
      data,
      haveFile: true,
    })
  }

  put<T>(url: string, data: any = {}) {
    return this.request<T>({
      url,
      method: 'put',
      data,
    })
  }

  delete<T>(url: string, data: any = {}) {
    return this.request<T>({
      url,
      method: 'delete',
      data,
    })
  }


  public get extraHeaders(): ApiRequestKeyValuePair {
    const extraHeaders: Record<string, string> = {};
    const { sessionId, userToken, companyUserId } = ApiClient;
    if (sessionId && userToken) {
      extraHeaders['session-id'] = sessionId;
      extraHeaders['user-token'] = userToken;
    }
    if (companyUserId) {
      extraHeaders['company-user-id'] = companyUserId;
    }

    return extraHeaders;
  }

  public getResourcePath(path: string, query: KeyValuePair = {}): string {
    const calculatedQuery = {
      ...query,
      _sessionId: ApiClient.sessionId,
      _userToken: ApiClient.userToken,
      _companyUserId: ApiClient.companyUserId,
    }
    let finalPath = `${this.path}/${path}`;
    const serializedQuery = serializeQuery(calculatedQuery);
    if (serializedQuery.length > 0) {
      finalPath = `${finalPath}?${serializedQuery}`;
    }
    return serverResourcePath(finalPath);
  }

  public static get sessionId(): string | undefined {
    if (!userSession.id || !userSession.secret) {
      return undefined;
    }
    return userSession.id;
  }


  public static get companyUserId(): string | undefined {
    if (!userSession.companyUserId) {
      return undefined;
    }
    return userSession.companyUserId;
  }

  public static get userToken(): string | undefined {
    if (!userSession.id || !userSession.secret) {
      return undefined;
    }
    return jwt.sign({
      iat: fromNowSeconds(0),
      exp: fromNowSeconds(frontendConfig.tokenExpirySeconds),
      id: uuid(),
    }, userSession.secret, {});
  }
}

function stringifyHeader(obj: ApiRequestKeyValuePair) {
  const result: AxiosRequestHeaders = {};
  for (const key of Object.keys(obj)) {
    result[key] = `${obj[key]}`
  }
  return result;
}