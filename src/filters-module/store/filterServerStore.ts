import { useQuery } from "react-query";

import { queryDefaults } from "../../shared-module";
import * as filterService from "../services/filterService";

type FiltersServerStore = {
  filtersData: any;
  isGetFiltersDataLoading: boolean;
  isGetFiltersDataError: boolean;
  isGetFiltersDataSuccess: boolean;
};

const cacheKey = "filters";

export const useGetFiltersData = (): Pick<
  FiltersServerStore,
  | "filtersData"
  | "isGetFiltersDataLoading"
  | "isGetFiltersDataError"
  | "isGetFiltersDataSuccess"
> => {
  // key can be an array if the call has params e.g for GetApplications ['applications', {filterConditions: {}, pageNumber: {}}]
  const { data, isLoading, isError, isSuccess } = useQuery(
    cacheKey,
    () => {
      return filterService.getFilters();
    },
    {
      ...queryDefaults,
    }
  );

  return {
    filtersData: data!,
    isGetFiltersDataLoading: isLoading,
    isGetFiltersDataError: isError,
    isGetFiltersDataSuccess: isSuccess,
  };
};
