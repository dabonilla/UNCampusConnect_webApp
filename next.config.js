/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/UN-CampusConnect/signin',
        permanent: true,
      },
    ];
  },
  env: {
    API_GATEWAY_URL: '127.0.0.1',
    API_GATEWAY_PORT: '5000',
  },
}

module.exports = nextConfig
