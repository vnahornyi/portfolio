import { Button, Container, useBoolean, VStack } from '@chakra-ui/react';
import { GetStaticProps, NextPage } from 'next';
import { groq } from 'next-sanity';

import { IPost } from 'types';
import client from 'utils/client';

import Card from 'components/BlogPage/Card';
import { useState } from 'react';
import Head from 'next/head';

interface IBlogPageProps {
    posts: IPost[];
    total: number;
}

const BlogPage: NextPage<IBlogPageProps> = ({ posts, total }) => {
    const [loadedPosts, setLoadedPosts] = useState<typeof posts>(posts);
    const [isLoading, setLoading] = useBoolean();

    const loadMorePosts = async () => {
        try {
            setLoading.on();

            const response = await fetch(
                `/api/posts?current=${loadedPosts.length}&next=${
                    loadedPosts.length + 9
                }`
            );
            const newPosts: IPost[] = await response.json();

            if (!newPosts?.length) throw new Error();

            setLoadedPosts([...loadedPosts, ...newPosts]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading.off();
        }
    };

    return (
        <Container
            maxW='container.md'
            px='5'
            py={{ base: 20, md: 24 }}
            minH='calc(100vh)'
            display='flex'
            justifyContent='center'
            alignItems='center'
        >
            <Head>
                <title>Blog Page | Vladyslav Nahornyi</title>
                <meta name='description' content='Blog of Vladyslav Nahornyi about development, science and it. Here you can find something interesting for yourself' />
                <link rel='canonical' href='https://www.vnahornyi.me/blog' />
            </Head>
            <VStack spacing={{ base: 5, md: 10 }}>
                {loadedPosts.map((post, idx) => (
                    <Card key={post.id} index={idx} {...post} />
                ))}
                {total !== loadedPosts.length && (
                    <Button
                        variant='outline'
                        colorScheme='green'
                        isLoading={isLoading}
                        onClick={loadMorePosts}
                    >
                        Load more...
                    </Button>
                )}
            </VStack>
        </Container>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    try {
        const total: number = (await client.fetch(groq`*[_type == 'post'][]`))
            .length;
        const posts =
            await client.fetch(groq`*[_type == 'post'][0...8] | order(publishedAt) {
            "id": _id,
            "mainImage": {
                "src": mainImage.asset->url,
                "width": mainImage.asset->metadata.dimensions.width,
                "height": mainImage.asset->metadata.dimensions.height,
                "placeholder": mainImage.asset->metadata.lqip
            },
            "categories": categories[]->title.en,
            "description": description.en,
            "published": publishedAt,
            "slug": slug.current,
            "title": title.en
        }`);

        if (!posts.length) throw new Error();

        return {
            revalidate: 28800,
            props: {
                total,
                posts,
            },
        };
    } catch (err) {
        console.error(err);
        return {
            notFound: true,
        };
    }
};

export default BlogPage;
