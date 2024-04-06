import useAxios from "../../hooks/useAxios";
import { PagedList } from "../Shared/SharedTypes";
import { QuestionnaireDTO, QuestionnaireDetailDTO, UseGetQuestionnaireByIdProps, UseGetQuestionnairesByLanguageProps, UsePostQuestionnaireProps } from "./QuestionnaireTypes";

const useGetQuestionnairesByLanguage = ({
    Language
} : UseGetQuestionnairesByLanguageProps) => {
    const response = useAxios<PagedList<QuestionnaireDTO>>({
        url: `api/Questionnaires?Language=${Language}`,
        method: "get",
        body: {},
        headers: {},
        executeImmediate: true
    })    

    return response;
} 

const useGetQuestionnaireById = ({
    QuestionnaireId
} : UseGetQuestionnaireByIdProps) => {
    const response = useAxios<QuestionnaireDetailDTO>({
        url: `api/Questionnaires/Detail?QuestionnaireId=${QuestionnaireId}`,
        method: "get",
        body: {},
        headers: {},
        executeImmediate: false
    })    

    return response;
} 

const usePostQuestionnaire = ({
    identifier,
    birthday,
    name,    
    gender,
    phoneNumber,
    email,
    isEmailNewsletterEnable,
    isPhoneNewsletterEnable,
    country,
    city,
    questionnaireId,
    questionnaireAnswers,
    description,
    isProcedureExecutionAccepted,
    referralSource
} : UsePostQuestionnaireProps) => {
    const response = useAxios<string>({
        method: "post",
        url: "api/User/CompleteQuestionnaire",
        headers: {},
        body: {
            Identifier: identifier,
            Name: name,  
            Birthday: birthday,
            Gender: gender,
            PhoneNumber: phoneNumber,
            Email: email,
            IsEmailNewsletterEnable: isEmailNewsletterEnable,
            IsPhoneNewsletterEnable: isPhoneNewsletterEnable,
            Country: country,
            City: city,
            QuestionnaireId: questionnaireId,
            QuestionnaireAnswers: questionnaireAnswers,
            Description: description,
            IsProcedureExecutionAccepted: isProcedureExecutionAccepted,
            ReferralSource: referralSource  
        },
        executeImmediate: false
    });

    console.log("Respoise: ", response)
    return response;
}

export { useGetQuestionnairesByLanguage, useGetQuestionnaireById, usePostQuestionnaire };