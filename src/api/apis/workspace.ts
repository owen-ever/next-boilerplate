import { AxiosRequestConfig } from 'axios';
import APIInstance from '@/api/apis';
import { API } from '@/api/config/api';

class WorkspaceAPI extends APIInstance {
  constructor(options?: AxiosRequestConfig, withoutInterceptors: boolean = false) {
    super(API.WORKSPACE, options, withoutInterceptors);
  }

  getWorkspaceInfo = async (workspaceId: string) => {
    // 1) 인스턴스 유틸 사용
    const url = this.request.path(workspaceId); // => '/{encoded}'
    const resposne = await this.request.GET<WorkspaceInfo>(url, { meta: { ns: 'WorkspaceAPI' } });

    // 2) 혹은 모듈 함수 직접 import 해서 사용해도 됨
    // import { buildPath } from '@/api/modules/utils'
    // const resposne = await this.request.GET<WorkspaceInfo>(buildPath(workspaceId), { meta: { ns: 'WorkspaceAPI' } });

    return resposne;
  };
}

export default WorkspaceAPI;
