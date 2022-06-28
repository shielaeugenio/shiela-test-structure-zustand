import { FilterConditions } from "../../shared-module";

const filterConditions: FilterConditions = {
    gender: '',
    applicationStatus: ''
}

export const getFilters = async() => {
    return Promise.resolve(filterConditions);
}

export const saveFilters = async(newFilterConditions: FilterConditions) => {

    if (newFilterConditions.gender !== undefined) {
        filterConditions.gender = newFilterConditions.gender;
    }

    if (newFilterConditions.applicationStatus !== undefined) {
        filterConditions.applicationStatus = newFilterConditions.applicationStatus;
    }

    return Promise.resolve();
}