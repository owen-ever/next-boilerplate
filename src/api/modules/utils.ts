/**
 * 여러 경로 세그먼트를 안전하게 인코딩하여 하나의 API 경로 문자열로 조립합니다.
 * @param segments - 경로 세그먼트 (문자열 또는 숫자)
 * @returns 인코딩된 경로
 *
 * @example
 * buildPath('users', 123) ➝ '/users/123'
 */
export const buildPath = (...segments: Array<string | number>): string => {
  const encoded = segments
    .filter(s => s !== undefined && s !== null && String(s).length > 0)
    .map(s => encodeURIComponent(String(s)));
  return '/' + encoded.join('/');
};

/**
 * 서버 도메인과 API 경로를 안전하게 연결하여 완전한 URL을 반환합니다.
 * @param serverDomain - 서버 도메인
 * @param apiPath - API 경로
 * @returns 완전한 URL
 *
 * @example
 * joinPath('https://myserver.com/', '/users') ➝ 'https://myserver.com/users'
 * joinPath('https://myserver.com', 'users')   ➝ 'https://myserver.com/users'
 */
export const joinPath = (serverDomain: string, apiPath: string): string => {
  const root = serverDomain.replace(/\/$/, '');
  const path = apiPath.startsWith('/') ? apiPath : `/${apiPath}`;
  return root + path;
};
