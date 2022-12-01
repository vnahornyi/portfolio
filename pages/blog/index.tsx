import { Button, Container, useBoolean, VStack } from '@chakra-ui/react';
import { GetStaticProps, NextPage } from 'next';
import { groq } from 'next-sanity';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { IPost, IResume } from 'types';
import client from 'utils/client';
import getResume from 'utils/getResume';

import Card from 'components/BlogPage/Card';

import MainLayout from 'layouts/MainLayout';

interface IBlogPageProps {
    posts: IPost[];
    total: number;
    resume: IResume;
}

const BlogPage: NextPage<IBlogPageProps> = ({ posts, total, resume }) => {
    const { t, lang } = useTranslation('blog');
    const [loadedPosts, setLoadedPosts] = useState<typeof posts>(posts);
    const [isLoading, setLoading] = useBoolean();

    useEffect(() => {
        setLoadedPosts(posts);
    }, [posts]);

    const loadMorePosts = async () => {
        try {
            setLoading.on();

            const response = await fetch(
                `/api/posts?locale=${lang}&current=${loadedPosts.length}&next=${
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
        <MainLayout resume={resume}>
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
                    <title>{t('head-title')} | Vladyslav Nahornyi</title>
                    <meta name='description' content='Blog of Vladyslav Nahornyi about development, science and it. Here you can find something interesting for yourself' />
                    <link rel='canonical' href='https://www.vnahornyi.me/blog' />
                </Head>
                <VStack spacing={{ base: 5, md: 10 }}>
                    {loadedPosts.map((post, idx) => (
                        <Card key={`${post.id}_${lang}`} index={idx} priority={idx < 2} {...post} />
                    ))}
                    {total !== loadedPosts.length && (
                        <Button
                            variant='outline'
                            colorScheme='green'
                            isLoading={isLoading}
                            onClick={loadMorePosts}
                        >
                            {t('load-more')}
                        </Button>
                    )}
                </VStack>
            </Container>
        </MainLayout>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    try {
        const resume = await getResume();
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
            "categories": categories[]->title.${locale},
            "description": description.${locale},
            "published": publishedAt,
            "slug": slug.current,
            "title": title.${locale}
        }`);

        if (!posts.length) throw new Error();

        return {
            revalidate: 60,
            props: {
                total,
                posts,
                resume
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
