import useAxios from "../../hooks/useAxios";
import { EnumDTO } from "../Shared/SharedTypes";
import { UseGetUserDetailByIdentifier, UserDTO } from "./PrimaryDataTypes";

const useGetGenders = () => {
    const response= useAxios<EnumDTO>({
        url: "api/System/Gender",
        method: "get",
        body: {},
        headers: {},
        executeImmediate: true
    });
    return response;
}

const useGetLanguages = () => {
    const response = useAxios<EnumDTO>({
        url: "api/System/Language",
        method: "get",
        body: {},
        headers: {},
        executeImmediate: true
    });
    return response;
}

const useGetReferralSources = () => {
    const response = useAxios<EnumDTO>({
        url: "api/System/ReferralSource",
        method: "get",
        body: {},
        headers: {},
        executeImmediate: true
    });
    return response;
}

const useGetUserDetailByIdentifier = ({
    Identifier
} : UseGetUserDetailByIdentifier) => {
    const response = useAxios<UserDTO>({
        url: `api/User?identifier=${Identifier}`,
        method: "get",
        body: {},
        headers: {},
        executeImmediate: false
    });

    return response;
}

export {useGetGenders, useGetLanguages, useGetReferralSources, useGetUserDetailByIdentifier}; 