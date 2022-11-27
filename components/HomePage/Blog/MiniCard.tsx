import {
    Card,
    CardBody, 
    CardHeader,
    Heading,
    Link,
    Stack,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface IMiniCardProps {
    title: string;
    description: string;
    slug: string;
    delay?: number;
}

const MiniCard: React.FC<IMiniCardProps> = ({ title, description, slug, delay }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    const handleOpenLink: React.MouseEventHandler = (event) => {
        event?.preventDefault();

        console.log('clicked', slug);
    }

    return (
        <Card
            ref={ref}
            maxW={{ base: 'sm', md: 'xs', lg: 'sm' }}
            w='full'
            opacity={isInView ? 1 : 0}
            transform={isInView ? 'none' : 'translateY(150px)'}
            transition={`all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.3 * (delay ?? 0)}s`}
            bg={useColorModeValue('white', 'gray.800')}
        >
            <CardHeader>
                <Heading variant='h3' fontSize='2xl'>
                    {title}
                </Heading>
            </CardHeader>
            <CardBody>
                <Stack spacing={4}>
                    <Text>
                        {description}
                    </Text>
                    <Link
                        href={`/blog/${slug}`}
                        onClick={handleOpenLink}
                        color={useColorModeValue('green.400', 'white')}
                        fontWeight='bold'
                    >
                        Read more...
                    </Link>
                </Stack>
            </CardBody>
        </Card>
    );
}

export default MiniCard;
