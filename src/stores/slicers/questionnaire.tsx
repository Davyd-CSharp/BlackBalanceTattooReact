import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CompleteQuestionnaire {
    QuestionnaireId: string,
    Name: string,
    Language: Language,
    CompletedQuestions: Question[]
}

enum Language {
   Polish = 1,
   English = 2,
   Ukrainian = 3 
}

interface Question {
    QuestionId: string,   
    QuestionName: string,
    AnswerType: number,
    AnswerId: string
    Value: string 
    IsCorrect: boolean
}

const initialState = {
    CompletedQuestionnaire: {
        QuestionnaireId: "",
        Name: "",
        Language: Language.Polish,
        CompletedQuestions: []
    } as CompleteQuestionnaire
}

const questionnaireSlice = createSlice({
    name: "questionnaire",
    initialState: initialState,
    reducers: {
        completeQuestionnaire(state, action: PayloadAction<CompleteQuestionnaire>)
        {
            state.CompletedQuestionnaire = action.payload
        }
    }
})

export const { completeQuestionnaire } = questionnaireSlice.actions;
export default questionnaireSlice.reducer;
export type { CompleteQuestionnaire, Language, Question }; 