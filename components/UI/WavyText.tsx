import { Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { motion, Variants } from 'framer-motion';

interface IWavyTextProps {
    text: string;
    delay?: number;
    duration?: number;
    onAnimationComplete?: () => void;
}

const WavyText: React.FC<IWavyTextProps> = ({
    text,
    delay = 0,
    duration = 0,
    ...props
}) => {
    const letters = Array.from(text);

    const container: Variants = {
        hidden: {
            opacity: 0
        },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: duration, delayChildren: i * delay }
        })
    };

    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 200
            }
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 200
            }
        }
    };

    return (
        <Heading
            as={motion.h1}
            variant='h1'
            fontSize={{ base: 'xl', md: '3xl' }}
            display='flex'
            overflow='hidden'
            initial='hidden'
            animate='visible'
            color={useColorModeValue('black', 'white')}
            variants={container}
            {...props}
        >
            {letters.map((letter, idx) => (
                <Text
                    as={motion.span}
                    key={idx}
                    _hover={{ color: 'green.400' }}
                    variants={child}
                    whileHover={{
                        scaleX: 1.2,
                        scaleY: 0.8,
                        transition: { duration: 0.1 }
                    }}
                >
                    {letter === ' ' ? '\u00A0' : letter}
                </Text>
            ))}
        </Heading>
    );
};

export default WavyText;
