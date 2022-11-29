import { HStack, Text, chakra } from '@chakra-ui/react';
import Image from 'next/image';
import me from 'public/images/me.png';

const ChakraImage = chakra(Image);

interface IBlogAuthorProps {
    date: Date;
    priority?: boolean;
}

const BlogAuthor: React.FC<IBlogAuthorProps> = ({ date, priority }) => (
    <HStack mt='2' spacing='2' display='flex' alignItems='center'>
        <ChakraImage
            rounded='full'
            src={me}
            alt='Vladyslav Nahornyi'
            w='16'
            h='16'
            objectFit='cover'
            priority={priority}
        />
        <Text fontWeight='medium'>Vladyslav Nahornyi</Text>
        <Text>-</Text>
        <Text>{date.toLocaleDateString()}</Text>
    </HStack>
);

export default BlogAuthor;
