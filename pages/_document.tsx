import { ColorModeScript } from '@chakra-ui/react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

import theme from 'constants/theme';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel='preconnect' href='https://fonts.googleapis.com' />
                    <link
                        rel='preconnect'
                        href='https://fonts.gstatic.com'
                        crossOrigin=''
                    />
                    <link
                        href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Quicksand:wght@400;500;600;700&display=swap'
                        rel='stylesheet'
                    />
                    <link rel='icon' href='/favicon.ico' sizes='any' />
                    <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
                    <link rel='manifest' href='/manifest.webmanifest' />
                </Head>
                <body>
                    <ColorModeScript
                        initialColorMode={theme.config.initialColorMode}
                    />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
};

export default MyDocument;
