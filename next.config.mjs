/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        pathname: '/favicon.ico',
      },
    
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com', // For Google profile images
      }
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
