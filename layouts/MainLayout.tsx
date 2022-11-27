import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import Header from 'components/UI/Header';

interface IMainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
    return (
        <Box
            as='main'
            minH='calc(100vh)'
            w='full'
            overflowX='hidden'
        >
            <Head>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <title>Vladyslav Nahornyi - Homepage</title>
            </Head>
            <Header />
            {children}
        </Box>
    );
};

export default MainLayout;
