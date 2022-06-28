import { useMutation, useQuery, useQueryClient } from 'react-query'
import { FilterConditions } from '../../shared-module';
import * as filterService from '../services/filterService';

const _cacheKey = "filter-data"

export const useFilterStoreRq = () => {
  const queryClient = useQueryClient();

    const { data, isFetching } = useQuery<FilterConditions>(_cacheKey, () => filterService.getFilters())

    const mutation = useMutation(
      async (newFilterConditions: FilterConditions) => await filterService.saveFilters(newFilterConditions), 
      {
        onSuccess: () => {
          queryClient.invalidateQueries(_cacheKey);
        }
      }
    );

    return ({
        filterConditions: data || {},
        isLoading: isFetching,
        isSaving: mutation.isLoading,
        saveFilters: async (newFilterConditions: FilterConditions) => mutation.mutate(newFilterConditions)
    });
}