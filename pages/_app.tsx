import { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import MainLayout from 'layouts/MainLayout';

export const theme = extendTheme({
    fonts: {
        body: `'Quicksand', sans-serif`,
        heading: `'Quicksand', sans-serif`,
    }
});

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
