import create, { GetState, SetState } from 'zustand';
import { devtools, persist } from "zustand/middleware";
import * as filterService from '../services/filterService';

export interface FilterConditions {
    color?: string;
    size?: string;
}

export interface FilterState {
    filterConditions: FilterConditions;
    isLoading: boolean;
    isSaving: boolean;
}

export interface FilterStore extends FilterState {
    getFilters: () => Promise<void>,
    saveFilters: (newFilterConditions: FilterConditions) => Promise<void>
}

const initialState: FilterState = {
    filterConditions: {
        color: '',
        size: ''
    },
    isLoading: false,
    isSaving: false
};

type FilterSetState = SetState<FilterStore>;
type FilterGetState = GetState<FilterStore>;

export const filterConditionsSelector = (state: FilterState) => state.filterConditions;

export const filterState = (set: FilterSetState, get: FilterGetState) => ({
    ...initialState,
    getFilters: async () => {
        set((state) => {
            return {
                ...state,
                isLoading: true
            }
        });

        const response = await filterService.getFilters() as FilterConditions;

        set((state) => {
            return {
                ...state,
                filterConditions: response,
                isLoading: false

            }
        });
    },
    saveFilters: async (newFilterConditions: FilterConditions) => {
        set({ isSaving: true });

        await filterService.saveFilters(newFilterConditions);

        set((state) => {
            return {
                ...state,
                filterConditions: {
                    ...state.filterConditions,
                    ...newFilterConditions
                },
                isSaving: false
            }
        });
    }
});


export const useFilterStore = create(devtools(persist(filterState, { name: "filter" })));

