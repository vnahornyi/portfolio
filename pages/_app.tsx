import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';

import MainLayout from 'layouts/MainLayout';
import theme from 'constants/theme';

const App: React.FC<AppProps> = ({ Component, pageProps, router }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.scrollTo({ top: 0 });
        });

        return () => {
            clearTimeout(timer);
        }
    }, []);

    return (
        <ChakraProvider theme={theme}>
            <MainLayout>
                <Component {...pageProps} key={router.route} />
            </MainLayout>
            <Analytics />
        </ChakraProvider>
    );
};

export default App;
