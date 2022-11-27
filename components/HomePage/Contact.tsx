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
    useBreakpointValue,
    useColorModeValue,
    VStack,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';

import { MdPhone, MdEmail, MdLocationOn, MdOutlineEmail } from 'react-icons/md';
import { BsGithub, BsInstagram, BsDiscord, BsPerson } from 'react-icons/bs';
import dynamic from 'next/dynamic';

import contactConfig from 'public/data/contact-particles.json';
import BigTitle from 'components/UI/BigTitle';

const Particles = dynamic(() => import('components/UI/Particles'));

const Contact: React.FC = () => {
    return (
        <Container
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
                                    <Heading>Contact</Heading>
                                    <Text
                                        mt={{ sm: 3, md: 3, lg: 5 }}
                                        color={useColorModeValue(
                                            'gray.500',
                                            'white'
                                        )}
                                    >
                                        Fill up the form below to contact
                                    </Text>
                                    <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
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
                                                Vinnytsia, Ukraine
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
                                            icon={<BsGithub size='28px' />}
                                        />
                                        <IconButton
                                            aria-label='github'
                                            variant='ghost'
                                            size='lg'
                                            isRound={true}
                                            icon={<BsInstagram size='28px' />}
                                        />
                                        <IconButton
                                            aria-label='github'
                                            variant='ghost'
                                            size='lg'
                                            isRound={true}
                                            icon={<BsDiscord size='28px' />}
                                        />
                                    </HStack>
                                </Box>
                            </WrapItem>
                            <WrapItem w='full'>
                                <Box bg='white' w='full' borderRadius='lg'>
                                    <Box m={8} color='#0B0E3F'>
                                        <VStack spacing={5}>
                                            <FormControl id='name'>
                                                <FormLabel>Your Name</FormLabel>
                                                <InputGroup borderColor='#E0E1E7'>
                                                    <InputLeftElement pointerEvents='none'>
                                                        <BsPerson color='gray.800' />
                                                    </InputLeftElement>
                                                    <Input
                                                        type='text'
                                                        size='md'
                                                    />
                                                </InputGroup>
                                            </FormControl>
                                            <FormControl id='email'>
                                                <FormLabel>Mail</FormLabel>
                                                <InputGroup borderColor='#E0E1E7'>
                                                    <InputLeftElement pointerEvents='none'>
                                                        <MdOutlineEmail color='gray.800' />
                                                    </InputLeftElement>
                                                    <Input
                                                        type='text'
                                                        size='md'
                                                    />
                                                </InputGroup>
                                            </FormControl>
                                            <FormControl id='message'>
                                                <FormLabel>Message</FormLabel>
                                                <Textarea
                                                    borderColor='gray.300'
                                                    _hover={{
                                                        borderRadius:
                                                            'gray.300',
                                                    }}
                                                    placeholder='message'
                                                />
                                            </FormControl>
                                            <FormControl
                                                id='name'
                                                float='right'
                                            >
                                                <Button
                                                    variant='solid'
                                                    colorScheme='green'
                                                >
                                                    Send Message
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
            <BigTitle
                bottom={useBreakpointValue({ base: '-20px', lg: '0' })}
                right={useBreakpointValue({ base: '5%', lg: '50%' })}
                text='CONTACT'
            />
            <Particles config={contactConfig} />
        </Container>
    );
};

export default Contact;
