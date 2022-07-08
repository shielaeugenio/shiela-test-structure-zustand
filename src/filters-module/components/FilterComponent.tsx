import { useState } from "react";
import { FilterConditions } from "../../shared-module";
import { useGetFilterConditions, useSaveFilterConditions } from "../store/filterServerStore";


const FilterComponent = (props: {}) => {
    const { filterConditions, isLoading } = useGetFilterConditions();
    // persists data to shared state once it is final. In this case, save is called upon clicking apply filters button
    const { saveFilterConditions } = useSaveFilterConditions();

    // Use react state for temporary states like when the user is still in the process of selecting filters
    const [draftFilters, setDraftFilters] = useState<FilterConditions>(filterConditions);

    return (
        <div>
            { isLoading && <span>Loading Filters</span>}
            <h3>Filter by:</h3>

            <label>Gender&nbsp;</label>
            <select name="gender" value={draftFilters?.gender} onChange={async (e) => {
                console.log('dispatch gender ', e.target.value);
                setDraftFilters({ ...draftFilters, gender: e.target.value });
            }}>
                <option value="">Select One</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="nonBinary">non-binary</option>
            </select>

            <label>Application Status&nbsp;</label>
            <select name="applicationStatus" value={draftFilters?.applicationStatus} onChange={async (e) => {
                console.log('dispatch applicationStatus ', e.target.value);
                setDraftFilters({ ...draftFilters, applicationStatus: e.target.value });

            }}>
                <option value="">Select One</option>
                <option value="screening">Screening</option>
                <option value="offer">Offer</option>
                <option value="new">New</option>
            </select>
            <br/>
            <button onClick={() => saveFilterConditions(draftFilters)}>Apply Filters</button>
        </div>
    );
}

export default FilterComponent