import { NextApiHandler } from 'next';
import { groq } from 'next-sanity';
import client from 'utils/client';
import fs from 'fs';

const handler: NextApiHandler = async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600');

    const posts: Array<{ slug: string }> =
        await client.fetch(groq`*[_type == 'post'][]{
        "slug": slug.current
    }`);

    const staticPaths = fs
        .readdirSync('pages')
        .filter(staticPage => {
            return ![
                'api',
                '_app.tsx',
                '_document.tsx',
                '404.tsx',
                'index.tsx',
            ].includes(staticPage);
        })
        .map(
            staticPagePath =>
                `${process.env.NEXT_PUBLIC_BASE_URL}/${staticPagePath}`
        );
    const dynamicPaths = posts.map(
        post => `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}`
    );

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>${process.env.NEXT_PUBLIC_BASE_URL}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>daily</changefreq>
                <priority>1.0</priority>
            </url>
            ${[...staticPaths, ...dynamicPaths].map(url => `
                <url>
                    <loc>${url}</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
                    <changefreq>daily</changefreq>
                    <priority>1.0</priority>
                </url>
            `).join('')}
        </urlset>
    `;

    res.end(xml);
};

export default handler;
