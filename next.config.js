/** @type {import('next').NextConfig} */

// Check if it's a production build
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // Output as static export
  output: 'export',

  // Add the asset prefix for production builds on GitHub Pages
  assetPrefix: isProd ? '/tedkoller' : '',

  // Set the base path for GitHub Pages
  basePath: isProd ? '/tedkoller' : '',
}

module.exports = nextConfig;
