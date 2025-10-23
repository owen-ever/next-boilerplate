'use client';

import { ReactNode } from 'react';
import { Provider } from 'jotai';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

// custom jotai provider
export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1분 (데이터 캐시 최대 유지 시간)
            retry: 1, // 실패시 재시도 횟수
            refetchOnWindowFocus: false, // 창 포커스 되었을 때 데이터 재획득 여부
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>{children}</Provider>
    </QueryClientProvider>
  );
}
