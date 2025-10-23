/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';

export type RequestMeta = {
  ns?: string; // 에러 메시지 접두 네임스페이스
  useResponseAll?: boolean;
};
export type RequestConfig = AxiosRequestConfig & { meta?: RequestMeta };

/** 기본 연동 URL */
const SERVER_DOMAIN = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://example.com';
/** api 호출 타임 아웃 */
const TIMEOUT_API = 20000;

/** 공통 메타 기본값 */
const _getDefaultMeta = () => ({
  // true면 Axios 전문을 그대로 반환(기본 true: DX 보존)
  useResponseAll: true,
});

/** 공용 path 조립 + 안전 인코딩 */
export function buildPath(...segments: Array<string | number>): string {
  const encoded = segments
    .filter(s => s !== undefined && s !== null && String(s).length > 0)
    .map(s => encodeURIComponent(String(s)));
  return '/' + encoded.join('/');
}

const joinPath = (serverDomain: string, apiPath: string) => {
  const root = serverDomain.replace(/\/$/, '');
  const path = apiPath.startsWith('/') ? apiPath : `/${apiPath}`;
  return root + path;
};

/** 인터셉터 없는 axios 인스턴스 생성 */
function createAxiosRaw(apiPath: string, options?: RequestConfig) {
  const instance = axios.create({
    baseURL: joinPath(SERVER_DOMAIN, apiPath),
    timeout: TIMEOUT_API,
    // qs 직렬화 규칙: brackets, null skip, strict
    paramsSerializer: {
      serialize: params =>
        qs.stringify(params, {
          arrayFormat: 'brackets',
          encode: true,
          skipNulls: true,
          strictNullHandling: true,
        }),
    },
    ...options,
  });
  return instance;
}

/** 인터셉터 포함 axios 인스턴스 생성 */
function createAxios(baseURL: string, options?: RequestConfig) {
  const instance = createAxiosRaw(baseURL, options);

  // request 인터셉터
  instance.interceptors.request.use(
    (config: any) => {
      if (!config.meta) config.meta = {};
      config.meta = Object.assign(_getDefaultMeta(), config.meta);
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    },
  );

  // response 인터셉터 (원본 유지)
  instance.interceptors.response.use(
    (response: any) => {
      // 기본 정책: 원본 그대로 반환 (DX/타이핑 보존)
      const meta = (response.config as any)?.meta;
      if (meta && meta.useResponseAll === false) {
        // 필요 시 축약형으로 내리고 싶다면 여기서 변환 가능
        return { data: response.data } as any;
      }
      return response;
    },
    async (error: any) => {
      // 공통 에러 매핑(+ 네임스페이스)
      const cfg = (error?.config || {}) as RequestConfig;
      const ns = cfg.meta?.ns ?? 'API';
      const status = error?.response?.status;
      const serverMsg = error?.response?.data?.message;
      const msg = serverMsg || error?.message || 'Request failed';
      return Promise.reject(new Error(`[${ns}] ${status ?? ''} ${msg}`));
    },
  );

  return instance;
}

/** Axios 인스턴스를 감싼 얇은 래퍼: 대문자 헬퍼 제공 */
class HttpClient {
  private _axios: AxiosInstance;
  constructor(instance: AxiosInstance) {
    this._axios = instance;
  }

  /** 원본 axios에 접근이 필요할 때 */
  get axios(): AxiosInstance {
    return this._axios;
  }

  /** 공용 path 유틸을 인스턴스에서도 사용 가능하게 노출 */
  path(...segments: Array<string | number>) {
    return buildPath(...segments);
  }

  GET<T = unknown>(url: string, config?: RequestConfig) {
    return this._axios.get<T>(url, config);
  }
  POST<T = unknown, D = unknown>(url: string, data?: D, config?: RequestConfig) {
    return this._axios.post<T, AxiosResponse<T>, D>(url, data, config);
  }
  PUT<T = unknown, D = unknown>(url: string, data?: D, config?: RequestConfig) {
    return this._axios.put<T, AxiosResponse<T>, D>(url, data, config);
  }
  PATCH<T = unknown, D = unknown>(url: string, data?: D, config?: RequestConfig) {
    return this._axios.patch<T, AxiosResponse<T>, D>(url, data, config);
  }
  DELETE<T = unknown>(url: string, config?: RequestConfig) {
    return this._axios.delete<T>(url, config);
  }
}

/** 외부 노출 팩토리들 (예시의 APIInstance에서 사용) */
export const service = (apiPath: string, options?: RequestConfig) => new HttpClient(createAxios(apiPath, options));

export const serviceWithoutInterceptors = (apiPath: string, options?: RequestConfig) =>
  new HttpClient(createAxiosRaw(apiPath, options));

export type { AxiosInstance, AxiosRequestConfig, AxiosResponse };
export default HttpClient;
