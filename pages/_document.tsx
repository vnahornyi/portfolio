import { ColorModeScript } from '@chakra-ui/react';
import theme from 'constants/theme';
import { Html, Head, Main, NextScript } from 'next/document';

const Document: React.FC = () => {
    return (
        <Html lang='en'>
            <Head>
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link
                    rel='preconnect'
                    href='https://fonts.gstatic.com'
                    crossOrigin=''
                />
                <link
                    href='https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap'
                    rel='stylesheet'
                />
                <link
                    rel='icon'
                    href='/favicon.ico'
                    sizes='any'
                />
                <link
                    rel='apple-touch-icon'
                    href='/apple-touch-icon.png'
                />
                <link
                    rel='manifest'
                    href='/manifest.webmanifest'
                />
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
};

export default Document;
