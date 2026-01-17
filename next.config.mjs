/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dvlvkn1vy/**', // Tu cloud name
      },
    ],
  },
}

export default nextConfig;

