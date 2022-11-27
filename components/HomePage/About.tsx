import {
    Flex,
    Heading,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
} from '@chakra-ui/react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

import BigTitle from 'components/UI/BigTitle';
import ScrollToBottomBtn from 'components/UI/ScrollToBottomBtn';

const About: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <Flex
            py={{ base: 15, lg: 20 }}
            px={{ base: 5, lg: 0 }}
            maxW='full'
            minH='calc(100vh)'
            pos='relative'
            flexDirection='column'
            bg={useColorModeValue('green.50', 'gray.900')}
            overflow='hidden'
            display='flex'
            zIndex={3}
            justifyContent='center'
            alignItems='center'
        >
            <Stack
                maxW={{ base: 'container.sm', lg: 'container.md' }}
                w='full'
                mx='auto'
                spacing={{ base: 5, lg: 10 }}
            >
                <Heading
                    ref={ref}
                    variant='h2'
                    fontSize={{ base: '2xl', md: '4xl' }}
                    opacity={isInView ? 1 : 0}
                    transform={isInView ? 'none' : 'translateX(-250px)'}
                >
                    My, Myself & I
                </Heading>
                <Text
                    fontSize={{ base: 'md', md: 'lg' }}
                    opacity={isInView ? 1 : 0}
                    transform={isInView ? 'none' : 'translateX(-250px)'}
                    transition='all 1s 1s'
                >
                    I&apos;m a front-end developer located in Ukraine. I love to
                    create complex SPA and beautiful web applications with great
                    user experience.
                </Text>
                <Text
                    fontSize={{ base: 'md', md: 'lg' }}
                    opacity={isInView ? 1 : 0}
                    transform={isInView ? 'none' : 'translateX(-250px)'}
                    transition='all 1s 2s'
                >
                    My hobby is always to learn something new, whether it is
                    some new technology in it or something far from my kind of
                    employment.
                </Text>
                <Text
                    fontSize={{ base: 'md', md: 'lg' }}
                    opacity={isInView ? 1 : 0}
                    transform={isInView ? 'none' : 'translateX(-250px)'}
                    transition='all 1s 3s'
                >
                    In my spare time I study to prepare different new dishes,
                    which have not yet prepared, walking and spending time with
                    the family.
                </Text>
                <Text
                    fontSize={{ base: 'md', md: 'lg' }}
                    opacity={isInView ? 1 : 0}
                    transform={isInView ? 'none' : 'translateX(-250px)'}
                    transition='all 1s 4s'
                >
                    I&apos;m interested in the whole frontend stack Like trying
                    new things and building great projects.
                </Text>
            </Stack>
            <ScrollToBottomBtn sectionNumber={4} alwaysWhite />
            <BigTitle
                text='ABOUT'
                bottom={useBreakpointValue({ base: '-20px', lg: '0' })}
                left={useBreakpointValue({ base: '5%', lg: '50%' })}
            />
        </Flex>
    );
};

export default About;
