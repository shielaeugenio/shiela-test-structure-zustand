import useSWR from "swr";
import { FilterConditions } from "../../shared-module";
import { Application } from "../models/application";
import { getApplications } from "../services/applicationsService";
import { ApplicationsState } from "./applicationsStore";
import create from 'zustand'

const _cacheKey = (condition: FilterConditions): string => `applications-${JSON.stringify(condition)}`

export const useApplicationsStoreSwr = (condition: FilterConditions): ApplicationsState & {
    //selectedApplicationId: string | null,
    //selectedApplication: Application | null
} => {

    const { data, isValidating } = useSWR<Application[]>(_cacheKey(condition),
        () => getApplications(condition))

    //const { selectedApplicationId } = useApplicationsIdStore()

    //const { selectedApplication} = data?.find(app => app.id === selectedApplicationId)

    return ({
        applications: data || [],
        isLoading: isValidating,
        //selectedApplicationId,
        //selectedApplication
    })
}

interface ApplicationIdState {
    selectedApplicationId: string | null
    select: (applicationId: string) => void
}

export const useApplicationsIdStoreSync = create<ApplicationIdState>()((set, get) => ({
    selectedApplicationId: null,

    select: (applicationId: string) => {
        set(state => ({ ...state, selectedApplicationId: applicationId }))
    }
}))