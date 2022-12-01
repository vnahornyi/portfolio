import {
    Flex,
    Heading,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
} from '@chakra-ui/react';

import { useInView, m } from 'framer-motion';
import { useRef } from 'react';
import { PortableText } from '@portabletext/react';


import { IPage } from 'types';

import BigTitle from 'components/UI/BigTitle';
import JumpingArrow from 'components/UI/JumpingArrow';

type AboutPropsType = IPage;

const About: React.FC<AboutPropsType> = ({ title, body }) => {
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
                    {title}
                </Heading>
                <PortableText
                    value={body}
                    components={{ block: {
                        normal: ({ children, index }) => (
                            <Text
                                as={m.p}
                                fontSize={{ base: 'md', md: 'lg' }}
                                initial={{ opacity: 0, x: -250 }}
                                animate={isInView ? { opacity: 1, x: 0, transition: { duration: 1, delay: (index + 1) * 0.5 } } : undefined}
                            >{children}</Text>
                        )
                    } }}
                />
            </Stack>
            <JumpingArrow alwaysWhite />
            <BigTitle
                text='big-title-about'
                bottom={useBreakpointValue({ base: '-20px', lg: '0' })}
                left={useBreakpointValue({ base: '5%', lg: '50%' })}
            />
        </Flex>
    );
};

export default About;
