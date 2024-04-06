import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';


export const primaryDataValidationSchema = () => {
    
    return Yup.object().shape({
        Passport: Yup.string()
            .required("Required"),
        Name: Yup.string()
            .required("Required"),
        Birthday: Yup.date()
            .required("Required"),
        Email: Yup.string()
            .email()
            .required("Required"),
        PhoneNumber: Yup.string()
            .max(12)
            .min(9),
        Country: Yup.string()
            .required("Required"),
        City: Yup.string()
            .required("Required")
    }) 
};