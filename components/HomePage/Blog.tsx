import {
    Box,
    Flex,
    Link,
    useBreakpointValue,
    useColorModeValue,
} from '@chakra-ui/react';
import { m } from 'framer-motion';
import NextLink from 'next/link';
import useTranslation from 'next-translate/useTranslation';

import { BLOG } from 'constants/routes';
import { IPost } from 'types';

import JumpingArrow from 'components/UI/JumpingArrow';
import BigTitle from 'components/UI/BigTitle';
import MiniCard from './Blog/MiniCard';

interface IBlogProps {
    posts: IPost[];
}

const Blog: React.FC<IBlogProps> = ({ posts }) => {
    const { t } = useTranslation('common');
    
    if (!posts.length) return null;
    
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
            pt={{ base: '28', md: '44', lg: '52' }}
            px={{ base: '5', lg: '0' }}
            zIndex={1}
        >
            <Flex
                maxW='container.xl'
                w='full'
                h='auto'
                as={m.div}
                justify='center'
                wrap='wrap'
                gap={{ base: 5, lg: 16 }}
                zIndex={1}
            >
                {!!posts.length && posts.map((post, idx) => (
                    <MiniCard
                        {...post}
                        key={post.id}
                        delay={idx + 1}
                    />
                ))}
            </Flex>
            <Link as={NextLink} href={BLOG} mt='16' fontWeight='bold'>
                {t('see-more')}
            </Link>
            <Box pt='5'>
                <JumpingArrow alwaysWhite />
            </Box>
            <BigTitle
                top={useBreakpointValue({ base: '-20px', lg: '0' })}
                left={useBreakpointValue({ base: '5%', lg: '50%' })}
                text='big-title-blog'
            />
        </Flex>
    );
};

export default Blog;
