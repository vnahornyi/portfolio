import {
    Box,
    Button,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
    Textarea,
    useBoolean,
    useColorModeValue,
    useToast,
    VStack,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';

import { m } from 'framer-motion';
import { MdPhone, MdEmail, MdLocationOn, MdOutlineEmail } from 'react-icons/md';
import { BsGithub, BsInstagram, BsDiscord, BsPerson } from 'react-icons/bs';
import dynamic from 'next/dynamic';
import { RefObject } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

import contactConfig from 'public/data/contact-particles.json';

const Particles = dynamic(() => import('components/UI/Particles'));

interface IContactForm {
    name: string;
    email: string;
    message: string;
}

interface IContactProps {
    contactRef: RefObject<HTMLDivElement>;
}

const Contact: React.FC<IContactProps> = ({ contactRef }) => {
    const { t } = useTranslation('contact');
    const { control, handleSubmit, reset } = useForm<IContactForm>();
    const [isLoading, setLoading] = useBoolean();
    const toast = useToast({ position: 'bottom-right' });

    const onSubmit: SubmitHandler<IContactForm> = async data => {
        setLoading.on();

        try {
            const response = await fetch('/api/message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const { created } = await response.json();

            if (!created) throw new Error();

            toast({
                title: t('success-title'),
                description: t('success-description'),
                status: 'success',
                duration: 3000,
                isClosable: false,
            });
            reset({ name: '', email: '', message: '' });
        } catch {
            toast({
                title: t('error-title'),
                description: t('error-description'),
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading.off();
        }
    };

    return (
        <Container
            ref={contactRef}
            maxW='full'
            pos='relative'
            minH='calc(100vh)'
            mt='0'
            p='4'
            display='flex'
            justifyContent='center'
            alignItems='center'
            centerContent
            overflow='hidden'
        >
            <Flex zIndex={1}>
                <Box
                    bg={useColorModeValue('green.50', 'gray.900')}
                    borderRadius='lg'
                    m={{ sm: 4, md: 16, lg: 10 }}
                    p={{ sm: 5, md: 5, lg: 16 }}
                >
                    <Box p={4}>
                        <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                            <WrapItem>
                                <Box>
                                    <Heading>{t('title')}</Heading>
                                    <Text
                                        mt={{ sm: 3, md: 3, lg: 5 }}
                                        color={useColorModeValue(
                                            'gray.500',
                                            'white'
                                        )}
                                    >
                                        {t('description')}
                                    </Text>
                                    <Box
                                        py={{
                                            base: 5,
                                            sm: 5,
                                            md: 8,
                                            lg: 10,
                                        }}
                                    >
                                        <VStack
                                            pl={0}
                                            spacing={3}
                                            alignItems='flex-start'
                                        >
                                            <Button
                                                as='a'
                                                href='tel:+380968923137'
                                                size='md'
                                                height='48px'
                                                variant='ghost'
                                                leftIcon={
                                                    <MdPhone size='20px' />
                                                }
                                            >
                                                +38-0968923137
                                            </Button>
                                            <Button
                                                as='a'
                                                href='mailto:vnahornyi@outlook.com'
                                                size='md'
                                                height='48px'
                                                variant='ghost'
                                                leftIcon={
                                                    <MdEmail size='20px' />
                                                }
                                            >
                                                vnahornyi@outlook.com
                                            </Button>
                                            <Button
                                                as='a'
                                                href='https://goo.gl/maps/MfbfAfbqoWcGX9eX8'
                                                target='_blank'
                                                rel='noreferrer noopener'
                                                size='md'
                                                height='48px'
                                                variant='ghost'
                                                leftIcon={
                                                    <MdLocationOn size='20px' />
                                                }
                                            >
                                                {t('location')}
                                            </Button>
                                        </VStack>
                                    </Box>
                                    <HStack
                                        mt={{ lg: 10, md: 10 }}
                                        spacing={5}
                                        px={5}
                                        alignItems='flex-start'
                                    >
                                        <IconButton
                                            aria-label='github'
                                            variant='ghost'
                                            size='lg'
                                            isRound={true}
                                            href='https://github.com/vnahornyi'
                                            as='a'
                                            target='_blank'
                                            rel='noreferrer noopener'
                                            icon={<BsGithub size='28px' />}
                                        />
                                        <IconButton
                                            aria-label='instagram'
                                            variant='ghost'
                                            size='lg'
                                            isRound={true}
                                            href='https://www.instagram.com/vlad.nahornyi/'
                                            as='a'
                                            target='_blank'
                                            rel='noreferrer noopener'
                                            icon={<BsInstagram size='28px' />}
                                        />
                                        <IconButton
                                            aria-label='discord'
                                            variant='ghost'
                                            size='lg'
                                            isRound={true}
                                            as='a'
                                            href='https://discordapp.com/users/557977593500925953'
                                            target='_blank'
                                            rel='noreferrer noopener'
                                            icon={<BsDiscord size='28px' />}
                                        />
                                    </HStack>
                                </Box>
                            </WrapItem>
                            <WrapItem w='full'>
                                <Box
                                    bg='white'
                                    w='full'
                                    borderRadius='lg'
                                    dropShadow='2xl'
                                    as='form'
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <Box m={8} color='#0B0E3F'>
                                        <VStack spacing={5}>
                                            <Controller
                                                name='name'
                                                control={control}
                                                render={({ field }) => (
                                                    <FormControl isRequired>
                                                        <FormLabel>
                                                            {t('name')}
                                                        </FormLabel>
                                                        <InputGroup borderColor='#E0E1E7'>
                                                            <InputLeftElement pointerEvents='none'>
                                                                <BsPerson color='gray.800' />
                                                            </InputLeftElement>
                                                            <Input
                                                                type='text'
                                                                size='md'
                                                                {...field}
                                                            />
                                                        </InputGroup>
                                                    </FormControl>
                                                )}
                                            />
                                            <Controller
                                                name='email'
                                                control={control}
                                                render={({ field }) => (
                                                    <FormControl isRequired>
                                                        <FormLabel>
                                                            {t('email')}
                                                        </FormLabel>
                                                        <InputGroup borderColor='#E0E1E7'>
                                                            <InputLeftElement pointerEvents='none'>
                                                                <MdOutlineEmail color='gray.800' />
                                                            </InputLeftElement>
                                                            <Input
                                                                type='email'
                                                                size='md'
                                                                {...field}
                                                            />
                                                        </InputGroup>
                                                    </FormControl>
                                                )}
                                            />
                                            <Controller
                                                name='message'
                                                control={control}
                                                render={({ field }) => (
                                                    <FormControl isRequired>
                                                        <FormLabel>
                                                            {t('message')}
                                                        </FormLabel>
                                                        <Textarea
                                                            borderColor='gray.300'
                                                            {...field}
                                                            _hover={{
                                                                borderRadius:
                                                                    'gray.300',
                                                            }}
                                                            placeholder='message'
                                                        />
                                                    </FormControl>
                                                )}
                                            />
                                            <FormControl float='right'>
                                                <Button
                                                    as={m.button}
                                                    whileHover={{ scale: 1.2 }}
                                                    whileTap={{ scale: 0.8 }}
                                                    variant='solid'
                                                    colorScheme='green'
                                                    type='submit'
                                                    isLoading={isLoading}
                                                >
                                                    {t('send-message-btn')}
                                                </Button>
                                            </FormControl>
                                        </VStack>
                                    </Box>
                                </Box>
                            </WrapItem>
                        </Wrap>
                    </Box>
                </Box>
            </Flex>
            <Particles config={contactConfig} />
        </Container>
    );
};

export default Contact;
