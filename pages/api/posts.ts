import { NextApiHandler } from 'next';
import { groq } from 'next-sanity';
import client from 'utils/client';

const handler: NextApiHandler = async (req, res) => {
    const { current, next, locale } = req.query;

    if (req.method !== 'GET') {
        return res.status(400).json({ message: 'Not allowed method!' });
    }

    try {
        const posts = await client.fetch(groq`*[_type == 'post'][$current...$next] | order(publishedAt) {
            "id": _id,
            "mainImage": mainImage.asset->url,
            "categories": categories[]->title.${locale},
            "description": description.${locale},
            "published": publishedAt,
            "slug": slug.current,
            "title": title.${locale}
        }`, {
            current: typeof current === 'string' &&!Number.isNaN(+current) ? +current : 0,
            next: typeof next === 'string' && !Number.isNaN(+next) ? +next : 8,
        });

        return res.status(200).json(posts);
    } catch {
        return res.status(500).json({ message: 'Cannot load posts!' });
    }
};

export default handler;
