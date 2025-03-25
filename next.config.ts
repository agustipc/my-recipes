import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'images.themodernproper.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'images.squarespace-cdn.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'www.lavanguardia.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'www.allrecipes.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'www.hola.com',
        pathname: '/**'
      }
    ]
  }
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
