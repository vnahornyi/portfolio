import { Box, Button, Container, Heading, VStack } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { groq } from 'next-sanity';
import { motion } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { ChevronLeftIcon } from '@chakra-ui/icons';

import { IPost } from 'types';
import client from 'utils/client';
import portableComponents from 'utils/portableComponents';
import Head from 'next/head';

interface IPostPageProps {
    post: IPost;
}

const PostPage: NextPage<IPostPageProps> = ({ post }) => {
    const { title, mainImage, body, description } = post;

    return (
        <Container
            as={motion.article}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            maxW='container.md'
            py={{ base: 20, md: 24 }}
            px='5'
        >
            <Head>
                <title>{title} | Vladyslav Nahornyi</title>
                <meta name='description' content={description} />
            </Head>
            <VStack spacing={{ base: 5, md: 10 }} align='start'>
                <Button
                    variant='link'
                    as={NextLink}
                    href='/blog'
                    leftIcon={<ChevronLeftIcon w='5' h='5' />}
                >
                    Back to blog
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
                <Heading variant='h1' textAlign='center' w='full'>
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
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const slug = params?.slug;
        const post = await client.fetch(
            groq`*[_type == 'post' && slug.current == $slug][0] {
            "body": body.en,
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
        }`,
            { slug }
        );

        if (!post) throw new Error();

        return {
            revalidate: 28800,
            props: {
                post,
            },
        };
    } catch (err) {
        console.error(err);
        return {
            notFound: true,
        };
    }
};

export const getStaticPaths: GetStaticPaths = async () => {
    const posts: { slug: string }[] =
        await client.fetch(groq`*[_type == 'post'][]{
        "slug": slug.current
    }`);

    return {
        paths: posts.map(post => ({ params: { slug: post.slug } })),
        fallback: 'blocking',
    };
};

export default PostPage;
