import { Box, chakra } from '@chakra-ui/react';
import { m, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

import me from 'public/images/me.png';
import { useEffect, useState } from 'react';

const MotionAvatar = chakra(m.div);
const ChackraImage = chakra(Image);

const renderImage = () => (
    <ChackraImage
        rounded='full'
        w='full'
        h='full'
        objectFit='cover'
        src={me}
        alt='Vladyslav Nahornyi'
        priority
    />
);

const MyPicture: React.FC = () => {
    const [size, setSize] = useState({ width: 0, height: 0 });
    const { scrollY } = useScroll();
    const animateX = useTransform(
        scrollY,
        [0, size.height ?? 0],
        [0, (size.width ?? 0) + 250]
    );

    useEffect(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    if (size.width === 0 || size.height === 0) return (
        <Box
            mt={{ base: 10, lg: 0 }}
            w={{ base: '200px', md: '250px' }}
            h={{ base: '200px', md: '250px' }}
            rounded='full'
        >
            {renderImage()}
        </Box>
    );

    return (
        <MotionAvatar
            mt={{ base: 10, lg: 0 }}
            w={{ base: '200px', md: '250px' }}
            h={{ base: '200px', md: '250px' }}
            style={{ x: animateX, rotate: animateX }}
            rounded='full'
        >
            {renderImage()}
        </MotionAvatar>
    );
};

export default MyPicture;
