import { Text, useColorModeValue } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

interface IBitTitleProps {
    text: string;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
}

const BigTitle: React.FC<IBitTitleProps> = ({ text, top, left, right, bottom }) => {
    const { t, lang } = useTranslation('common');
    const fs = `calc(5rem + ${lang === 'en' ? '5vw' : '1vw'})`;

    return (
        <Text
            zIndex={0}
            top={top}
            left={left}
            right={right}
            bottom={bottom}
            fontSize={fs}
            fontWeight='black'
            color={useColorModeValue('blackAlpha.500', 'whiteAlpha.500')}
            pos='absolute'
        >
            {t(text)}
        </Text>
    );
};

export default BigTitle;
