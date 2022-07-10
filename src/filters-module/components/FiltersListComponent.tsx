import { IFilterConditions } from "../../shared-module";

const FiltersListComponent = (props: any) => {
  const { filtersData, setUserFilters } = props;

  const handleChangeFilters = (isChecked: boolean, filterCondition: any) => {
    if (isChecked) {
      setUserFilters((userFilters: any) => [...userFilters, filterCondition]);
    } else {
      setUserFilters((userFilters: any) => {
        const filterIndex = userFilters.findIndex(
          (userFilter: any) =>
            userFilter.displayText === filterCondition.displayText
        );
        if (filterIndex > -1) {
          userFilters.splice(filterIndex, 1);
        }
        return userFilters;
      });
    }
  };

  return (
    <div className="mb-3">
      {filtersData.map((filterCondition: IFilterConditions) => (
        <div
          className="checkbox checkbox-default mr-3"
          key={filterCondition.id}
        >
          <input
            id={filterCondition.displayText?.toLowerCase()}
            type="checkbox"
            onChange={(event) =>
              handleChangeFilters(event.target.checked, filterCondition)
            }
          />
          <label htmlFor={filterCondition.displayText?.toLowerCase()}>
            {filterCondition.displayText}
          </label>

          <div className="ml-4">
            {filterCondition.options?.map((option: any) => (
              <div className="checkbox checkbox-default" key={option.id}>
                <input id={option.displayText?.toLowerCase()} type="checkbox" />
                <label htmlFor={option.displayText?.toLowerCase()}>
                  {option.displayText}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default FiltersListComponent;
