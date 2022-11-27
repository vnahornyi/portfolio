import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    fonts: {
        body: `'Quicksand', sans-serif`,
        heading: `'Quicksand', sans-serif`,
    },
    global: {
        'body, html': {
            overflowX: 'hidden'
        }
    }
});

export default theme;
