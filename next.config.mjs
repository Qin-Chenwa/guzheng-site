/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // 請加入下面這行，記得把 "你的專案名稱" 換成你在 GitHub 的 Repository 名稱
  assetPrefix: process.env.NODE_ENV === 'production' ? '/guzheng-site/' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/guzheng-site' : '',
};

export default nextConfig;