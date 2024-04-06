import {
    Reducer,
    combineReducers,
    configureStore,
} from "@reduxjs/toolkit";

import questionnaireReducer, { CompleteQuestionnaire } from './slicers/questionnaire';
import currentUserReducer, { UserPrimaryData } from './slicers/user';

interface RootState {
    user: {
        CurrentUser: UserPrimaryData
    } 
    questionnaire: {

        CompletedQuestionnaire: CompleteQuestionnaire
    }
}

const combinedReducers: Reducer<RootState> = combineReducers({
    user: currentUserReducer,
    questionnaire: questionnaireReducer
});

const setupStore = () => {
    return configureStore({
        reducer: combinedReducers
    })
}

export default setupStore;
export type { RootState };