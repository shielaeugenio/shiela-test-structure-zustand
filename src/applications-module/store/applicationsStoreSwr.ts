import useSWR from "swr";
import { FilterConditions } from "../../shared-module";
import { Application } from "../models/application";
import { getApplications } from "../services/applicationsService";
import { ApplicationsState } from "./applicationsStore";

const _cacheKey = (condition: FilterConditions): string => `applications-${JSON.stringify(condition)}`

export const useApplicationsStoreSwr = (condition: FilterConditions): ApplicationsState => {

    const { data, isValidating } = useSWR<Application[]>(_cacheKey(condition), () => getApplications(condition))

    return ({
        applications: data || [],
        isLoading: isValidating
    })
}