'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import cookie from 'react-cookies';
import { useAtom } from 'jotai';
import { countAtom, infiniteCountAtom } from '@/stores/atoms';

export default function HomePage() {
  const t = useTranslations('HomePage');
  const [count, setCount] = useAtom(countAtom);
  const [infiniteCount, setInfiniteCount] = useAtom(infiniteCountAtom);

  const setCookie = async () => {
    const tesToken = { name: 'admin123', role: ['owner'] };
    cookie.save('token', tesToken, {
      path: '/',
      maxAge: 3600,
    });
    alert('쿠키 설정');
  };

  const deleteCookie = async () => {
    cookie.remove('token', { path: '/' });
    alert('쿠키 삭제');
  };

  return (
    <div className="flex flex-col gap-4">
      <h1>{t('title')}</h1>
      <button className="rounded-md bg-blue-500 p-2 text-white" onClick={setCookie}>
        쿠키 설정
      </button>
      <button className="rounded-md bg-blue-500 p-2 text-white" onClick={deleteCookie}>
        쿠키 삭제
      </button>

      <div>쿠키 설정 후 페이지 이동하면 언어 설정 변경 테스트 가능</div>
      <Link className="rounded-md bg-blue-500 p-2 text-white" href="/test">
        테스트 페이지로 이동
      </Link>

      <div>전역 상태 관리 테스트</div>
      <div>Count: {count}</div>
      <button className="rounded-md bg-blue-500 p-2 text-white" onClick={() => setCount(count + 1)}>
        증가
      </button>

      <div>새로고침 유지되는 전역 상태 관리 테스트</div>
      <div>Count: {infiniteCount}</div>
      <button className="rounded-md bg-blue-500 p-2 text-white" onClick={() => setInfiniteCount(infiniteCount + 1)}>
        증가
      </button>
    </div>
  );
}
