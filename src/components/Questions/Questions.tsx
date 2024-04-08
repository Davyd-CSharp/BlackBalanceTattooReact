import React, { useEffect, useState } from "react";
import './Questions.css'
import MyInput from "../../UI/MyInput/MyInput";
import MySelect, { SelectOption } from "../../UI/MySelect/MySelect";
import MyButton from "../../UI/MyButton/MyButton";
import { ArrowLeftIcon } from "@mui/x-date-pickers";
import { useGetQuestionnaireById, useGetQuestionnairesByLanguage } from "../../services/Questionnaire/QuestionnaireService";
import { useDispatch, useSelector } from "react-redux";
import { completeQuestionnaire } from '../../stores/slicers/questionnaire'
import { useTranslation } from "react-i18next";
import { SelectChangeEvent } from "@mui/material";
import { RootState } from "../../stores";
import { QuestionnaireDetailDTO, ComplitingQuestionnaire } from "../../services/Questionnaire/QuestionnaireTypes";

interface QuestionsProps {
    setNextPage: (value: number) => void,
    step: number,
    chooseLanguage: number
}

const Questions = ({
    setNextPage,
    step,
    chooseLanguage
} : QuestionsProps) => {
    const completedQuestionnaire = useSelector((state : RootState) => state.questionnaire.CompletedQuestionnaire);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [chooseQuestionnaireOptions, setChooseQuestionnaireOptions] = useState<SelectOption[]>([]);
    const [questionnaireDetail, setQuestionnaireDetail] = useState<QuestionnaireDetailDTO>({} as QuestionnaireDetailDTO);
    const [complitingQuestionnaire, setComplitingQuestionnaire] = useState<ComplitingQuestionnaire>({} as ComplitingQuestionnaire);
    const [questionnaireId, setQuestionnaireId] = useState("");

    const { response } = useGetQuestionnairesByLanguage({
        Language: chooseLanguage
    });
    let fetchQuestionnaireDetail = useGetQuestionnaireById({
        QuestionnaireId: questionnaireId
    });

    const selectQuestionnaire = async (e : SelectChangeEvent) => {        
        setQuestionnaireId(e.target.value);
    }


    useEffect(() => {        
        if(response) {
            setChooseQuestionnaireOptions(
                    response
                    .Models
                    .map(item => {
                        return {
                            Label: item.Name,
                            Value: item.QuestionnaireId,
                            Default: false
                        }
                    }));
        }
    }, [response, chooseLanguage]);

    useEffect(() => {
        fetchQuestionnaireDetail.fetchData();  
    }, [questionnaireId])

    useEffect(() => {    
        if(fetchQuestionnaireDetail.response) {
            const currentQuestionnaire = fetchQuestionnaireDetail.response;
            setQuestionnaireDetail({
                QuestionnaireId: currentQuestionnaire.QuestionnaireId,
                Name: currentQuestionnaire.Name,
                Language: currentQuestionnaire.Language,
                Questions: currentQuestionnaire.Questions
                    .map(question => {
                        return {
                            QuestionId: question.QuestionId,
                            Name: question.Name,
                            AnswerType: question.AnswerType,
                            Order: question.Order,
                            Answers: question.Answers
                                .map(answer => {
                                    return {
                                        AnswerId: answer.AnswerId ?? "",
                                        Value: answer.Value,
                                        IsCorrect: answer.IsCorrect,
                                        Order: answer.Order
                                    }
                                })
                        }
                    })
            });

            setComplitingQuestionnaire({
                QuestionnaireId: currentQuestionnaire.QuestionnaireId,
                Name: currentQuestionnaire.Name,
                Language: currentQuestionnaire.Language,
                CompletedQuestions: currentQuestionnaire.Questions
                    .map(item => {                    
                        var previousValue = completedQuestionnaire.CompletedQuestions
                            .find(c => c.QuestionId == item.QuestionId);
                        return {
                            QuestionId: item.QuestionId,
                            QuestionValue: item.Name,
                            AnswerType: item.AnswerType,
                            AnswerId: previousValue?.AnswerId ?? "",
                            Value: previousValue?.Value ?? "",
                            IsCorrect: previousValue?.IsCorrect ?? true
                        }                    
                })
            });
        }
    }, [fetchQuestionnaireDetail.response]);

    const completeTextQuestion = (
        questionId: string,
        questionName: string,
        value: string
    ) => {
        var filteredQuestions = complitingQuestionnaire.CompletedQuestions
            .filter(item => item.QuestionId !== questionId);
        setComplitingQuestionnaire({
            ...complitingQuestionnaire,
            CompletedQuestions: [
                {
                    QuestionId: questionId,
                    QuestionValue: questionName,
                    Value: value,
                    IsCorrect: true,
                    AnswerId: "",
                    AnswerType: 0
                },
                ...filteredQuestions
            ]
        })
    };

    const completeSelectQuestion = (selectedOption : SelectChangeEvent) => {
        const jsonValue = selectedOption.target.value;
        const { AnswerId, IsCorrect, QuestionId, QuestionName, Value } = JSON.parse(jsonValue);
        var filteredQuestions = complitingQuestionnaire.CompletedQuestions
            .filter(item => item.QuestionId != QuestionId);

        setComplitingQuestionnaire({
            ...complitingQuestionnaire,
            CompletedQuestions: [
                ...filteredQuestions,
                {
                    QuestionId: QuestionId,
                    AnswerId: AnswerId,
                    IsCorrect: IsCorrect,
                    QuestionValue: QuestionName,
                    Value: Value,
                    AnswerType: 1
                },
            ]
        });
    };

    const setNextStep = () => {  
        dispatch(completeQuestionnaire({
            QuestionnaireId: complitingQuestionnaire.QuestionnaireId,
            Name: complitingQuestionnaire.Name,
            Language: complitingQuestionnaire.Language,
            CompletedQuestions: complitingQuestionnaire.CompletedQuestions
                .map(item => {
                    return {
                        QuestionId: item.QuestionId,
                        QuestionName: item.QuestionValue,
                        AnswerType: item.AnswerType,
                        AnswerId: item.AnswerId,
                        Value: item.Value,
                        IsCorrect: item.IsCorrect
                    };
                })
        }));    
        setNextPage(step + 1);
    }
    const setPreviousStep = () => {
        setNextPage(step - 1);
    }

    return (
        <div className="questions">
            <MySelect
                label={t("chooseQuestionnaire")}
                fullWidth
                onChange={selectQuestionnaire}
                options={chooseQuestionnaireOptions}
            />
            {
                questionnaireDetail.Questions?.sort((a, b) => b.Order - a.Order)
                    .map(item => {
                    const previousValue = completedQuestionnaire?.CompletedQuestions?.find(c => c.QuestionId == item.QuestionId);
                    if(item.AnswerType == 0)
                    {
                        return <MyInput 
                            label={item.Name}   
                            text={previousValue?.Value ?? ""}                         
                            required={false}
                            onChange={e => 
                                completeTextQuestion(
                                    item.QuestionId,
                                    item.Name, 
                                    e.target.value)}                         
                        />
                    }

                    return <MySelect 
                        label={item.Name}
                        fullWidth
                        className="question-select"
                        onChange={completeSelectQuestion} 
                        ableLongText
                        options={
                            item.Answers.sort((a, b) => b.Order - a.Order)
                                .reverse()
                                .map(c => {
                                    return {
                                        Value: JSON.stringify({
                                            AnswerId: c.AnswerId,
                                            Value: c.Value,
                                            IsCorrect: c.IsCorrect,
                                            QuestionId: item.QuestionId,
                                            QuestionName: item.Name
                                        }),
                                        Label: c.Value,
                                        Default: previousValue?.AnswerId == c.AnswerId
                                    }
                                })
                        }
                    />
                })
            }
            <div className="questions-buttons">
                <MyButton 
                    variant='text'
                    label={t("back")}
                    startIcon={<ArrowLeftIcon />}
                    className="back-button"
                    onClick={setPreviousStep}
                />
                <MyButton                                    
                    label={t("continue")}
                    variant="contained"
                    className="next-button"
                    onClick={setNextStep}
                />
            </div>
        </div>
    );
}

export default Questions;