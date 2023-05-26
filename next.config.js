/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    domains: [
      'diaas-puzzle-hub-backend-imagefile-upload-dev.s3.ap-northeast-2.amazonaws.com',
      'diaas-puzzle-hub-backend-imagefile-upload-stg.s3.ap-northeast-2.amazonaws.com',
      'diaas-puzzle-hub-backend-imagefile-upload-prd.s3.ap-northeast-2.amazonaws.com',
      'hidden-puzzle-hub-file-bucket.s3.ap-northeast-2.amazonaws.com',
      's3.us-west-2.amazonaws.com',
      's3.ap-northeast-2.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
