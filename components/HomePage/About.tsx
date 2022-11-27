import { Flex, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

import BigTitle from 'components/UI/BigTitle';
import ScrollToBottomBtn from 'components/UI/ScrollToBottomBtn';

const About: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <Flex
            py='20'
            maxW='full'
            minH='calc(100vh)'
            pos='relative'
            flexDirection='column'
            bg={useColorModeValue('green.50', 'gray.900')}
            overflow='hidden'
            display='flex'
            zIndex={1}
            justifyContent='center'
            alignItems='center'
        >
            <Stack maxW='container.md' w='full' mx='auto' spacing='10'>
                <Heading
                    ref={ref}
                    variant='h2'
                    opacity={isInView ? 1 : 0}
                    transform={isInView ? 'none' : 'translateX(-250px)'}
                >
                    My, Myself & I
                </Heading>
                <Text
                    fontSize={18}
                    opacity={isInView ? 1 : 0}
                    transform={isInView ? 'none' : 'translateX(-250px)'}
                    transition='all 1s 1s'
                >
                    I&apos;m a front-end developer located in Ukraine. I love to create complex SPA and beautiful web applications with great user experience.
                </Text>
                <Text
                    fontSize={18}
                    opacity={isInView ? 1 : 0}
                    transform={isInView ? 'none' : 'translateX(-250px)'}
                    transition='all 1s 2s'
                >
                My hobby is always to learn something new, whether it is some new technology in it or something far from my kind of employment.
                </Text>
                <Text
                    fontSize={18}
                    opacity={isInView ? 1 : 0}
                    transform={isInView ? 'none' : 'translateX(-250px)'}
                    transition='all 1s 3s'
                >
                    In my spare time I study to prepare different new dishes, which have not yet prepared, walking and spending time with the family.
                </Text>
                <Text
                    fontSize={18}
                    opacity={isInView ? 1 : 0}
                    transform={isInView ? 'none' : 'translateX(-250px)'}
                    transition='all 1s 4s'
                >
                    I&apos;m interested in the whole frontend stack Like trying new things and building great projects.
                </Text>
            </Stack>
            <ScrollToBottomBtn sectionNumber={4} alwaysWhite />
            <BigTitle text='ABOUT' bottom='-4.5vw' left='50%' />
        </Flex>
    );
}

export default About;
