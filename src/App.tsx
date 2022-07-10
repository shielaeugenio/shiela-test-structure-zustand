import { useState } from "react";

import { ApplicationsListComponent } from "./applications-module";
import { FiltersCardComponent, useGetFiltersData } from "./filters-module";
import SpinnerComponent from "./shared-module/components/SpinnerComponent";
import AlertErrorComponent from "./shared-module/components/AlertErrorComponent";

import { useGetApplicationsData } from "./applications-module/store/applicationsServerStore";

const App = () => {
  const [showFilters, setShowFilters] = useState<boolean>(true);

  const { isGetFiltersDataLoading, isGetFiltersDataError } =
    useGetFiltersData();
  const { isGetApplicationsDataLoading, isGetApplicationsDataError } =
    useGetApplicationsData();

  return (
    <main>
      {(isGetFiltersDataLoading || isGetApplicationsDataLoading) &&
        !(isGetFiltersDataError || isGetApplicationsDataError) && (
          <div>
            <SpinnerComponent />
          </div>
        )}

      {(isGetFiltersDataError || isGetApplicationsDataError) && (
        <div>
          <AlertErrorComponent />
        </div>
      )}

      <h1 className="text-center mb-3">APB Practice</h1>

      <button
        type="button"
        className="btn btn btn-ctrl mb-3"
        title="Hide Filters"
        aria-label="Hide Filters"
        onClick={() => setShowFilters(!showFilters)}
      >
        <i aria-hidden="true" className="gel-icon gel-icon-filter pr-2"></i>
        Filters
      </button>

      <div className="d-flex flex-row">
        {showFilters && <FiltersCardComponent />}
        <ApplicationsListComponent />
      </div>
    </main>
  );
};
export default App;
