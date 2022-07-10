import FiltersListComponent from "./FiltersListComponent";

import { useGetFiltersData } from "../store/filterServerStore";
import { useFiltersClientStore } from "../store/filterClientStore";
import { useState } from "react";

const FilterComponent = () => {
  const { filtersData, isGetFiltersDataSuccess } = useGetFiltersData();
  const { onApplyFilters } = useFiltersClientStore();

  const [userFilters, setUserFilters] = useState<any>([]);

  return (
    <section>
      <div className="card p-3">
        <div className="d-flex flex-row mb-3 mt-2">
          <h3>Select Filters</h3>

          {/* <div className="ml-5">
            <button
              type="button"
              className="close"
              title="Close"
              aria-label="Close"
            >
              <i aria-hidden="true" className="gel-icon-close gel-icon-lg"></i>
            </button>
          </div> */}
        </div>

        {isGetFiltersDataSuccess && (
          <div>
            <FiltersListComponent
              filtersData={filtersData}
              setUserFilters={setUserFilters}
            />

            <button
              type="button"
              className="btn btn-outline-primary btn-block"
              onClick={() => onApplyFilters(userFilters)}
            >
              Apply Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
export default FilterComponent;
