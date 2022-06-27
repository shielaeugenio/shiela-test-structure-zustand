import useSWR from 'swr';
import create, { GetState, SetState } from 'zustand';
import { devtools, persist } from "zustand/middleware";
import { FilterConditions } from '../../shared-module';
import { Application } from '../models/application';
import * as applicationsService from '../services/applicationsService';

export interface ApplicationsState {
    applications: Application[];
    isLoading: boolean;
}


const initialState: ApplicationsState = {
    applications: [],
    isLoading: false
};

interface ApplicationsStore extends ApplicationsState {
    getApplications: (FilterConditions: FilterConditions) => Promise<void>;
}

type ApplicationsSetState = SetState<ApplicationsState>;
type ApplicationsGetState = GetState<ApplicationsState>;


export const applicationsState = (set: ApplicationsSetState, get: ApplicationsGetState) => ({
    ...initialState,
    getApplications: async (filterConditions: FilterConditions) => {
        set((state) => {
            return {
                ...state,
                isLoading: true
            }
        });

        const response = await applicationsService.getApplications(filterConditions) as Application[];

        set((state) => {
            return {
                ...state,
                applications: response,
                isLoading: false
            }
        });
    }
});


export const useApplicationsStore = create(devtools(persist(applicationsState, { name: "applications" })));