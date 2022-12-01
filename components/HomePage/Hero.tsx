import {
    Button,
    Flex,
    Stack,
    Text,
    useBoolean,
    useColorModeValue,
} from '@chakra-ui/react';

import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';
import { RefObject} from 'react';

import {
    AnimatePresence,
    m,
    Variants
} from 'framer-motion';

import heroParticles from 'public/data/hero-particles.json';
import heroParticlesDark from 'public/data/hero-particles-dark.json';

import WavyText from 'components/UI/WavyText';
import ScrollToBottomBtn from '../UI/JumpingArrow';

const Particles = dynamic(() => import('components/UI/Particles'));
const Avatar = dynamic(() => import('components/HomePage/Hero/MyPicture'));

interface IHeroProps {
    contactRef: RefObject<HTMLDivElement>;
}

const Hero: React.FC<IHeroProps> = ({ contactRef }) => {
    const { t } = useTranslation('home');
    const [showDesc, setShowDesc] = useBoolean();
    const particlesConfig = useColorModeValue(heroParticles, heroParticlesDark);

    const handleScrollToContact = () => {
        window.scrollTo({
            top: contactRef.current?.offsetTop,
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
                        text={t('title')}
                        delay={0.5}
                        duration={0.1}
                        onAnimationComplete={setShowDesc.on}
                    />
                    <AnimatePresence>
                        {showDesc && (
                            <Stack
                                as={m.div}
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
                                    {t('description')}
                                </Text>
                                <Button
                                    as={m.button}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.8 }}
                                    colorScheme='green'
                                    variant='outline'
                                    onClick={handleScrollToContact}
                                    size={{ base: 'sm', md: 'md' }}
                                >
                                    {t('contact-btn')}
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
