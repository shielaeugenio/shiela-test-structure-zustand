import { FilterConditions } from "../../shared-module";
import { Application } from "../models/application";

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

const delay = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms));

export const getApplications = async (filterConditions?: FilterConditions) => {
    let filterApplications = applications;

    if (filterConditions?.gender) {
        filterApplications = filterApplications.filter(a => a.gender === filterConditions.gender);
    }

    if (filterConditions?.applicationStatus) {
        filterApplications = filterApplications.filter(a => a.applicationStatus === filterConditions.applicationStatus);
    }
    
    await delay(3000);
    return filterApplications;
}