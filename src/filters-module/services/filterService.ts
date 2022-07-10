import { apiURL } from "../../shared-module/constants/reactQueryDefaults";

export const getFilters = async () => {
  const response = await fetch(apiURL + "filtersData");
  return response.json();
};
