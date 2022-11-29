import {
    useAnimationFrame,
    useMotionValue,
    useScroll,
    useTransform,
    useVelocity,
    m,
} from 'framer-motion';

import { wrap } from '@motionone/utils';
import { useRef } from 'react';
import { Flex, Text } from '@chakra-ui/react';

interface IParalaxTextProps {
    words: string[];
    baseVelocity?: number;
}

const MotionFlex = m(Flex);

const ParalaxText: React.FC<IParalaxTextProps> = ({
    words,
    baseVelocity = 100,
}) => {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const velocityFactor = useTransform(scrollVelocity, [0, 1000], [0, 5], {
        clamp: false,
    });

    const x = useTransform(baseX, v => `${wrap(-20, 20, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <Flex
            overflow='hidden'
            whiteSpace='nowrap'
            flexWrap='wrap'
            justify='center'
            letterSpacing='-2px'
            lineHeight={0.8}
            w='full'
            zIndex={1}
        >
            <MotionFlex
                as={m.div}
                mx='auto'
                fontWeight='600'
                textTransform='uppercase'
                fontSize={{ base: '32px', md: '64px' }}
                style={{ x }}
            >
                {words.map((word, idx) => (
                    <Text
                        as='span'
                        mr='30px'
                        display='block'
                        key={`${word}_${idx}`}
                    >
                        {word}
                    </Text>
                ))}
            </MotionFlex>
        </Flex>
    );
};

export default ParalaxText;
