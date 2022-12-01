/** @type {import('next').NextConfig} */
import nextTranslate from 'next-translate';

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            'cdn.sanity.io'
        ]
    },
    async rewrites() {
        return [
            {
                source: '/sitemap.xml',
                destination: '/api/sitemap',
            },
        ]
    },
}

export default nextTranslate(nextConfig);
