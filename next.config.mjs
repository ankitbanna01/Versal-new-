/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['192.168.1.13'],
  // Disable Turbopack to avoid Windows compatibility issues
  turbo: undefined,
}

export default nextConfig
