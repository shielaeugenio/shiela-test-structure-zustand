import { filterConditionsSelector, useFilterStore } from "../../filters-module";

const ApplicationsListComponent = (props: {}) => {
    const filterConditions = useFilterStore(filterConditionsSelector);
    return (<div>{filterConditions.color}-{filterConditions.size}</div>)
}

export default ApplicationsListComponent;