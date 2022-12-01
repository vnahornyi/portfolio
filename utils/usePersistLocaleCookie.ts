import { useRouter } from 'next/router';
import { useEffect } from 'react';

const usePersistLocaleCookie = () => {
    const { locale, defaultLocale } = useRouter();

    useEffect(() => {
        if (locale !== defaultLocale) {
            const date = new Date();
            const expireMs = 100 * 24 * 60 * 60 * 1000;

            date.setTime(date.getTime() + expireMs);
            document.cookie = `NEXT_LOCALE=${locale};expires=${date.toUTCString()};path=/`; 
            return;
        }

        document.cookie = '';
    }, [locale, defaultLocale]);
}

export default usePersistLocaleCookie;
