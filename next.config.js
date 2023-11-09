const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  output: undefined,
  transpilePackages: undefined,
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: undefined,
    remotePatterns: [
      { hostname: 'fakestoreapi.com' },
      { hostname: 'res.cloudinary.com' },
    ],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            dimensions: false,
          },
        },
      ],
    })

    return config
  },
}

const nextConfigWithBundleAnalyzer = withBundleAnalyzer(nextConfig)
module.exports = nextConfigWithBundleAnalyzer
