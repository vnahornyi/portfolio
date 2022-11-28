import { NextApiHandler } from 'next';
import client from 'utils/client';

const handler: NextApiHandler = async (req, res) => {
    const { name = '', email = '', message = '' } = req.body;

    if (req.method !== 'POST') {
        return res.status(400).json({ message: 'Not allowed method!' });
    }

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Not valid body!' });
    }

    try {
        await client.create({
            _type: 'message',
            name,
            email,
            message
        });

        return res.status(200).json({ created: true });
    } catch {
        return res.status(400).json({ message: 'Cannot create message!' });
    }
};

export default handler;
