import useSWR from "swr";
import { FilterConditions } from "../../shared-module";
import { Application } from "../models/application";
import { getApplications, GetApplicationsResponse } from "../services/applicationsService";

// TODO: Clean cache
const _cacheKey = (condition: FilterConditions, pageSize: number, selectedPage: number): string => `applications-${JSON.stringify({ ...condition, pageSize, selectedPage})}`

type DataState = {
    applications: Application[];
    totalApplications: number;
    isLoading: boolean;
    error?: any;
}
export const useGetApplicationsSwr = (condition: FilterConditions, pageSize: number, selectedPage: number): DataState => {

    const { data, isValidating, error } = useSWR<GetApplicationsResponse>(_cacheKey(condition, pageSize, selectedPage), () => getApplications(condition, pageSize, selectedPage))

    return ({
        applications: data?.applications || [],
        totalApplications: data?.totalApplications!,
        isLoading: isValidating,
        error
    }); 
}