/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true
    },
    typescript: { ignoreBuildErrors: true },

    experimental: {
        missingSuspenseWithCSRBailout: false,
    },

};

export default nextConfig;
