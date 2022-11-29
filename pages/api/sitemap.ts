import { NextApiHandler } from 'next';
import { groq } from 'next-sanity';
import client from 'utils/client';
import glob from 'glob';

const handler: NextApiHandler = async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600');

    const posts: Array<{ slug: string }> =
        await client.fetch(groq`*[_type == 'post'][]{
        "slug": slug.current
    }`);

    const pagesDir = 'pages/**/*.tsx';
    const pagePaths = glob.sync(pagesDir);

    const staticPaths = pagePaths
        .filter(staticPage => {
            return ['[', '/_', '404'].every(el => !staticPage.includes(el))
        })
        .map(
            staticPagePath =>
                `${process.env.NEXT_PUBLIC_BASE_URL}${staticPagePath.split('pages').pop()?.replace('index.tsx', '')}`
        );
    const dynamicPaths = posts.map(
        post => `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}/`
    );

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
