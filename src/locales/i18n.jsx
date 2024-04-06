import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from './en.json';
import pl from './pl.json';
import ua from './ua.json';

const resources = {
    eng: {
        translation: en
    },
    pl: {
        translation: pl
    },
    ua: {
        translation: ua
    }
};

const interpolation = {
    escapeValue: false
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "pl",
        interpolation
    });

export default i18n;