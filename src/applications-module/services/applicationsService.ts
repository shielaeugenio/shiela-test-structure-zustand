import { FilterConditions } from "../../shared-module";
import { Application } from "../models/application";

export type GetApplicationsResponse = {
    applications: Application[];
    totalApplications: number;
}

const applications: Application[] = [{
    name: 'Pink Pig Ranger',
    gender: 'female',
    applicationStatus: 'new'
},
{
    name: 'Red Pig Ranger',
    gender: 'female',
    applicationStatus: 'screening'
},
{
    name: 'Blue Pig Ranger',
    gender: 'female',
    applicationStatus: 'offer'
},
{
    name: 'Green Pig Ranger',
    gender: 'male',
    applicationStatus: 'new'
},
{
    name: 'Violet Pig Ranger',
    gender: 'male',
    applicationStatus: 'screening'
},
{
    name: 'Yellow Pig Ranger',
    gender: 'nonBinary',
    applicationStatus: 'screening'
},
{
    name: 'Indigo Pig Ranger',
    gender: 'nonBinary',
    applicationStatus: 'screening'
}];

export const getApplications = async (filterConditions?: FilterConditions, pageSize: number = 5, selectedPage: number = 1) => {
    let filterApplications = applications;

    if (filterConditions?.gender) {
        filterApplications = filterApplications.filter(a => a.gender === filterConditions.gender);
    }

    if (filterConditions?.applicationStatus) {
        filterApplications = filterApplications.filter(a => a.applicationStatus === filterConditions.applicationStatus);
    }

    var startIndex = (selectedPage - 1) * pageSize // 5
    console.log('start index', startIndex);

    var endIndex = (startIndex + pageSize > filterApplications?.length) ?  filterApplications?.length: startIndex + pageSize;

    return Promise.resolve({
        applications: filterApplications.slice(startIndex, endIndex),
        totalApplications: filterApplications?.length
    });
}