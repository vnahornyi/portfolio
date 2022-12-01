import { Box, chakra } from '@chakra-ui/react';
import { m, useScroll, useSpring, useTransform } from 'framer-motion';
import { ResumeContext } from 'layouts/MainLayout';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

const MotionAvatar = chakra(m.div);

export const StaticImage: React.FC = () => {
    const resume = useContext(ResumeContext);

    return (
        <Box
            rounded='full'
            w='full'
            h='full'
            objectFit='cover'
            objectPosition='center'
            overflow='hidden'
        >
            <Image
                width={resume?.image.width}
                height={resume?.image.height}
                src={resume?.image.src ?? ''}
                blurDataURL={resume?.image.placeholder}
                alt='Vladyslav Nahornyi'
                priority
            />
        </Box>
    );
}

const MyPicture: React.FC = () => {
    const [size, setSize] = useState({ width: 0, height: 0 });
    const { scrollY } = useScroll();
    const springScroll = useSpring(scrollY, {
        damping: 50,
        stiffness: 400
    });
    const animateX = useTransform(
        springScroll,
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
            <StaticImage />
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
            <StaticImage />
        </MotionAvatar>
    );
};

export default MyPicture;
