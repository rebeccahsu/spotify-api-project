/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'apod.nasa.gov'
      }
    ]
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
};

export default nextConfig;
