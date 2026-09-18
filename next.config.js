/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com', 'source.unsplash.com', 'image.pollinations.ai', 'api.pexels.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-dropdown-menu'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/free/:path*',
        destination: '/api/free/:path*',
      },
    ]
  },
}

module.exports = nextConfig