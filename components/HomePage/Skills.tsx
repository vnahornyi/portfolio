import {
    Box,
    Flex,
    Heading,
    Stack,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

import BigTitle from 'components/UI/BigTitle';
import ScrollToBottomBtn from 'components/UI/ScrollToBottomBtn';

const ParalaxText = dynamic(() => import('components/UI/ParalaxText'), {
    ssr: false,
});

const Skills = () => {
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
            overflow='hidden'
            display='flex'
            justifyContent='center'
            alignItems='center'
        >
            <BigTitle
                text='SKILLS'
                top={useBreakpointValue({ base: '-20px', lg: '0' })}
                right={useBreakpointValue({ base: '5%', lg: '50%' })}
            />
            <Stack
                ref={ref}
                spacing={{ base: 5, lg: 10 }}
                maxW={{ base: 'container.sm', lg: 'container.md' }}
                mt={{ base: 14, lg: 32 }}
                zIndex={1}
            >
                <Heading
                    variant='h2'
                    fontSize={{ base: '2xl', md: '4xl' }}
                    opacity={isInView ? 1 : 0}
                    transform={isInView ? 'none' : 'translateY(200px)'}
                    transition='all 1s'
                >
                    Front-end Developer
                </Heading>
                <Text
                    fontSize={{ base: 'md', md: 'lg' }}
                    opacity={isInView ? 1 : 0}
                    transform={isInView ? 'none' : 'translateY(200px)'}
                    transition='all 1s 0.5s'
                >
                    Strong professional skills in Front-end developing. Have
                    experience with bootstrapping front-end from zero on React,
                    Redux.
                </Text>
                <Text
                    fontSize={{ base: 'md', md: 'lg' }}
                    opacity={isInView ? 1 : 0}
                    transform={isInView ? 'none' : 'translateY(200px)'}
                    transition='all 1s 1s'
                >
                    Bootstrapping layouts with Tailwind CSS or ChakraUl and
                    customizing them. Adaptive site design. Work as HTML5
                    developer with mobile platforms. Have experience with JSON
                    and worked with REST API.
                </Text>
                <Text
                    fontSize={{ base: 'md', md: 'lg' }}
                    opacity={isInView ? 1 : 0}
                    transform={isInView ? 'none' : 'translateY(200px)'}
                    transition='all 1s 1.5s'
                >
                    My constant goal is to understand the client&apos;s business
                    requirements and produce a maintainable code of high
                    quality.
                </Text>
            </Stack>
            <Box pt={{ base: 5, md: 20 }} pb={{ base: 15, md: 0 }}>
                <ParalaxText
                    words={[
                        'javascript',
                        'typescript',
                        'react',
                        'redux',
                        'nextjs',
                        'framer-motion',
                        'javascript',
                        'typescript',
                    ]}
                    baseVelocity={3}
                />
                <ParalaxText
                    words={[
                        'html5',
                        'css3',
                        'scss',
                        'less',
                        'styled-components',
                        'webpack',
                        'agile',
                        'scrum',
                        'html5',
                        'css3',
                        'scss',
                        'less',
                        'styled-components',
                        'webpack',
                        'agile',
                        'react native',
                    ]}
                    baseVelocity={-3}
                />
            </Box>
            <ScrollToBottomBtn sectionNumber={3} />
        </Flex>
    );
};

export default Skills;
