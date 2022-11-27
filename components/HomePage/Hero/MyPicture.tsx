import { chakra } from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

import me from 'public/images/me.png';
import { useEffect, useState } from 'react';

const MotionAvatar = chakra(motion.div);
const ChackraImage = chakra(Image);

const MyPicture: React.FC = () => {
    const [size, setSize] = useState<{ width: number | null, height: number | null }>({ width: null, height: null });
    const { scrollY } = useScroll();
    const animateX = useTransform(
        scrollY,
        [0, size.height ?? 0],
        [0, (size.width ?? 0) + 250]
    );

    useEffect(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    return (
        <MotionAvatar
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            mt={{ base: 10, lg: 0 }}
            w={{ base: '200px', md: '250px' }}
            h={{ base: '200px', md: '250px' }}
            style={{ x: animateX, rotate: animateX }}
            rounded='full'
        >
            <ChackraImage
                rounded='full'
                w='full'
                h='full'
                objectFit='cover'
                src={me}
                alt='Vladyslav Nahornyi'
                priority
            />
        </MotionAvatar>
    );
};

export default MyPicture;
