import create, { GetState, SetState } from 'zustand';
import { devtools, persist } from "zustand/middleware";

export interface ApplicationsState {
    applications: any[];
}


const initialState: ApplicationsState = {
    applications: []
};

type ApplicationsSetState = SetState<ApplicationsState>;
type ApplicationsGetState = GetState<ApplicationsState>;


export const applicationsState = (set: ApplicationsSetState, get: ApplicationsGetState) => ({
    ...initialState
});


export const useApplicationsStore = create(devtools(persist(applicationsState, { name: "applications" })));