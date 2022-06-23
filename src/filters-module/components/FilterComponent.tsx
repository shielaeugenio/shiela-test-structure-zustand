import { useAppStore } from "../../core-module";
import { filterSelector } from "../state/filterSlice";

const FilterComponent = (props: {}) => {
    const { filterConditions, getFilters} = useAppStore(filterSelector);

    if (!filterConditions.color && !filterConditions.size) {
        getFilters();
    }

    return (
        <div>
            <h3>Filter by:</h3>

            <div>Color: {filterConditions?.color}</div>
            <div>Size: {filterConditions?.size}</div>


            <label>Color&nbsp;</label>
            <select name="color" onChange={async (e) => {
                console.log('dispatch color ', e.target.value);
            }}>
                <option>red</option>
                <option>blue</option>
                <option>green</option>
                <option>yellow</option>
            </select>

            <label>Size&nbsp;</label>
            <select name="size" onChange={async (e) => {
                console.log('dispatch size ', e.target.value);
            }}>
                <option>small</option>
                <option>medium</option>
                <option>large</option>
            </select>
        </div>
    );
}

export default FilterComponent