import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // output: 'standalone',
  serverExternalPackages: [], // 서버 전용으로만 쓰는 패키지 명시 (안전)
  eslint: {
    ignoreDuringBuilds: true, // CI/CD 환경에서 ESLint 검사 무시
  },
};

export default nextConfig;
