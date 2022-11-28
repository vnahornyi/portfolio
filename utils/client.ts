import { createClient } from 'next-sanity';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2021-10-14',
    token: process.env.SANITY_TOKEN,
    useCdn: false
});

export default client;
