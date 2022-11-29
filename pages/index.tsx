import dynamic from 'next/dynamic';
import Hero from 'components/HomePage/Hero';
import { GetStaticProps, NextPage } from 'next';
import client from 'utils/client';
import { groq } from 'next-sanity';
import { IPage, IPost } from 'types';
import Head from 'next/head';

const Blog = dynamic(() => import('components/HomePage/Blog'));
const Skills = dynamic(() => import('components/HomePage/Skills'));
const About = dynamic(() => import('components/HomePage/About'));
const Contact = dynamic(() => import('components/HomePage/Contact'));

interface IHomePageProps {
    pages: {
        skills: IPage,
        about: IPage
    };
    skillsLines: {
        first: string[],
        second: string[]
    };
    posts: IPost[];
}

const Home: NextPage<IHomePageProps> = ({ pages, skillsLines, posts }) => {
    return (
        <>
            <Head>
                <title>Vladyslav Nahornyi - Home Page</title>
                <meta name='description' content={`My name is Vladyslav, I'm a front-end developer located in Ukraine.`} />
                <link rel='canonical' href='https://www.vnahornyi.me' />
            </Head>
            <Hero />
            <Blog posts={posts} />
            <Skills {...pages.skills} skillsLines={skillsLines} />
            <About {...pages.about} />
            <Contact />
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const pages: IPage[] = await client.fetch(groq`*[_type == 'page'][]{
        'body': body.en,
        'slug': slug.current,
        'title': title.en
    }`);
    const skillsLines: { firstLine: string, secondLine: string } = await client.fetch(groq`*[_type == 'skills'][0]{
        firstLine,
        secondLine
    }`);
    const posts: IPost[] = await client.fetch(groq`*[_type == 'post'][0...9] | order(_createdAt) {
        "created": _createdAt,
        "modified": _updatedAt,
        "id": _id,
        "categories": categories[]._ref,
        "description": description.en,
        "published": publishedAt,
        "slug": slug.current,
        "title": title.en
      }`);

    return {
        revalidate: 28800,
        props: {
            pages: {
                skills: pages.find((page) => page.slug === 'skills'),
                about: pages.find((page) => page.slug === 'about'),
            },
            skillsLines: {
                first: skillsLines.firstLine.split(' '),
                second: skillsLines.secondLine.split(' ')
            },
            posts
        }
    }
}

export default Home;
