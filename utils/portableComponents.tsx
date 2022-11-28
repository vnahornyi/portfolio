import { Box, Heading, Text } from '@chakra-ui/react';
import { PortableTextReactComponents } from '@portabletext/react';
import urlBuilder from '@sanity/image-url';
import { getImageDimensions, SanityImageSource } from '@sanity/asset-utils';
import Image from 'next/image';
import client from './client';

const builder = urlBuilder(client);

function urlFor(source: SanityImageSource) {
    return builder.image(source);
}

const ImageComponent = ({ value, isInline }: { value: SanityImageSource, isInline: boolean }) => {
    const { width, height } = getImageDimensions(value);

    return (
        <Box
            rounded='2xl'
            overflow='hidden'
            display='inline-block'
            mx='auto'
            my='5'
        >
            <Image
                style={{ display: isInline ? 'inline-block' : 'block' }}
                src={urlFor(value).width(isInline ? 100 : 800).fit('max').auto('format').url()}
                width={width}
                height={height}
                alt='image'  
            />
        </Box>
    );
}

const portableComponents: Partial<PortableTextReactComponents> = {
    block: {
        h1: ({ children }) => <Heading variant='h1' my='10'>{children}</Heading>,
        h2: ({ children }) => <Heading variant='h2' my='8'>{children}</Heading>,
        h3: ({ children }) => <Heading variant='h3' my='5'>{children}</Heading>,
        normal: ({ children }) => <Text fontSize={{ base: 'md', md: 'lg' }} my='5'>{children}</Text>
    },
    types: {
        image: ImageComponent
    }
};

export default portableComponents;
