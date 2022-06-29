import { useQuery } from "react-query";
import { FilterConditions } from "../../shared-module";
import { Application } from "../models/application";
import { getApplications } from "../services/applicationsService";
import { ApplicationsState } from "./applicationsStore";

const _cacheKey = (condition: FilterConditions): string => `applications-${JSON.stringify(condition)}`

export const useApplicationsStoreRq = (condition: FilterConditions): ApplicationsState => {

    const { data, isFetching } = useQuery<Application[]>(_cacheKey(condition), () => getApplications(condition))

    return ({
        applications: data || [],
        isLoading: isFetching
    })
}