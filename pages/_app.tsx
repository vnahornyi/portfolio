import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import MainLayout from 'layouts/MainLayout';
import theme from 'constants/theme';

const App: React.FC<AppProps> = ({ Component, pageProps, router }) => {
    return (
        <ChakraProvider theme={theme}>
            <MainLayout>
                <Component {...pageProps} key={router.route} />
            </MainLayout>
        </ChakraProvider>
    );
};

export default App;
