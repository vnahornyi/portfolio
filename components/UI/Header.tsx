import { Button, chakra, Flex, Stack, Text } from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

import ThemePicker from './Header/ThemePicker';

const MotionHeader = chakra(motion.header);

const Header = () => {
    const { scrollY } = useScroll();
    const backgropBlur = useTransform(
        scrollY,
        [0, 40],
        ['blur(0px)', 'blur(8px)']
    );

    const handleOpenResume = () => {
        window.open('/data/resume.pdf');  
    };

    return (
        <MotionHeader
            as={motion.header}
            display='flex'
            justifyContent='center'
            style={{ backdropFilter: backgropBlur }}
            zIndex={2}
            pos='fixed'
            w='full'
            top='0'
        >
            <Flex
                maxW='container.xl'
                w='full'
                align='center'
                justify='space-between'
                px='2'
                py='4'
            >
                <Text
                    as={Link}
                    href='/'
                    fontSize='xl'
                    fontWeight='bold'
                >
                    Vladyslav Nahornyi
                </Text>
                <Stack spacing={5} direction='row'>
                    <ThemePicker />
                    <Button
                        as={motion.button}
                        colorScheme='green'
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={handleOpenResume}
                    >
                        RESUME
                    </Button>
                </Stack>
            </Flex>
        </MotionHeader>
    );
}

export default Header;
