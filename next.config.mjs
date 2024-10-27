/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // Menonaktifkan linting selama build
        ignoreDuringBuilds: true,
      },
};

export default nextConfig;
