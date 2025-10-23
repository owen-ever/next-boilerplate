import type { AxiosRequestConfig } from 'axios';
import { service, serviceWithoutInterceptors } from '@/api/modules/request';
import type HttpClient from '@/api/modules/request';

class APIInstance {
  request: HttpClient;

  constructor(baseUrl: string, options?: AxiosRequestConfig, withoutInterceptors: boolean = false) {
    this.request = (withoutInterceptors ? serviceWithoutInterceptors : service)(baseUrl, options);
  }
}

export default APIInstance;
