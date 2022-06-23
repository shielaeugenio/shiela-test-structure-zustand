import useSWR, { mutate } from 'swr';
import { FilterConditions } from '../../shared-module';
import * as filterService from '../services/filterService';

const _cacheKey = "filter-data"

export const useFilterStoreSwr = () => {
    const { data, isValidating } = useSWR<FilterConditions>(_cacheKey, () => filterService.getFilters())
    return ({
        filterConditions: data || {},
        isLoading: isValidating,
        isSaving: false,

        saveFilters: async (newFilterConditions: FilterConditions) => {
            await filterService.saveFilters(newFilterConditions);
            mutate(_cacheKey)
        }
    });
}