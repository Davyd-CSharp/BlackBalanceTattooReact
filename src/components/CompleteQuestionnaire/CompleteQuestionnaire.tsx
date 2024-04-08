import React, { useEffect, useState } from "react";
import './CompleteQuestionnaire.css';
import { useSelector } from "react-redux";
import { usePostQuestionnaire } from "../../services/Questionnaire/QuestionnaireService"
import { RootState } from "../../stores";
//@ts-ignore
import Error from "../../assets/images/error.png";
//@ts-ignore
import Success from "../../assets/images/success.png";
import { useTranslation } from "react-i18next";
import { UsePostQuestionnaireProps } from "../../services/Questionnaire/QuestionnaireTypes";
import { CircularProgress } from "@mui/material";

const CompleteQuestionnaire = () => {
    const completedQuestionnaire = useSelector(( state: RootState ) => state.questionnaire.CompletedQuestionnaire);
    const currentUser = useSelector(( state: RootState ) => state.user.CurrentUser);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const { t } = useTranslation();

    const result = usePostQuestionnaire({
        identifier: currentUser.PassportSeries,
        name: currentUser.Name,
        birthday: currentUser.Birthday,
        gender: currentUser.Gender,
        phoneNumber: currentUser.PhoneNumber,        
        email: currentUser.Email,
        isEmailNewsletterEnable: currentUser.IsEmailNewsletterEnable,
        isPhoneNewsletterEnable: currentUser.IsPhoneNewsletterEnable,
        country: currentUser.Country,
        city: currentUser.City,
        questionnaireId: completedQuestionnaire.QuestionnaireId,
        questionnaireAnswers: completedQuestionnaire.CompletedQuestions
            .map(item => {
                return {
                    QuestionId: item.QuestionId,
                    AnswerId: item.AnswerType == 1 ? item.AnswerId : null,
                    CustomeText: item.Value
                }
            }),
        isProcedureExecutionAccepted: currentUser.IsProcedureExecutionAccepted,
        referralSource: currentUser.ReferralSource
    } as UsePostQuestionnaireProps);

    useEffect(() => {
        setIsSuccess(!completedQuestionnaire.CompletedQuestions.some(item => !item.IsCorrect));
    }, [completedQuestionnaire, currentUser])

    useEffect(() => {
        result.fetchData();
    }, [])

    return (
        <div className="complete-questionnaire">
            {result.isLoading ? 
                <CircularProgress /> : 
                <>
                    <div className="icon-info">
                        <img
                            className="icon"
                            src={(result.error.length == 0 && isSuccess) ? Success : Error}
                        />
                    </div>
                    <div className="complete-information">
                        <h1>{(result.error.length == 0 && isSuccess) ? t("successCompleteInformationHeader") : t("failedCompleteInformationHeader")}</h1>
                        <p>{(result.error.length == 0 && isSuccess) ? t("successCompleteInformationParagraph") : t("failedCompleteInformationParagraph")}</p>
                    </div>
                </>
            }
        </div>
    );
}

export default CompleteQuestionnaire;