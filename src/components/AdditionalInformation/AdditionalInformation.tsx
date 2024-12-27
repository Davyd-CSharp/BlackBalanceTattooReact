import React, { useEffect, useState } from "react";
import './AdditionalInformation.css';
import MyInput from "../../UI/MyInput/MyInput";
import MySelect, { SelectOption } from "../../UI/MySelect/MySelect";
import MyButton from "../../UI/MyButton/MyButton";
import { ArrowLeftIcon } from "@mui/x-date-pickers";
import { useTranslation } from "react-i18next";
import { useGetReferralSources } from '../../services/PrimaryData/PrimaryDataService'
import { useDispatch, useSelector } from "react-redux";
import { setAdditionalData } from "../../stores/slicers/user";
import MyCheckbox from "../../UI/MyCheckbox/MyCheckbox";
import { init } from "i18next";
import { RootState } from "../../stores";

interface InitialValues {
    RefferalSource: number,
    IsProcedureExecutionAccepted: boolean
}

interface AdditionalInformationProps {
    setNextPage: (value: number) => void,
    step: number,
    isProcedureExecutionAccepted: boolean
}

const AdditionalInformation = ({
    setNextPage,
    step,
    isProcedureExecutionAccepted
} : AdditionalInformationProps) => {
    const currentUser = useSelector((state : RootState) => state.user.CurrentUser);
    const { t } = useTranslation();
    const { response } = useGetReferralSources();
    const dispatch = useDispatch();
    const [referralSourceOptions, setReferralSourceOptions] = useState<SelectOption[]>([]);
    const [initialValues, setInitialValues] = useState<InitialValues>({} as InitialValues);

    const setNextStep = () => {
        dispatch(setAdditionalData({
            ReferralSource: initialValues.RefferalSource,
            IsProcedureExecutionAccepted: isProcedureExecutionAccepted
        }));
        setNextPage(step + 1);
    }
    const setPreviousStep = () => {
        setNextPage(step - 1);
    }

    useEffect(() => {
        setInitialValues({
            RefferalSource: currentUser.ReferralSource,
            IsProcedureExecutionAccepted: currentUser.IsProcedureExecutionAccepted
        })
    }, [currentUser])

    useEffect(() => {
        if(response)
        {
            setReferralSourceOptions(
                response.Values
                    .map(item => {
                        return {
                            Value: item.Value
                                .toString(),
                            Label: item.Name,
                            Default: false
                        };
                    })
            );
        }
    }, [response])

    return (
        <div className="additional-information">
            <div className="additional-information-referral-source">
                <MySelect
                    label={t("referralSource")}
                    fullWidth
                    options={referralSourceOptions}
                    onChange={e => {
                        setInitialValues({
                            ...initialValues,
                            RefferalSource: Number(e.target.value)
                        })
                    }}
                />
            </div>

            <div className="additional-information-buttons">
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
    )
}

export default AdditionalInformation;