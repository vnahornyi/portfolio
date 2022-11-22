import { Box, Flex, Heading, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <Flex
            justify='center'
            align='center'
            h='100vh'
            as={motion.section}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            color='white'
        >
            <Stack direction='column' spacing='4'>
                <Heading variant='h2'>
                    Vladyslav Nahornyi
                </Heading>
            </Stack>
        </Flex>
    );
};

export default Hero;
