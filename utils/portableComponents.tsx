/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Box,
    Heading,
    Text,
    Code,
    UnorderedList,
    ListItem,
    OrderedList,
    Link,
} from '@chakra-ui/react';

import { m, Variants, useInView } from 'framer-motion';
import { PortableTextReactComponents } from '@portabletext/react';
import urlBuilder from '@sanity/image-url';
import { getImageDimensions, SanityImageSource } from '@sanity/asset-utils';
import Image from 'next/image';
import { useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import client from './client';

const builder = urlBuilder(client);

function urlFor(source: SanityImageSource) {
    return builder.image(source);
}

const useAnimation = () => {
    const ref = useRef<any>(null);
    const isInView = useInView(ref, { once: true });

    return { ref, variants, initial: 'initial', animate: isInView ? 'animate' : undefined };
}

const CodeComponent = (props: any) => {
    const animationProps = useAnimation();

    return (
        <Box
            {...animationProps}
            as={m.div}
            maxW='container.md'
            w='full'
            overflowX='auto'
        >
            <SyntaxHighlighter language={props.value.language}>
                {props.value.code}
            </SyntaxHighlighter>
        </Box>
    );
};

const ImageComponent = ({
    value,
    isInline,
}: {
    value: SanityImageSource;
    isInline: boolean;
}) => {
    const { width, height } = getImageDimensions(value);
    const animationProps = useAnimation();

    return (
        <Box
            {...animationProps}
            as={m.div}
            rounded='2xl'
            overflow='hidden'
            display='inline-block'
            mx='auto'
            my='5'
            shadow='2xl'
        >
            <Image
                style={{ display: isInline ? 'inline-block' : 'block' }}
                src={urlFor(value)
                    .width(isInline ? 100 : 800)
                    .fit('max')
                    .auto('format')
                    .url()}
                width={width}
                height={height}
                alt='image'
            />
        </Box>
    );
};

const portableComponents: Partial<PortableTextReactComponents> = {
    block: {
        h1: ({ children }) => {
            const animationProps = useAnimation();

            return <Heading {...animationProps} as={m.h1} variant='h1'>{children}</Heading>
        },
        h2: ({ children }) => {
            const animationProps = useAnimation();

            return <Heading {...animationProps} as={m.h2} variant='h2'>{children}</Heading>
        },
        h3: ({ children }) => {
            const animationProps = useAnimation();

            return <Heading {...animationProps} as={m.h3} variant='h4'>{children}</Heading>
        },
        h4: ({ children }) => {
            const animationProps = useAnimation();

            return <Heading {...animationProps} as={m.h4} variant='h4'>{children}</Heading>
        },
        normal: ({ children }) => {
            const animationProps = useAnimation();

            return <Text {...animationProps} as={m.p} fontSize={{ base: 'md', md: 'lg' }}>{children}</Text>;
        },
    },
    types: {
        code: CodeComponent,
        image: ImageComponent,
    },
    marks: {
        code: ({ children }) => <Code colorScheme='yellow'>{children}</Code>,
        link: ({ children, value }) => (
            <Link color='green.400' href={value.href} rel='noreferrer noopener'>
                {children}
            </Link>
        ),
    },
    list: {
        bullet: ({ children }) => (
            <UnorderedList spacing='3' pl='5'>
                {children}
            </UnorderedList>
        ),
        number: ({ children }) => (
            <OrderedList spacing='3' pl='5'>
                {children}
            </OrderedList>
        ),
    },
    listItem: {
        bullet: ({ children }) => {
            const animationProps = useAnimation();

            return <ListItem {...animationProps} as={m.ul}>{children}</ListItem>
        },
        number: ({ children }) => {
            const animationProps = useAnimation();

            return <ListItem {...animationProps} as={m.ol}>{children}</ListItem>
        },
    },
};

const variants: Variants = {
    initial: { y: 150, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.4 } },
};

export default portableComponents;
