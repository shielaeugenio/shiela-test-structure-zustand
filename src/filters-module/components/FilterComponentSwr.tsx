import { useFilterStoreSwr } from "../store/filterStoreSwr";


const FilterComponent = () => {
    const { filterConditions, isLoading, saveFilters } = useFilterStoreSwr()

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            <h3>Filter by:</h3>

            <label>Gender&nbsp;</label>
            <select name="gender"
                value={filterConditions.gender}
                onChange={async (e) => {
                    console.log('dispatch gender ', e.target.value);
                    saveFilters({ gender: e.target.value });
                }}>
                <option value="">Select One</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="nonBinary">non-binary</option>
            </select>

            <label>Application Status&nbsp;</label>
            <select name="applicationStatus"
                value={filterConditions.applicationStatus}
                onChange={async (e) => {
                    console.log('dispatch applicationStatus ', e.target.value);
                    saveFilters({ applicationStatus: e.target.value });
                }}>
                <option value="">Select One</option>
                <option value="screening">Screening</option>
                <option value="offer">Offer</option>
                <option value="new">New</option>
            </select>
        </div>
    );
}

export default FilterComponent