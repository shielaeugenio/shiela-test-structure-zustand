import { apiURL } from "../../shared-module/constants/reactQueryDefaults";

export const getApplications = async () => {
  const response = await fetch(apiURL + "applicationsData");
  return response.json();
};
