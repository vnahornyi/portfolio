import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { createContext } from 'react';

import { IResume } from 'types';

import Header from 'components/UI/Header';

const Footer = dynamic(() => import('components/UI/Footer'));

interface IMainLayoutProps {
    children: React.ReactNode;
    resume: IResume;
}

export const ResumeContext = createContext<IResume | null>(null);

const MainLayout: React.FC<IMainLayoutProps> = ({ children, resume }) => {
    return (
        <ResumeContext.Provider value={resume}>
            <Box as='main' minH='calc(100vh)' w='full' overflowX='hidden'>
                <Head>
                    <meta
                        name='viewport'
                        content='width=device-width, initial-scale=1'
                    />
                    <meta
                        name='keywords'
                        content='Vladyslav Nahornyi, vladyslav nahornyi, vnahornyi, vn, front-end, Front-End, React, Redux, TypeScript, TS, JS, js, react, redux, framer-motion, sass, less, scss, css, html, html5, css3, Next.js, nextjs'
                    />
                    <meta name='author' content='Vladyslav Nahornyi' />
                    <meta name='robots' content='index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' />
                </Head>
                <Header />
                {children}
                <Footer />
            </Box>
        </ResumeContext.Provider>
    );
};

export default MainLayout;
