import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const ThemePicker = () => {
    const Icon = useColorModeValue(MoonIcon, SunIcon);
    const { toggleColorMode } = useColorMode();

    return (
        <IconButton
            aria-label='Toggle theme'
            bg='transparent'
            onClick={toggleColorMode}
            size={{ base: 'sm', md: 'md' }}
            icon={<Icon w={5} h={5} />}
        />
    );
};

export default ThemePicker;
