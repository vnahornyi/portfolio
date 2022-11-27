import {
    Box,
    Flex,
    Link,
    useBreakpointValue,
    useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import NextLink from 'next/link';

import ScrollToBottomBtn from 'components/UI/ScrollToBottomBtn';
import MiniCard from './Blog/MiniCard';
import BigTitle from 'components/UI/BigTitle';

const Blog: React.FC = () => {
    return (
        <Flex
            direction='column'
            pos='relative'
            align='center'
            justify='center'
            w='full'
            minH='calc(100vh + 20px)'
            overflow='hidden'
            bg={useColorModeValue('green.50', 'gray.900')}
            py={{ base: '16', lg: '20' }}
            px={{ base: '5', lg: '0' }}
            zIndex={1}
        >
            <Flex
                maxW='container.xl'
                w='full'
                h='auto'
                as={motion.div}
                justify='center'
                wrap='wrap'
                gap={{ base: 5, lg: 16 }}
                zIndex={1}
            >
                {new Array(9).fill(0).map((_, idx) => (
                    <MiniCard
                        slug='test'
                        title='Test'
                        description='test'
                        key={idx}
                        delay={idx + 1}
                    />
                ))}
            </Flex>
            <Link as={NextLink} href='/blog' mt='16' fontWeight='bold'>
                See more...
            </Link>
            <Box pt='5'>
                <ScrollToBottomBtn sectionNumber={2} alwaysWhite />
            </Box>
            <BigTitle
                top={useBreakpointValue({ base: '-20px', lg: '0' })}
                left={useBreakpointValue({ base: '5%', lg: '50%' })}
                text='BLOG'
            />
        </Flex>
    );
};

export default Blog;
