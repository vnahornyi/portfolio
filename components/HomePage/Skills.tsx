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
import { useInView, m } from 'framer-motion';
import { PortableText } from '@portabletext/react';

import { IPage } from 'types';

import BigTitle from 'components/UI/BigTitle';
import JumpingArrow from 'components/UI/JumpingArrow';

const ParalaxText = dynamic(() => import('components/UI/ParalaxText'), {
    ssr: false,
});

interface ISkillsProps extends IPage {
    skillsLines: {
        first: string[];
        second: string[];
    }
}

const Skills: React.FC<ISkillsProps> = ({ title, body, skillsLines }) => {
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
                    {title}
                </Heading>
                <PortableText
                    value={body}
                    components={{ block: { normal: ({ index, children }) => (
                        <Text
                            as={m.p}
                            fontSize={{ base: 'md', md: 'lg' }}
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1, transition: { duration: 1, delay: (index + 1) * 0.5 } } : undefined}
                        >{children}</Text>
                    ) } }}
                />
            </Stack>
            <Box pt={{ base: 5, md: 20 }} pb={{ base: 15, md: 0 }}>
                <ParalaxText
                    words={skillsLines.first}
                    baseVelocity={3}
                />
                <ParalaxText
                    words={skillsLines.second}
                    baseVelocity={-3}
                />
            </Box>
            <JumpingArrow />
        </Flex>
    );
};

export default Skills;
