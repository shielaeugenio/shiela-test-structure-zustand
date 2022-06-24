import { useFilterStoreSwr } from "../../filters-module/store/filterStoreSwr";
//import { useApplicationsStoreSwr } from "../store/applicationsStoreSwr";

const ApplicationsListComponent = () => {
    // const { filterConditions } = useFilterStoreSwr();
    // const { applications, isLoading } = useApplicationsStoreSwr(filterConditions)

    // return (
    //     <div>
    //         {isLoading && <div>Loading...</div>}
    //         <div>Filters: {filterConditions.applicationStatus} - {filterConditions.gender}</div>
    //         Applications
    //         <table>
    //             <thead>
    //                 <tr>
    //                     <th>Name</th>
    //                     <th>Gender</th>
    //                     <th>Application Status</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {applications?.length && applications.map((a, key) => (
    //                     <tr key={key}>
    //                         <td>{a.name}</td>
    //                         <td>{a.gender}</td>
    //                         <td>{a.applicationStatus}</td>
    //                     </tr>
    //                 ))
    //                 }
    //             </tbody>

    //         </table>
    //     </div>
    // );
}

export default ApplicationsListComponent;