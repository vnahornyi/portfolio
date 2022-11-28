import { HStack, SpaceProps, Tag } from '@chakra-ui/react';

interface IBlogTags {
    tags: string[];
    marginTop?: SpaceProps['marginTop'];
}

const BlogTags: React.FC<IBlogTags> = ({ tags, marginTop }) => (
    <HStack spacing={2} mt={marginTop}>
        {tags.map(tag => (
            <Tag size='md' variant='solid' colorScheme='orange' key={tag}>
                {tag}
            </Tag>
        ))}
    </HStack>
);

export default BlogTags;
