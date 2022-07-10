import { useQuery } from "react-query";

import { queryDefaults } from "../../shared-module";

import * as applicationService from "../services/applicationsService";

const cacheKey = "applications";

type ApplicationsServerStore = {
  applications: any;
  isGetApplicationsDataLoading: boolean;
  isGetApplicationsDataError: boolean;
  isGetApplicationsDataSuccess: boolean;
};

export const useGetApplicationsData = (): ApplicationsServerStore => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    cacheKey,
    () => {
      return applicationService.getApplications();
    },
    {
      ...queryDefaults,
    }
  );

  return {
    applications: data!,
    isGetApplicationsDataLoading: isLoading,
    isGetApplicationsDataError: isError,
    isGetApplicationsDataSuccess: isSuccess,
  };
};
