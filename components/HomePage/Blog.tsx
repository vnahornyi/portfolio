import { Box, Flex, Link, useColorModeValue } from '@chakra-ui/react';
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
            py='20'
            zIndex={1}
        >
            <Flex
                maxW='container.xl'
                w='full'
                h='auto'
                as={motion.div}
                wrap='wrap'
                gap='16'
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
            <Link
                as={NextLink}
                href='/blog'
                mt='16'
                fontWeight='bold'
            >
                See more...
            </Link>
            <Box pt='5'>
                <ScrollToBottomBtn sectionNumber={2} alwaysWhite />
            </Box>
            <BigTitle top='-4.5vw' left='50%' text='BLOG' />
        </Flex>
    );
};

export default Blog;
