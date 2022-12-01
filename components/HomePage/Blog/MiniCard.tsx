import {
    Card,
    CardBody,
    CardHeader,
    Heading,
    Link,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
} from '@chakra-ui/react';

import NextLink from 'next/link';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { IPost } from 'types';
import { POST } from 'constants/routes';

interface IMiniCardProps extends IPost {
    delay?: number;
}

const MiniCard: React.FC<IMiniCardProps> = ({
    title,
    description,
    slug,
    delay,
}) => {
    const { t } = useTranslation('common');
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });
    const customDelay = useBreakpointValue({ base: 0, lg: delay });

    return (
        <Card
            ref={ref}
            maxW={{ base: 'sm', md: 'xs', lg: 'sm' }}
            w='full'
            opacity={isInView ? 1 : 0}
            transform={isInView ? 'none' : 'translateY(150px)'}
            transition={`all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                0.3 * (customDelay ?? 0)
            }s`}
            bg={useColorModeValue('white', 'gray.800')}
        >
            <CardHeader>
                <Heading variant='h3' fontSize='2xl'>
                    {title}
                </Heading>
            </CardHeader>
            <CardBody>
                <Stack spacing={4}>
                    <Text>{description}</Text>
                    <Link
                        as={NextLink}
                        href={POST.replace('[slug]', slug)}
                        color={useColorModeValue('green.400', 'white')}
                        fontWeight='bold'
                    >
                        {t('read-more')}
                    </Link>
                </Stack>
            </CardBody>
        </Card>
    );
};

export default MiniCard;
