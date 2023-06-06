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
    API_GATEWAY_URL: '34.68.82.211',
    API_GATEWAY_PORT: '5200',
  },
}

module.exports = nextConfig
