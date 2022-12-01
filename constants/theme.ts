import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
    initialColorMode: 'system',
    useSystemColorMode: false
};

const theme = extendTheme({
    fonts: {
        body: `Quicksand, Montserrat, sans-serif`,
        heading: `Quicksand, Montserrat, sans-serif`,
    },
    global: {
        'body, html': {
            overflowX: 'hidden'
        }
    },
    config
});

export default theme;
