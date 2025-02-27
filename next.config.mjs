/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mermaid.ink',
            },
        ],
    },
};

export default nextConfig;
