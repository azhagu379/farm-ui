import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    dangerouslyAllowSVG: true, // Allow loading SVG images from remote sources
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
