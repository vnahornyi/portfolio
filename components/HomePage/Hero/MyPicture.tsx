import { Avatar, chakra } from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MotionAvatar = chakra(motion.div);

const MyPicture: React.FC = () => {
    const { scrollY } = useScroll();
    const animateX = useTransform(
        scrollY,
        [0, window.innerHeight],
        [0, window.innerWidth + 250]
    );

    return (
        <MotionAvatar
            w='250px'
            h='250px'
            style={{ x: animateX, rotate: animateX }}
        >
            <Avatar
                size='full'
                src={'/images/me.png'}
                name='Vladyslav Nahornyi'
            />
        </MotionAvatar>
    );
};

export default MyPicture;
