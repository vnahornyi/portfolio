import {
    Box,
    Container,
    Stack,
    Text,
    Link,
    useColorModeValue,
    ButtonGroup,
} from '@chakra-ui/react';

import NextLink from 'next/link';
import useTranslation from 'next-translate/useTranslation';

import * as routes from 'constants/routes';

import LanguagePicker from './LanguagePicker';
import ThemePicker from './ThemePicker';

const Footer: React.FC = () => {
    const { t } = useTranslation('common');

    return (
        <Box
            as='footer'
            zIndex={3}
            bg={useColorModeValue('green.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
            pos='relative'
        >
            <Container
                as={Stack}
                maxW='container.xl'
                py='4'
                spacing='4'
                justifyContent='center'
                alignItems='center'
                zIndex={2}
            >
                <Text
                    fontSize={{ base: 'md', md: 'xl' }}
                    fontWeight='bold'
                    color={useColorModeValue('black', 'white')}
                >
                    Vladyslav Nahornyi
                </Text>
                <Stack direction='row' spacing='6'>
                    <Link as={NextLink} href={routes.HOME}>
                        {t('Home')}
                    </Link>
                    {/* <Link as={NextLink} href={routes.ABOUT}>
                        {t('About')}
                    </Link> */}
                    <Link as={NextLink} href={routes.BLOG}>
                        {t('Blog')}
                    </Link>
                    {/* <Link as={NextLink} href={routes.CONTACT}>
                        {t('Contact')}
                    </Link> */}
                </Stack>
            </Container>
            <Box
                borderTop='1px solid'
                borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
                <Container
                    as={Stack}
                    maxW='container.xl'
                    py='4'
                    direction={{ base: 'column', md: 'row' }}
                    spacing='4'
                    justifyContent={{ base: 'center', md: 'space-between' }}
                    alignItems='center'
                >
                    <Text>
                        © {new Date().getFullYear()} Vladyslav Nahornyi. {t('All rights reserved')}
                    </Text>
                    <ButtonGroup isAttached variant='outline'>
                        <LanguagePicker />
                        <ThemePicker />
                    </ButtonGroup>
                </Container>
            </Box>
        </Box>
    );
};

export default Footer;
