import { useEffect } from "react";
import { useFilterStore } from "../store/filterStore";


const FilterComponent = (props: {}) => {
    const { filterConditions, getFilters, saveFilters } = useFilterStore();

    useEffect(() => {
        if (!filterConditions.color && !filterConditions.size) {
            console.log("TRIGGER GET");
            getFilters();
        }
    }, []);

    return (
        <div>
            <h3>Filter by:</h3>

            <div>Color: {filterConditions?.color}</div>
            <div>Size: {filterConditions?.size}</div>


            <label>Color&nbsp;</label>
            <select name="color" onChange={async (e) => {
                console.log('dispatch color ', e.target.value);
                saveFilters({ color: e.target.value });
            }}>
                <option>red</option>
                <option>blue</option>
                <option>green</option>
                <option>yellow</option>
            </select>

            <label>Size&nbsp;</label>
            <select name="size" onChange={async (e) => {
                console.log('dispatch size ', e.target.value);
                saveFilters({ size: e.target.value });

            }}>
                <option>small</option>
                <option>medium</option>
                <option>large</option>
            </select>
        </div>
    );
}

export default FilterComponent