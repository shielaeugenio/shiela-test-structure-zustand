import useSWR from "swr";
import { FilterConditions } from "../../shared-module";
import { Application } from "../models/application";
import { getApplications, GetApplicationsResponse } from "../services/applicationsService";

// TODO: Clean cache
const cacheKey = (condition: FilterConditions, pageSize: number, selectedPage: number): string => `applications-${JSON.stringify({ ...condition, pageSize, selectedPage})}`

type ApplicationsServerState = {
    applications: Application[];
    totalApplications: number;
    isLoading: boolean;
    error?: any;
}
export const useGetApplications = (condition: FilterConditions, pageSize: number, selectedPage: number): ApplicationsServerState => {

    const { data, isValidating, error } = useSWR<GetApplicationsResponse>(cacheKey(condition, pageSize, selectedPage), () => getApplications(condition, pageSize, selectedPage))

    return ({
        applications: data?.applications || [],
        totalApplications: data?.totalApplications || 0,
        isLoading: isValidating,
        error
    }); 
}