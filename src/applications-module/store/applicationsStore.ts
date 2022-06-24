import create, { GetState, SetState } from 'zustand';
import { devtools, persist } from "zustand/middleware";
import { FilterConditions } from '../../shared-module';
import { Application } from '../models/application';
import * as applicationsService from '../services/applicationsService';

export interface ApplicationsState {
    pageSize: number;
    selectedPage: number;
}


const initialState: ApplicationsState = {
    pageSize: 5,
    selectedPage: 1
};

interface ApplicationsStore extends ApplicationsState {
    onPageChanged: (newPage: number) => void
}

type ApplicationsSetState = SetState<ApplicationsState>;
type ApplicationsGetState = GetState<ApplicationsState>;


export const applicationsState = (set: ApplicationsSetState, get: ApplicationsGetState) => ({
    ...initialState,
    onPageChanged: (newPage: number) => {
        set((state) => {
            return {
                ...state,
                selectedPage: newPage
            }
        })
    }
});


export const useApplicationsStore = create(devtools(persist(applicationsState, { name: "applications" })));