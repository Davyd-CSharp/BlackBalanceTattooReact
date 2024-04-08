import React, { useEffect, useState } from "react";
import './Questionnaire.css';
//@ts-ignore
import Logo  from '../../assets/images/Logo.png';
import { SelectChangeEvent, Step, StepLabel, Stepper } from "@mui/material";
import PrimaryData from "../../components/PrimaryData/PrimaryData";
import MySelect from "../../UI/MySelect/MySelect";
import Questions from "../../components/Questions/Questions";
import AdditionalInformation from "../../components/AdditionalInformation/AdditionalInformation";
import { useGetLanguages } from "../../services/PrimaryData/PrimaryDataService";
import { useTranslation } from "react-i18next";
import CompleteQuestionnaire from "../../components/CompleteQuestionnaire/CompleteQuestionnaire";
import type { SelectOption } from "../../UI/MySelect/MySelect";

const Questionnaire = () => {
    const { response } = useGetLanguages();
    const { t, i18n  } = useTranslation();

    const [languageOptions, setLanguageOptions] = useState<SelectOption[]>();
    const [language, setLanguage] = useState<number>(0);
    const [step, setStep] = useState(0);
    
    const handleChangingLanguage = (e: SelectChangeEvent) => {
        var currentLanguage = languageOptions?.find(c => c.Value == e.target.value);
        if(!currentLanguage) {
            return;
        }

        i18n.changeLanguage(currentLanguage.Label.toLowerCase());
        setLanguage(Number(currentLanguage.Value));
    }

    const renderPage = () => {
        switch(step) {
            case 0:
                return <PrimaryData 
                    setNextPage={setStep}
                    step={0}
                    chooseLanguage={language}
                />

            case 1: 
                return <Questions 
                    setNextPage={setStep}
                    step={1}
                    chooseLanguage={language}
                />
            
            case 2: 
                return <AdditionalInformation 
                    setNextPage={setStep}
                    step={2}
                />
            case 3: 
                return <CompleteQuestionnaire />
             
        }
    }

    useEffect(() => {
        const defaultSelectValue = 0;
        if(response) {
            setLanguageOptions(
                response
                .Values
                .map(c => {
                    return {
                        Value: c.Value
                            .toString(),
                        Label: c.Name,
                        Default: c.Value == defaultSelectValue ? true : false
                    };
                }));

            const defaultSelect = response.Values
                .find(c => {
                    return c.Value == defaultSelectValue
                });
            setLanguage(defaultSelect ? defaultSelect.Value : 0);
        }
    }, [response]) 

    return(
        <div className="questionnaire-page">
            <div className="questionnaire">
                <div className="logo-and-language">
                    <img
                        className="logo"
                        src={Logo}
                    />                    
                </div>     
                <div className="language-selector">
                        <MySelect                     
                            onChange={handleChangingLanguage} 
                            options={languageOptions}
                            label=""
                            fullWidth  
                            disabled={step != 0}                 
                        />                    
                    </div>   
                <div className="questionnaire-progress">
                    <Stepper
                        activeStep={step}
                        alternativeLabel
                        className="questionnaire-progress-stepper"
                    >
                        <Step 
                            className="step">
                            <StepLabel>{t("primaryData")}</StepLabel>
                        </Step>                    
                        <Step className="step">  
                            <StepLabel>{t("questionnaire")}</StepLabel>
                        </Step>                    
                        <Step className="step">
                            <StepLabel>{t("additionalInformation")}</StepLabel>
                        </Step>
                    </Stepper>
                </div>
                {
                    renderPage()
                }
            </div>    
        </div>
    );
}

export default Questionnaire;