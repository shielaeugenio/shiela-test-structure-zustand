import { UseMutateFunction, useMutation, useQuery, useQueryClient } from "react-query";
import { FilterConditions, queryDefaults } from "../../shared-module";
import * as filterService from '../services/filterService';

type FiltersServerStore = {
    filterConditions: FilterConditions;
    isLoading: boolean;
    loadingError?: any;
    saveFilterConditions: UseMutateFunction<void, unknown, FilterConditions, unknown>;
    isSaving: boolean;
    saveError: any;
}

const cacheKey = 'filters';

export const useGetFilterConditions = (): Pick<FiltersServerStore, 'filterConditions' | 'isLoading' | 'loadingError'> => {

    // key can be an array if the call has params e.g for GetApplications ['applications', {filterConditions: {}, pageNumber: {}}]
    const { data, isLoading, error } = useQuery(cacheKey, () => {
        return filterService.getFilters()
    }, {
        ...queryDefaults,
        initialData: {
            applicationStatus: '',
            gender: ''
        }
    });

    return ({
        filterConditions: data!,
        isLoading: isLoading,
        loadingError: error
    });
}

export const useSaveFilterConditions = (): Pick<FiltersServerStore, 'saveFilterConditions' | 'isSaving' | 'saveError'>=> {
    const queryClient = useQueryClient();
    const {mutate, error, isLoading} = useMutation((newFilterConditions: FilterConditions) => {
        return filterService.saveFilters(newFilterConditions);
    }, {
        onSuccess: (data, variables, context) => {
            const currentFilterConditions = queryClient.getQueryData(cacheKey) as FilterConditions;

            queryClient.setQueryData(cacheKey, { ...currentFilterConditions, ...variables });

        }
    });

    return ({
        saveFilterConditions: mutate,
        isSaving: isLoading,
        saveError: error
    });
}