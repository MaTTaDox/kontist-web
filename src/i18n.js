import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';

i18n
    .use(XHR)
    .init({
        fallbackLng: 'de',
        debug: false,
        react: {
            wait: false,
            bindI18n: 'languageChanged loaded',
            bindStore: 'added removed',
            nsMode: 'default'
        }
    });

export default i18n;