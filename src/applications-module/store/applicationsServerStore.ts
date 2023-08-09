import { useQuery } from "react-query";
import { FilterConditions, queryDefaults } from "../../shared-module";
import { Application } from "../models/application";
import { getApplications, GetApplicationsResponse } from "../services/applicationsService";

// TODO: Clean cache
const cacheKey = (filterConditions?: FilterConditions, pageSize?: number, selectedPage?: number) => 
    ['applications', {filterConditions, selectedPage, pageSize}]

type ApplicationsServerState = {
    applications: Application[];
    totalApplications: number;
    isLoading: boolean;
    error?: any;
}
export const useGetApplications = (filterConditions?: FilterConditions, pageSize?: number, selectedPage?: number): ApplicationsServerState => {

    const { data, isLoading, error } = useQuery(cacheKey(filterConditions, selectedPage, pageSize), () =>
        getApplications(filterConditions, pageSize, selectedPage), queryDefaults)

    return ({
        applications: data?.applications || [],
        totalApplications: data?.totalApplications || 0,
        isLoading: isLoading,
        error
    }); 
}