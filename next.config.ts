import type { NextConfig } from 'next'

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

export default nextConfig
