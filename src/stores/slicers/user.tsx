import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

enum Gender {
    Male = 0,
    Female = 1,
}

enum ReferralSource {
    Instagram = 0,
    Google = 1,
    Facebook = 2,
    Familiar = 3,
    YouTube = 4,
    TikTok = 5,
    Other = 6
}

interface UserPrimaryData {
    PassportSeries: string,
    Name: string,
    Birthday: Date,
    Gender: Gender,
    Email: string,
    PhoneNumber: string,
    IsEmailNewsletterEnable: boolean,
    IsPhoneNewsletterEnable: boolean,
    Country: string,
    City: string,
    Description: string,
    ReferralSource: ReferralSource
    IsProcedureExecutionAccepted: boolean
}

interface PrimaryDataAction {
    PassportSeries: string,
    Name: string,
    Birthday: Date,
    Gender: Gender,
    Email: string,
    PhoneNumber: string,
    IsEmailNewsletterEnable: boolean,
    IsPhoneNewsletterEnable: boolean,
    Country: string,
    City: string,
}

interface AdditionalDataAction {
    Description: string,
    ReferralSource: ReferralSource,
    IsProcedureExecutionAccepted: boolean
}

const initialState = {
    CurrentUser: {
        PassportSeries: "",
        Name: "",
        Birthday: new Date(),
        Gender: Gender.Male,
        Email: "",
        PhoneNumber: "",
        IsEmailNewsletterEnable: false,
        IsPhoneNewsletterEnable: false,
        Country: "",
        City: "",
        Description: "",
        ReferralSource: ReferralSource.Instagram,
        IsProcedureExecutionAccepted: false
    } as UserPrimaryData
}

const userPrimaryDataSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setPrimaryData(state, action: PayloadAction<PrimaryDataAction>)
        {
            state.CurrentUser = {
                ...state.CurrentUser,
                ...action.payload         
            } as UserPrimaryData
        },
        setAdditionalData(state, action: PayloadAction<AdditionalDataAction>) {
            state.CurrentUser = {
                ...state.CurrentUser,
                Description: action.payload.Description,
                ReferralSource: action.payload.ReferralSource,
                IsProcedureExecutionAccepted: action.payload.IsProcedureExecutionAccepted
            } as UserPrimaryData
        }
    }
});

export const { setPrimaryData, setAdditionalData } = userPrimaryDataSlice.actions;
export default userPrimaryDataSlice.reducer;
export type { Gender, ReferralSource, PrimaryDataAction, AdditionalDataAction , UserPrimaryData};