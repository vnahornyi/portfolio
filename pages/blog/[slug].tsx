import { Box, Button, Container, Heading, VStack } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { groq } from 'next-sanity';
import { m } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';

import { IPost, IResume } from 'types';
import client from 'utils/client';
import getResume from 'utils/getResume';
import portableComponents from 'utils/portableComponents';

import MainLayout from 'layouts/MainLayout';

interface IPostPageProps {
    post: IPost;
    resume: IResume;
}

const PostPage: NextPage<IPostPageProps> = ({ post, resume }) => {
    const { t } = useTranslation('blog');
    const { title, mainImage, body, description, slug } = post;

    return (
        <MainLayout resume={resume}>
            <Container
                as='article'
                maxW='container.md'
                py={{ base: 20, md: 24 }}
                px='5'
                overflow='hidden'
            >
                <Head>
                    <title>{title} | Vladyslav Nahornyi</title>
                    <meta name='description' content={description} />
                    <link
                        rel='canonical'
                        href={`https://www.vnahornyi.me/blog/${slug}`}
                    />
                </Head>
                <VStack spacing={{ base: 5, md: 10 }} align='start'>
                    <Button
                        variant='link'
                        as={NextLink}
                        href='/blog'
                        leftIcon={<ChevronLeftIcon w='5' h='5' />}
                    >
                        {t('back-btn')}
                    </Button>
                    {mainImage && (
                        <Box
                            rounded='xl'
                            overflow='hidden'
                            display='inline-block'
                            mx='auto'
                        >
                            <Image
                                src={mainImage.src}
                                width={mainImage.width}
                                height={mainImage.height}
                                blurDataURL={mainImage.placeholder}
                                alt={title}
                                priority
                            />
                        </Box>
                    )}
                    <Heading
                        variant='h1'
                        textAlign='center'
                        w='full'
                        as={m.h1}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {title}
                    </Heading>
                    {body && (
                        <PortableText
                            value={body}
                            components={portableComponents}
                        />
                    )}
                </VStack>
            </Container>
        </MainLayout>
    );
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
    try {
        const resume = await getResume();
        const slug = params?.slug;
        const post = await client.fetch(
            groq`*[_type == 'post' && slug.current == $slug][0] {
            "body": body.${locale},
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
        }`,
            { slug }
        );

        if (!post) throw new Error();

        return {
            revalidate: 28800,
            props: {
                post,
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

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
    const posts: { slug: string }[] =
        await client.fetch(groq`*[_type == 'post'][]{
        "slug": slug.current
    }`);

    return {
        paths: posts.reduce((arr, post) => {
            return [
                ...arr,
                { params: { slug: post.slug }, locale: locales?.[0] ?? '' },
                { params: { slug: post.slug }, locale: locales?.[1] ?? '' },
            ];
        }, [] as { params: { slug: string }; locale: string }[]),
        fallback: 'blocking',
    };
};

export default PostPage;
