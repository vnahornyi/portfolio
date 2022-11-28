import {
    Box,
    Heading,
    Link,
    Text,
    Image,
    useColorModeValue,
} from '@chakra-ui/react';

import { motion, useInView } from 'framer-motion';
import NextLink from 'next/link';
import { useRef } from 'react';

import { IPost } from 'types';
import BlogAuthor from './Card/BlogAuthor';
import BlogTags from './Card/BlogTags';

interface ICardProps extends IPost {
    priority?: boolean;
    index: number;
}

const Card: React.FC<ICardProps> = ({ mainImage, title, categories, slug, description, published, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <Box
            ref={ref}
            as={motion.div}
            initial={{ x: index % 2 !== 0 ? 250 : -250, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1, transition: { delay: 0.2, duration: 1 } } : undefined}
            mt={{ base: 1, sm: 5 }}
            display='flex'
            flexDirection={{ base: 'column', sm: 'row' }}
            justifyContent='space-between'
        >
            <Box
                display='flex'
                flex='1'
                mr='3'
                pos='relative'
                alignItems='center'
            >
                <Box
                    w={{ base: '100%', sm: '85%' }}
                    zIndex='2'
                    ml={{ base: '0', sm: '5%' }}
                    mt='5%'
                >
                    <Link
                        as={NextLink}
                        href={`/blog/${slug}`}
                        textDecoration='none'
                        _hover={{ textDecoration: 'none' }}
                    >
                        <Image
                            rounded='lg'
                            src={mainImage?.src}
                            alt={title}
                            objectFit='contain'
                        />
                    </Link>
                </Box>
                <Box zIndex={1} w='full' pos='absolute' h='full'>
                    <Box
                        bgGradient={useColorModeValue(
                            'radial(orange.600 1px, transparent 1px)',
                            'radial(orange.300 1px, transparent 1px)'
                        )}
                        backgroundSize='20px 20px'
                        opacity='0.4'
                        height='100%'
                    />
                </Box>
            </Box>
            <Box
                display='flex'
                flex='1'
                flexDirection='column'
                justifyContent='center'
                mt={{ base: 3, sm: 0 }}
            >
                <BlogTags tags={categories} />
                <Heading mt='1'>
                    <Link
                        as={NextLink}
                        href={`/blog/${slug}`}
                        textDecoration='none'
                        _hover={{ textDecoration: 'none' }}
                    >
                        {title}
                    </Link>
                </Heading>
                <Text
                    as='p'
                    mt='2'
                    color={useColorModeValue('gray.700', 'gray.200')}
                    fontSize='lg'
                >
                    {description}
                </Text>
                <BlogAuthor date={new Date(published)} />
            </Box>
        </Box>
    );
};

export default Card;
