import Head from 'next/head';
import { Box, Container } from '@chakra-ui/react';

interface IMainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
    return (
        <Box as='main' minH='calc(100vh)' w='full' bg='gray.900'>
            <Head>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <title>Vladyslav Nahornyi - Homepage</title>
            </Head>
            {children}
        </Box>
    );
};

export default MainLayout;
