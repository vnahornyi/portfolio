import { Avatar, HStack, Text } from '@chakra-ui/react';

interface IBlogAuthorProps {
    date: Date;
}

const BlogAuthor: React.FC<IBlogAuthorProps> = ({ date }) => (
    <HStack
        mt='2'
        spacing='2'
        display='flex'
        alignItems='center'
    >
        <Avatar size='lg' src='/images/me.png' name='Vladyslav Nahornyi' />
        <Text fontWeight='medium'>
            Vladyslav Nahornyi
        </Text>
        <Text>-</Text>
        <Text>{date.toLocaleDateString()}</Text>
    </HStack>
);

export default BlogAuthor;
