export interface QuestionnaireDTO {
    QuestionnaireId: string,
    Name: string,
    Language: number
}

export interface QuestionnaireDetailDTO {
    QuestionnaireId: string,
    Name: string,
    Language: number
    Questions: QuestionDTO[]
}

export interface QuestionDTO {
    QuestionId: string,
    Name: string,
    Order: number,
    AnswerType: AnswerType,
    Answers: AnswerDTO[]
}

export enum AnswerType {
    Text = 0,
    Select = 1
}

export interface AnswerDTO {
    AnswerId: string,
    Value: string,
    IsCorrect: boolean,
    Order: number
}

export interface UseGetQuestionnaireByIdProps {
    QuestionnaireId: string
}

export interface UseGetQuestionnairesByLanguageProps {
    Language: number
}

export interface UsePostQuestionnaireProps {
    identifier : string,
    birthday : Date,
    name : string,    
    gender : number,
    phoneNumber : string,
    email : string,
    isEmailNewsletterEnable : boolean,
    isPhoneNewsletterEnable : boolean,
    country : number,
    city : string,
    questionnaireId : string,
    questionnaireAnswers : QuestionnaireAnswer[],
    description : string,
    isProcedureExecutionAccepted : boolean,
    referralSource : number

}

export interface QuestionnaireAnswer {
    CustomeText: string,
    QuestionId: string,
    AnswerId?: string
}

export interface ComplitingQuestionnaire {
    QuestionnaireId: string,
    Name: string,
    Language: number,
    CompletedQuestions: CompletedQuestion[]
}

export interface CompletedQuestion {
    QuestionId: string,
    QuestionValue: string,
    AnswerType: AnswerType,
    AnswerId: string,
    Value: string,
    IsCorrect: boolean
}