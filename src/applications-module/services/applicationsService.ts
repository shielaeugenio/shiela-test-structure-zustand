import { FilterConditions } from "../../shared-module";
import { Application } from "../models/application";

export type GetApplicationsResponse = {
    applications: Application[];
    totalApplications: number;
}

const applications: Application[] = [{
    id: 'new-0',
    name: 'Pink Pig Ranger',
    gender: 'female',
    applicationStatus: 'new'
},
{
    id: 'screening-0',
    name: 'Red Pig Ranger',
    gender: 'female',
    applicationStatus: 'screening'
},
{
    id: 'offer-0',
    name: 'Blue Pig Ranger',
    gender: 'female',
    applicationStatus: 'offer'
},
{
    id: 'new-1',
    name: 'Green Pig Ranger',
    gender: 'male',
    applicationStatus: 'new'
},
{
    id: 'screening-1',
    name: 'Violet Pig Ranger',
    gender: 'male',
    applicationStatus: 'screening'
},
{
    id: 'screening-2',
    name: 'Yellow Pig Ranger',
    gender: 'nonBinary',
    applicationStatus: 'screening'
},
{
    id: 'screening-3',
    name: 'Indigo Pig Ranger',
    gender: 'nonBinary',
    applicationStatus: 'screening'
}];

export const getApplications = async (filterConditions?: FilterConditions, pageSize: number = 10, selectedPage: number = 1) => {
    let filterApplications = applications;

    if (filterConditions?.gender) {
        filterApplications = filterApplications.filter(a => a.gender === filterConditions.gender);
    }

    if (filterConditions?.applicationStatus) {
        filterApplications = filterApplications.filter(a => a.applicationStatus === filterConditions.applicationStatus);
    }

    var startIndex = (selectedPage - 1) * pageSize;

    var endIndex = (startIndex + pageSize > filterApplications?.length) ?  filterApplications?.length: startIndex + pageSize;

    return Promise.resolve({
        applications: filterApplications.slice(startIndex, endIndex),
        totalApplications: filterApplications?.length
    });
}