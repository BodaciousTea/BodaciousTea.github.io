/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // THIS FIXES THE IMAGE ERROR
  },
  trailingSlash: true, // optional but helps with routing on GitHub Pages
}

module.exports = nextConfig
