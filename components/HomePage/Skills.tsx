import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

import BigTitle from 'components/UI/BigTitle';
import ScrollToBottomBtn from 'components/UI/ScrollToBottomBtn';

const ParalaxText = dynamic(() => import('components/UI/ParalaxText'), { ssr: false });

const Skills = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <Flex
            py='20'
            maxW='full'
            minH='calc(100vh)'
            pos='relative'
            flexDirection='column'
            overflow='hidden'
            display='flex'
            justifyContent='center'
            alignItems='center'
        >
            <BigTitle text='SKILLS' top='-4.5vw' right='50%' />
            <Stack ref={ref} spacing='10' maxW='container.md' mt='32' zIndex={1}>
                <Heading
                    variant='h2'
                    fontSize='4xl'
                    opacity={isInView ? 1 : 0}
                    transform={isInView ? 'none' : 'translateY(200px)'}
                    transition='all 1s'
                >
                    Front-end Developer
                </Heading>
                <Text
                    fontSize={18}
                    opacity={isInView ? 1 : 0}
                    transform={isInView ? 'none' : 'translateY(200px)'}
                    transition='all 1s 1s'
                >
                    Strong professional skills in Front-end developing. Have experience with bootstrapping front-end from zero on React, Redux.
                </Text>
                <Text
                    fontSize={18}
                    opacity={isInView ? 1 : 0}
                    transform={isInView ? 'none' : 'translateY(200px)'}
                    transition='all 1s 2s'
                >
                    Bootstrapping layouts with Tailwind CSS or ChakraUl and customizing them. Adaptive site design. Work as HTML5 developer with mobile platforms. Have experience with JSON and worked with REST API.
                </Text>
                <Text
                    fontSize={18}
                    opacity={isInView ? 1 : 0}
                    transform={isInView ? 'none' : 'translateY(200px)'}
                    transition='all 1s 3s'
                >
                    My constant goal is to understand the client&apos;s business requirements and produce a maintainable code of high quality.
                </Text>
            </Stack>
            <Box pt='20'>
                <ParalaxText words={['javascript', 'typescript', 'react', 'redux', 'nextjs', 'framer-motion', 'javascript', 'typescript']} baseVelocity={3} />
                <ParalaxText words={['html5', 'css3', 'scss', 'less', 'styled-components', 'webpack', 'agile', 'scrum', 'html5', 'css3', 'scss', 'less', 'styled-components', 'webpack', 'agile', 'react native']} baseVelocity={-3} />
            </Box>
            <ScrollToBottomBtn sectionNumber={3} />
        </Flex>
    );
};

export default Skills;
