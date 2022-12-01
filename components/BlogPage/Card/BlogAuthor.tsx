import { HStack, Text, Box } from '@chakra-ui/react';
import { useContext } from 'react';
import Image from 'next/image';

import { ResumeContext } from 'layouts/MainLayout';

interface IBlogAuthorProps {
    date: Date;
    priority?: boolean;
}

const BlogAuthor: React.FC<IBlogAuthorProps> = ({ date, priority }) => {
    const resume = useContext(ResumeContext);

    return (
        <HStack mt='2' spacing='2' display='flex' alignItems='center'>
            <Box
                rounded='full'
                w='16'
                h='16'
                overflow='hidden'
            >
                <Image
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    src={resume?.image.src ?? ''}
                    width={resume?.image.width}
                    height={resume?.image.height}
                    blurDataURL={resume?.image.placeholder}
                    priority={priority}
                    alt='Vladyslav Nahornyi'
                />
            </Box>
            <Text fontWeight='medium'>Vladyslav Nahornyi</Text>
            <Text>-</Text>
            <Text>{date.toLocaleDateString()}</Text>
        </HStack>
    );
};

export default BlogAuthor;
