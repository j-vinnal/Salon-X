/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';
dotenv.config();

const nextConfig = {
  images: {
    domains: [
      process.env.NEXT_PUBLIC_IMAGE_DOMAIN,
      'localhost'
    ],
  },
  //output: 'export', // client side code only
  output: 'standalone', // standalone output for server-side rendering and dynamic routing
  //distDir: 'dist', // generate output to this folder
  //basePath: process.env.NEXT_PUBLIC_BASE_URL, // get path from env
};

export default nextConfig;
