import { AppSetState, AppGetState, RootState } from '../../core-module';
import * as filterService from '../services/filterService';

export interface FilterConditions {
    color: string;
    size: string;
}

export interface FilterState {
    filterConditions: FilterConditions;
    isLoading: boolean;
    isSaving: boolean;
}

export interface FilterSlice extends FilterState {
    getFilters: () => Promise<void>,
}

const initialState : FilterState = {
    filterConditions: {
        color: '',
        size: ''
    },
    isLoading: false,
    isSaving: false
};

export const filterSelector = (state: RootState) => state.filter;


export const filterSlice = (set: AppSetState, get: AppGetState) => ({
    ...initialState,
    getFilters: async() => {
        set((state) => {
            return {
                ...state,
                filter: {
                    ...state.filter,
                    isLoading: true
                }
            }
        });

        const response = await filterService.getFilters() as FilterConditions;

        set((state) => {
            return {
                ...state,
                filter: {
                    ...state.filter,
                    filterConditions: response,
                    isLoading: false
                }
            }
        });
    },
    // saveFilters: async(newFilterConditions: FilterConditions) => {
    //     set({isSaving: true});

    //     await filterService.saveFilters(newFilterConditions);

    //     set({filters: newFilterConditions, isSaving: false})
    // }
  });