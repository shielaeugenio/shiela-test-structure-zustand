import { FilterConditions } from "../../shared-module";
import { useApplicationsClientStore } from "../store/applicationsClientStore";
import { useGetApplications } from "../store/applicationsServerStore";

const ApplicationsListComponent = (props: { filterConditions: FilterConditions}) => {
    const { filterConditions } = props;
    const { pageSize, selectedPage, onPageChanged } = useApplicationsClientStore();
    const { applications, totalApplications } = useGetApplications(filterConditions, pageSize, selectedPage);

    const totalPages = Math.ceil(Number(totalApplications) / Number(pageSize));

    console.log('pages', totalPages);
    const pages = Array(totalPages).fill(-1).map((value, index) => {
        return (<li key={index}><button aria-valuenow={index+1} onClick={(event: any) => { onPageChanged(event.target.ariaValueNow); }}>{index+1}</button></li>);
    });

    return (
        <div>
            <div>Filters: {filterConditions?.applicationStatus} - {filterConditions?.gender}</div>
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
                {pages}
            </ul>
        </div>
    );
}

export default ApplicationsListComponent;