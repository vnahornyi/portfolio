import dynamic from 'next/dynamic';
import { GetStaticProps, NextPage } from 'next';
import { groq } from 'next-sanity';
import Head from 'next/head';
import { useRef } from 'react';

import { IPage, IPost, IResume } from 'types';
import client from 'utils/client';
import getResume from 'utils/getResume';

import Hero from 'components/HomePage/Hero';
import MainLayout from 'layouts/MainLayout';
import useTranslation from 'next-translate/useTranslation';

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
    resume: IResume;
}

const Home: NextPage<IHomePageProps> = ({ pages, skillsLines, posts, resume }) => {
    const contactRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation('home');

    return (
        <MainLayout resume={resume}>
            <Head>
                <title>{t('head-title')} | Vladyslav Nahornyi</title>
                <meta name='description' content={`My name is Vladyslav, I'm a front-end developer located in Ukraine.`} />
                <link rel='canonical' href='https://www.vnahornyi.me' />
            </Head>
            <Hero contactRef={contactRef} />
            <Blog posts={posts} />
            <Skills {...pages.skills} skillsLines={skillsLines} />
            <About {...pages.about} />
            <Contact contactRef={contactRef} />
        </MainLayout>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const resume = await getResume();
    const pages: IPage[] = await client.fetch(groq`*[_type == 'page'][]{
        'body': body.${locale},
        'slug': slug.current,
        'title': title.${locale}
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
        "description": description.${locale},
        "published": publishedAt,
        "slug": slug.current,
        "title": title.${locale}
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
            posts,
            resume
        }
    }
}

export default Home;
