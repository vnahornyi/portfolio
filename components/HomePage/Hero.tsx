import {
    Button,
    Flex,
    Stack,
    Text,
    useBoolean,
    useColorModeValue,
} from '@chakra-ui/react';

import dynamic from 'next/dynamic';

import {
    AnimatePresence,
    motion,
    Variants
} from 'framer-motion';

import heroParticles from 'public/data/hero-particles.json';
import heroParticlesDark from 'public/data/hero-particles-dark.json';

import WavyText from 'components/UI/WavyText';
import ScrollToBottomBtn from '../UI/ScrollToBottomBtn';

const Particles = dynamic(() => import('components/UI/Particles'));
const Avatar = dynamic(() => import('components/HomePage/Hero/MyPicture'));

const Hero: React.FC = () => {
    const [showDesc, setShowDesc] = useBoolean();
    const particlesConfig = useColorModeValue(heroParticles, heroParticlesDark);

    const handleScrollToContact = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }

    return (
        <Flex
            pos='relative'
            justify='center'
            align='center'
            minH='calc(100vh)'
            as='section'
            color='black'
        >
            <Flex
                justify={{ base: 'space-evenly', xl: 'space-between' }}
                align='center'
                maxW='container.lg'
                w='full'
                zIndex={1}
                p='4'
                direction={{ base: 'column', lg: 'row' }}
            >
                <Stack direction='column' spacing='4'>
                    <WavyText
                        text={`Hi, I'm Vladyslav Nahornyi`}
                        delay={0.5}
                        duration={0.1}
                        onAnimationComplete={setShowDesc.on}
                    />
                    <AnimatePresence>
                        {showDesc && (
                            <Stack
                                as={motion.div}
                                variants={description}
                                initial='hidden'
                                animate='show'
                                spacing={{ base: 4, lg: 10 }}
                            >
                                <Text
                                    fontSize={{ base: 'sm', md: 'xl' }}
                                    fontWeight='bold'
                                    color='green.400'
                                >
                                    Front-end Developer based in Ukraine
                                </Text>
                                <Button
                                    colorScheme='green'
                                    variant='outline'
                                    onClick={handleScrollToContact}
                                    size={{ base: 'sm', md: 'md' }}
                                >
                                    Contact me!
                                </Button>
                            </Stack>
                        )}
                    </AnimatePresence>
                </Stack>
                <Avatar />
            </Flex>
            <ScrollToBottomBtn />
            <Particles config={particlesConfig} />
        </Flex>
    );
};

const description: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
        marginTop: -78
    },
    show: {
        opacity: 1,
        y: 0,
        marginTop: 0,
        transition: {
            delay: 0.1,
            duration: 1
        }
    }
};

export default Hero;
