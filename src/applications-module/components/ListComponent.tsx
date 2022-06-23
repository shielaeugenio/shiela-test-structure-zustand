import { useEffect } from "react";
import { filterConditionsSelector, useFilterStore } from "../../filters-module";
import { useApplicationsStore } from "../store/applicationsStore";

const ApplicationsListComponent = (props: {}) => {
    const filterConditions = useFilterStore(filterConditionsSelector);
    const { applications, getApplications } = useApplicationsStore();

    useEffect(() => {
        getApplications(filterConditions);
    }, [filterConditions]);

    return (
        <div>
            <div>Filters: {filterConditions.applicationStatus} - {filterConditions.gender}</div>
            Applications
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Application Status</th>
                    </tr>
                </thead>
                <tbody>
                    {applications?.length && applications.map((a, key) => (
                        <tr key={key}>
                            <td>{a.name}</td>
                            <td>{a.gender}</td>
                            <td>{a.applicationStatus}</td>
                        </tr>
                    ))
                    }
                </tbody>

            </table>
        </div>
    );
}

export default ApplicationsListComponent;