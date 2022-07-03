import { FilterConditions } from "../../shared-module";

const filterConditions: FilterConditions = {
    gender: '',
    applicationStatus: ''
}

export const getFilters = async() => {
    console.log('>>> Call Get Filters');
    return Promise.resolve(filterConditions);
}

export const saveFilters = async(newFilterConditions: FilterConditions) => {

    if (newFilterConditions.gender) {
        filterConditions.gender = newFilterConditions.gender;
    }

    if (newFilterConditions.applicationStatus) {
        filterConditions.applicationStatus = newFilterConditions.applicationStatus;
    }

    return Promise.resolve();
}