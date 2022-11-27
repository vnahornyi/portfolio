import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const ThemePicker = () => {
    const Icon = useColorModeValue(MoonIcon, SunIcon);
    const { toggleColorMode } = useColorMode();

    return (
        <IconButton
            aria-label='toggle theme'
            bg='transparent'
            onClick={toggleColorMode}
            icon={<Icon w={5} h={5} />}
        />
    );
};

export default ThemePicker;
