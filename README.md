# Ever Blog

[NextJS](https://nextjs.org/) v15 프레임워크를 기반으로 한 Typescript 템플릿 (App Router)

## 시작하기

### 환경

- Bun 1.2.6 이상
- Node.js 21.5.0

### 의존성 설치 및 개발 서버 실행

```
./init.sh

bun run dev
```

### 환경 구성 테스트

```
bun run lint-format
```

> 커밋 이전에 위의 명령어를 실행하고 커밋을 진행

## 주요 기술 스택

- [NextJS](https://nextjs.org/docs)
- [Typescript](https://www.typescriptlang.org/docs/)
- [TanStack](https://tanstack.com/query/latest/docs/framework/react/overview)(전 React-Query)
- [Jotai](https://jotai.org/docs)

## 개발 도구

- [bun](https://bun.sh/) - 패키지 매니저 겸 런타임
- [Husky](https://typicode.github.io/husky/#/) - Git Hooks 관리
- [ESLint](https://eslint.org/) - 코드 검사
- [Prettier](https://prettier.io/) - 코드 포맷팅

## 초기 프로젝트 구조

추가로 필요한 구성은 [NextJS 디렉토리 구조](https://nextjs.org/docs/app/getting-started/project-structure)를 참고

```
/
├── .husky       # Husky 설정 파일
├── .next        # next 파일
├── messages     # i18n 언어팩
│   ├── en.json  # 영어 설정 파일
│   └── ko.json  # 한국어 설정 파일
├── public       # 정적 자산 파일
└── src
    ├── api            # api 설정 파일
    ├── app
    │   ├── [locale]           # 동적 국제화 설정이 적용된 페이지 (내부의 페이지만 적용됨)
    │   │   ├── layout.tsx         # [locale]의 layout
    │   │   └── page.tsx           # [locale] 페이지 -> 사실상 홈
    │   ├── layout.tsx         # root layout
    │   ├── not-found.tsx      # 404 페이지
    │   ├── providers.tsx      # custom jotai provider
    │   └── robots.txt         # 스크래핑 허용 설정 파일
    ├── components         # 공통 컴포넌트 파일
    │   └── fetch              # data fetching 컴포넌트 파일
    ├── i18n           # 국제화 설정 파일
    ├── lib            # 공통 함수 파일
    │   └── auth.ts            # 권한을 위한 토큰 관련 파일
    ├── stores         # state 관리 파일
    │   └── atoms.ts           # jotai 선언 파일
    ├── types          # 타입 설정 파일
    └── middleware.ts  # 미들웨어 설정 파일
...
```

## 배포

범용적인 적용을 위해서 로컬 빌드후 도커 이미지화를 통해 nodejs를 이용해서 배포를 진행

```
# 1. 도커 이미지화
./dockerbuild.sh

# 2. 실행
docker-compose up -d
```

## 참고

> TanStack + Jotai  
> 컴포넌트 단위로 Data fetching을 구성하여  
> Data fetching 중심 구조 + 경량 상태 관리를 위해 채택  

> [여기에](https://www.heropy.dev/p/HZaKIE) TanStack 예시가 잘 정리되어 있음
