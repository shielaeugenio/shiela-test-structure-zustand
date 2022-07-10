import { useGetApplicationsData } from "../store/applicationsServerStore";
import { useFiltersClientStore } from "../../filters-module";

const tableHeaders = [
  "Applicant Name",
  "Flags",
  "Application Status",
  "Screening Status",
  "Score",
  "Documents",
  "Actions",
];

const ApplicationsListComponent = () => {
  const { applications, isGetApplicationsDataSuccess } =
    useGetApplicationsData();
  const { filters } = useFiltersClientStore();

  return (
    <section className="flex-grow-1 ml-3">
      {filters.length > 0 && <p>{JSON.stringify(filters)}</p>}

      <table className="table table-borderless table-striped">
        <thead className="thead-dark thead-sortable">
          <tr>
            {tableHeaders.map((tableHeader) => (
              <th scope="col" key={tableHeader}>
                {tableHeader}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isGetApplicationsDataSuccess &&
            applications.map((application: any) => (
              <tr key={application.id}>
                <td>{`${application.applicant?.firstName} ${application.applicant?.lastName}`}</td>
                <td>
                  {application.flags.map((flag: any) => (
                    <div key={flag.description}>{flag.description}</div>
                  ))}
                </td>
                <td>{application.status?.description}</td>
                <td>{application.screeningActivities?.description}</td>
                <td>{application.applicationScore}</td>
                <td>
                  {application.documents.map((document: string) => (
                    <div key={document}>{document}</div>
                  ))}
                </td>
                <td>{application.action}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};
export default ApplicationsListComponent;
