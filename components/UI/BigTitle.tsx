import { Text, useColorModeValue } from '@chakra-ui/react';

interface IBitTitleProps {
    text: string;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
}

const BigTitle: React.FC<IBitTitleProps> = ({ text, top, left, right, bottom }) => {
    return (
        <Text
            zIndex={0}
            top={top}
            left={left}
            right={right}
            bottom={bottom}
            fontSize='calc(5rem + 5vw)'
            fontWeight='black'
            color={useColorModeValue('blackAlpha.500', 'whiteAlpha.500')}
            pos='absolute'
        >
            {text}
        </Text>
    );
};

export default BigTitle;
