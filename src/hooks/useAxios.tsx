import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ApiResponse } from "../services/Shared/SharedTypes";

axios.defaults.baseURL = 'https://blackbalancetatto-api.azurewebsites.net';

interface useAxiosProps {
    url: string,
    method: string,
    body : {},
    headers: {},
    executeImmediate?: boolean 
}

function useAxios<TResponse>({
    url,
    method,
    body = {},
    headers = {},
    executeImmediate = false} : useAxiosProps) {
    
    const [response, setResponse] = useState<TResponse | null>();
    const [error, setError] = useState<string[]>([]);
    const [isLoading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res: AxiosResponse<ApiResponse<TResponse>> = await axios.request<ApiResponse<TResponse>>({
                url, 
                method,
                headers,
                data: body
            });
            setResponse(res.data.Response);
        } catch(err : any) {
            setResponse(null);
            setError([
                ...error,
                err
            ]);
        } finally {
            setLoading(false);
        }           
    }

    useEffect(() => {
        if(executeImmediate) {
            console.log("Executed")
            fetchData();
        }
    }, []);

    return { response, error, isLoading, fetchData };
}

export default useAxios;