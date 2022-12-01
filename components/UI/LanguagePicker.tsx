import useTraslation from 'next-translate/useTranslation';
import setLanguage from 'next-translate/setLanguage';
import { IconButton, useColorModeValue } from '@chakra-ui/react';
import { MdLanguage } from 'react-icons/md';

const LanguagePicker: React.FC = () => {
    const { lang } = useTraslation();

    const toggleLang = async () => {
        await setLanguage(lang === 'en' ? 'uk' : 'en', false);
        scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    };

    return (
        <IconButton
            aria-label='Toggle language'
            onClick={toggleLang}
            bg='transparent'
            size={{ base: 'sm', md: 'md' }}
            icon={<MdLanguage size={22} color={useColorModeValue('black', 'white')} />}
        />
    );
};

export default LanguagePicker;
