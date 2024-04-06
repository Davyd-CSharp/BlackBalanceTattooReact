import React, { useEffect, useState } from "react";
import './PrimaryData.css';
import { DatePicker } from "@mui/x-date-pickers";
import MyInput from "../../UI/MyInput/MyInput";
import MyCheckbox from "../../UI/MyCheckbox/MyCheckbox";
import MySelect, { SelectOption } from "../../UI/MySelect/MySelect";
import MyButton from "../../UI/MyButton/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { setPrimaryData } from '../../stores/slicers/user'
import { useGetGenders, useGetUserDetailByIdentifier } from "../../services/PrimaryData/PrimaryDataService";
import { useTranslation } from "react-i18next";
import dayjs from 'dayjs';
import { RootState } from "../../stores";
import { Formik } from "formik";
import { primaryDataValidationSchema } from "../../utils/validations/primaryDataValidationSchema";
import { init } from "i18next";

interface PrimaryDataProps {
    setNextPage: (value: number) => void,
    step: number,
    chooseLanguage: number
}

interface InitialValues {
    Passport: string,
    Birthday: Date,
    Name: string,
    PhoneNumber: string,
    Email: string,
    Country: string,
    City: string,
    Gender: number,
    IsEmailNewsletterEnable: boolean,
    IsPhoneNewsletterEnable: boolean
}

const PrimaryData = ({
    setNextPage,
    step,
    chooseLanguage
} : PrimaryDataProps) => {    
    const { response } = useGetGenders();

    const currentUser = useSelector((state: RootState) => state.user.CurrentUser);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [initialValues, setInitialValues] = useState<InitialValues>({} as InitialValues); 
    const [valuesErrors, setValuesErrors] = useState<InitialValues>({} as InitialValues); 
    const [genderOptions, setGenderOptions] = useState<SelectOption[]>(); 
    const userDetail = useGetUserDetailByIdentifier({
        Identifier: initialValues.Passport
    })
    
    const setNextStep = () => {
        if(!validateInputs()) {
            console.log("AAAAAA: ", valuesErrors);
            return;
        }
        
        dispatch(setPrimaryData({
            PassportSeries: initialValues.Passport,
            Name: initialValues.Name,
            Birthday: initialValues.Birthday,
            Gender: initialValues.Gender,
            Email: initialValues.Email,
            PhoneNumber: initialValues.PhoneNumber,
            IsEmailNewsletterEnable: initialValues.IsEmailNewsletterEnable,
            IsPhoneNewsletterEnable: initialValues.IsPhoneNewsletterEnable,
            Country: initialValues.Country,
            City: initialValues.City
        }));        
        setNextPage(step + 1);
    }
    useEffect(() => {        
        if(response) {
            setGenderOptions(
                response.Values
                    .map(c => {
                        const translateLabel = t(c.Name.toLowerCase());
                        return {
                            Value: c.Value.toString(),
                            Label: translateLabel,
                            Default: initialValues.Gender == c.Value                        
                        };
            }));
        }
    }, [response, currentUser, chooseLanguage])

    useEffect(() => {
        setInitialValues({
            ...currentUser,          
            Passport: currentUser.PassportSeries,
            IsPhoneNewsletterEnable: currentUser.IsPhoneNewsletterEnable
        });
    }, [currentUser]);

    const handleOnBlurPassportInput = async () => {
        await userDetail.fetchData();
        setValuesErrors({} as InitialValues);
    }

    useEffect(() => {
        if(userDetail.response)
        {
            setInitialValues({
                ...userDetail.response,          
                Passport: initialValues.Passport,
                IsPhoneNewsletterEnable: userDetail.response.IsPhoneNewsletterEnable,
                IsEmailNewsletterEnable: userDetail.response.IsEmailNewsletterEnable
            });
        }
    }, [userDetail.response])

    const validateInputs = () => {
        setValuesErrors({} as InitialValues);
        let isValid = true;
        if(!initialValues.Passport.trim()) {
            setValuesErrors(prev => ({
                ...prev,
                Passport: t("required")
            }));
            isValid = false;
        }

        if(!initialValues.Name.trim()) {
            setValuesErrors(prev => ({
                ...prev,
                Name: t("required")
            }));
            isValid = false;
        }

        if(!initialValues.Email.trim()) {
            setValuesErrors(prev => ({
                ...prev,
                Email: t("required")
            }));
            isValid = false;
        }

        const emailRegex: RegExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/; 
        if(!emailRegex.test(initialValues.Email)) {
            setValuesErrors(prev => ({
                ...prev,
                Email: t("invalidEmail")
            }));
            isValid = false;
        }

        if(initialValues.PhoneNumber.length > 0 && (
            initialValues.PhoneNumber.length < 9 ||
            initialValues.PhoneNumber.length > 12
        )) {
            setValuesErrors(prev => ({
                ...prev,
                PhoneNumber: t("invalidPhoneNumber")
            }));
            isValid = false;
        }
        
        if(!initialValues.Country.trim()) {
            setValuesErrors(prev => ({
                ...prev,
                Country: t("required")
            }));
            isValid = false;
        }
        
        if(!initialValues.City.trim()) {
            setValuesErrors(prev => ({
                ...prev,
                City: t("required")
            }));
            isValid = false;
        }

        return isValid;
    }

    return(
        <div className="questionnaire-primary-data">
            <MyInput 
                error={valuesErrors.Passport?.trim() ? true : false}
                label={t("identifier")}
                onChange={e => {
                    setInitialValues({
                        ...initialValues,
                        Passport: e.target.value,
                    })
                }}
                onBlur={handleOnBlurPassportInput}
                text={initialValues.Passport}
                required
                helperText={valuesErrors.Passport}
                />
            <DatePicker 
                className="data-picker-full-width"
                //@ts-ignore
                value={initialValues.Birthday ? dayjs(initialValues!.Birthday) : dayjs(new Date()) }
                onChange={value => {
                    setInitialValues({
                        ...initialValues,
                        //@ts-ignore
                        Birthday: value ?? dayjs(new Date()),
                    })
                }}
                format="DD.MM.YYYY"
            />
            <MyInput 
                helperText={valuesErrors.Name}
                error={valuesErrors.Name?.trim() ? true : false}
                label={t("nameAndSurname")}
                onChange={e => {
                    setInitialValues({
                        ...initialValues,
                        Name: e.target.value,
                    })
                }}
                text={initialValues.Name}
                required />
            <MySelect 
                fullWidth                
                label={t("gender")}
                options={genderOptions}
                onChange={e => {
                    setInitialValues({
                        ...initialValues,
                        Gender: Number(e.target.value),
                    })
                }}
            />            
            <MyInput 
                helperText={valuesErrors.PhoneNumber}
                error={valuesErrors.PhoneNumber?.trim() ? true : false}
                label={t("phoneNumber")}
                text={initialValues.PhoneNumber}
                onChange={e => {
                    setInitialValues({
                        ...initialValues,
                        PhoneNumber: e.target.value,
                    })
                }} 
                required={false}/>
            <MyInput 
                helperText={valuesErrors.Email}
                error={valuesErrors.Email?.trim() ? true : false}
                label={t("email")}
                text={initialValues.Email}
                onChange={e => {
                    setInitialValues({
                        ...initialValues,
                        Email: e.target.value,
                    })
                }}
                required />
                
            <div className="country-and-city">
                <MyInput 
                    error={valuesErrors.Country?.trim() ? true : false}
                    helperText={valuesErrors.Country}
                    label={t("country")}
                    text={initialValues.Country}
                    className="left-input" 
                    onChange={e => {
                    setInitialValues({
                        ...initialValues,
                        Country: e.target.value,
                    })
                }}
                    variant="outlined"
                    required />
                <MyInput 
                    helperText={valuesErrors.City}
                    error={valuesErrors.City?.trim() ? true : false}
                    label={t("city")}
                    text={initialValues.City}
                    className="right-input" 
                    onChange={e => {
                        setInitialValues({
                            ...initialValues,
                            City: e.target.value,
                        })
                    }}
                    variant="outlined"
                    required />
            </div>   

            <MyCheckbox 
                label={t("acceptEmailNewsletter")}
                isChecked={initialValues.IsEmailNewsletterEnable}
                onChange={e => {
                    setInitialValues({
                        ...initialValues,
                        IsEmailNewsletterEnable: e.target.checked,
                    })
                }}
            />

            <MyCheckbox 
                label={t("acceptPhoneNewsletter")}
                isChecked={initialValues.IsPhoneNewsletterEnable}
                onChange={e => {
                    setInitialValues({
                        ...initialValues,
                        IsPhoneNewsletterEnable: e.target.checked,
                    })
                }}
            />  

            <MyButton
                label={t("continue")}
                variant="contained" 
                className="questionnaire-primary-data-button"     
                onClick={setNextStep}        
            />
        </div>
    );
} 

export default PrimaryData;