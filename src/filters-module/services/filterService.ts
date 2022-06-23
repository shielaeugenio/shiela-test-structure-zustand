import { FilterConditions } from "../state/filterSlice"

const filterConditions: FilterConditions = {
    color: 'red',
    size: 'large'
}

export const getFilters = async() => {
    return Promise.resolve(filterConditions);
}

export const saveFilters = async(newFilterConditions: FilterConditions) => {
    filterConditions.color = newFilterConditions.color;
    filterConditions.size = newFilterConditions.size;

    return Promise.resolve();
}