'use client';

import WorkspaceAPI from '@/api/apis/workspace';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

// 데이터 fetch가 된 컴포넌트를 활용하는 형태로 작성
export default function DelayedData() {
  const api = useMemo(() => new WorkspaceAPI(), []);

  const { data, isFetching, isPending, isLoading, isStale, refetch, error } = useQuery<WorkspaceInfo>({
    queryKey: ['delay'],
    queryFn: async () => {
      const res = await api.getWorkspaceInfo('1');
      return res.data;
    },
    staleTime: 1000 * 10, // 10초
    placeholderData: prev => prev,
  });

  return (
    <>
      <div>데이터가 {isStale ? '만료' : '신선'}</div>
      <div>fetching: {JSON.stringify(isFetching)}</div>
      <div>pending: {JSON.stringify(isPending)}</div>
      <div>loading: {JSON.stringify(isLoading)}</div>
      <div>Error: {error?.message}</div>
      <div>
        <pre>{JSON.stringify(data)}</pre>
      </div>
      <button className="rounded-md bg-blue-500 p-2 text-white" onClick={() => refetch()}>
        다시 불러오기
      </button>
    </>
  );
}
