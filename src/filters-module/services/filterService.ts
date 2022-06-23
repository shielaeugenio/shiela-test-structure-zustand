import { FilterConditions } from "../store/filterStore"

const filterConditions: FilterConditions = {
    color: 'red',
    size: 'large'
}

export const getFilters = async() => {
    return Promise.resolve(filterConditions);
}

export const saveFilters = async(newFilterConditions: FilterConditions) => {

    if (newFilterConditions.color) {
        filterConditions.color = newFilterConditions.color;
    }

    if (newFilterConditions.size) {
        filterConditions.size = newFilterConditions.size;
    }

    return Promise.resolve();
}