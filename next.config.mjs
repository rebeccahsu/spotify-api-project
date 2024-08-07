/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'apod.nasa.gov'
      },
      {
        hostname: 'i.scdn.co'
      }
    ]
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
};

export default nextConfig;
