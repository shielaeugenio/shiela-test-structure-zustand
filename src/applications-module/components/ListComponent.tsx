import { useEffect } from "react";
import { filterConditionsSelector, useFilterStore } from "../../filters-module";
import { useApplicationsStore } from "../store/applicationsStore";
import { useGetApplicationsSwr } from "../store/applicationsStoreSwr";

const ApplicationsListComponent = (props: {}) => {
    const filterConditions = useFilterStore(filterConditionsSelector);
    const { pageSize, selectedPage, onPageChanged } = useApplicationsStore();
    const { applications, totalApplications } = useGetApplicationsSwr(filterConditions, pageSize, selectedPage);

    const totalPages = Math.ceil(Number(totalApplications) / Number(pageSize));

    // SORRY FOR THE ASP CLASSIC FEELS CODE XD
    var loopedContent = [];
    for (var index = 1; index <= totalPages; index++) {
        loopedContent.push(<li key={index}><button aria-valuenow={index} onClick={(event: any) => { onPageChanged(event.target.ariaValueNow); }}>{index}</button></li>);
    }

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
            <div>totalPages: {totalPages}</div>
            <div>PageSize: {pageSize}</div>
            <div>PageNumber: {selectedPage}</div>

            <ul>
                {loopedContent}
            </ul>
        </div>
    );
}

export default ApplicationsListComponent;