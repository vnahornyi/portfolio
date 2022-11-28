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
import { PortableTextReactComponents } from '@portabletext/react';
import urlBuilder from '@sanity/image-url';
import { getImageDimensions, SanityImageSource } from '@sanity/asset-utils';
import Image from 'next/image';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import client from './client';

const builder = urlBuilder(client);

function urlFor(source: SanityImageSource) {
    return builder.image(source);
}

const CodeComponent = (props: any) => {
    return (
        <Box maxW='container.md' w='full' overflowX='auto'>
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

    return (
        <Box
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
        h1: ({ children }) => <Heading variant='h1'>{children}</Heading>,
        h2: ({ children }) => <Heading variant='h2'>{children}</Heading>,
        h3: ({ children }) => <Heading variant='h3'>{children}</Heading>,
        h4: ({ children }) => <Heading variant='h4'>{children}</Heading>,
        normal: ({ children }) => (
            <Text fontSize={{ base: 'md', md: 'lg' }}>{children}</Text>
        ),
    },
    types: {
        code: CodeComponent,
        image: ImageComponent,
    },
    marks: {
        code: ({ children }) => <Code colorScheme='yellow'>{children}</Code>,
        link: ({ children, value }) => <Link color='green.400' href={value.href} rel='noreferrer noopener'>{children}</Link>
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
        bullet: ({ children }) => <ListItem>{children}</ListItem>,
        number: ({ children }) => <ListItem>{children}</ListItem>,
    },
};

export default portableComponents;
