import { Button, chakra, Flex, Stack, Text } from '@chakra-ui/react';
import { m, useScroll, useTransform } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useContext } from 'react';

import { ResumeContext } from 'layouts/MainLayout';
import LanguagePicker from './LanguagePicker';

const MotionHeader = chakra(m.header);

const Header: React.FC = () => {
    const resume = useContext(ResumeContext);
    const { t } = useTranslation('common');
    const { scrollY } = useScroll();
    const backgropBlur = useTransform(
        scrollY,
        [0, 40],
        ['blur(0px) contrast(100%)', 'blur(8px) contrast(90%)']
    );

    return (
        <MotionHeader
            display='flex'
            justifyContent='center'
            style={{ backdropFilter: backgropBlur, WebkitBackdropFilter: backgropBlur }}
            zIndex={5}
            pos='fixed'
            w='full'
            top='0'
        >
            <Flex
                maxW='container.xl'
                w='full'
                align='center'
                justify='space-between'
                px='5'
                py='4'
            >
                <Text
                    as={Link}
                    href='/'
                    fontSize={{ base: 'md', md: 'xl' }}
                    fontWeight='bold'
                >
                    Vladyslav Nahornyi
                </Text>
                <Stack spacing={5} direction='row'>
                    <LanguagePicker />
                    <Button
                        as={m.a}
                        rel='noreferrer noopener'
                        target='_blank'
                        href={resume?.pdfUrl}
                        colorScheme='green'
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        size={{ base: 'sm', md: 'md' }}
                    >
                        {t('resume-btn')}
                    </Button>
                </Stack>
            </Flex>
        </MotionHeader>
    );
}

export default Header;
