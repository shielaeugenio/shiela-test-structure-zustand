import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useApplicationsClientStore } from '../../store/applicationsClientStore';
import { useGetApplications } from '../../store/applicationsServerStore';
import { FilterConditions } from '../../../shared-module';
import * as React from 'react';
import DropComponent from './DropComponent';
import { Application } from '../../models/application';
import DragComponent from './DragComponent';

type ApplicationsPerStatus = {
    status: string;
    applications: Application[];
}

const BeautifulDndComponent = (props: { filterConditions: FilterConditions }) => {
    const { applications } = useGetApplications();

    const [applicationsPerStatus, setApplicationsPerStatus] = React.useState<ApplicationsPerStatus[]>([]);

    React.useEffect(() => {
        if (applications.length > 0) {
            const newApplications = applications.filter(a => a.applicationStatus === 'new');
            const screeningApplications = applications.filter(a => a.applicationStatus === 'screening');
            console.log('persisting');
            setApplicationsPerStatus([{ status: 'new', applications: newApplications }, { status: 'screening', applications: screeningApplications }]);
        }
    }, [applications]);

    const onDragEnd = (eventValue: any) => {
        const { destination, source } = eventValue;

        console.log('drag', eventValue);
        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const sourceApplicationList = applicationsPerStatus.find(aps => aps.status === source.droppableId);
        const applicationToUpdate: Application = {
            ...sourceApplicationList?.applications[source.index]!,
            applicationStatus: destination.droppableId,
        };
        const newSourceApplicationList = {
            status: sourceApplicationList?.status,
            applications: sourceApplicationList?.applications.filter((aps) => aps.id !== applicationToUpdate.id)
        };

        console.log('sourceApp', newSourceApplicationList);


        const destinationApplicationList = (destination.droppableId === source.droppableId) ?
            newSourceApplicationList :
            applicationsPerStatus.find(aps => aps.status === destination.droppableId);

        var start = destinationApplicationList?.applications?.slice(0, destination.index) || [];
        var end = destinationApplicationList?.applications?.slice(destination.index, destinationApplicationList?.applications?.length) || [];

        const newDestinationApplicationList = {
            status: destinationApplicationList?.status,
            applications: [...start, applicationToUpdate, ...end]
        };

        const sourceId = applicationsPerStatus.findIndex(aps => aps.status === source.droppableId);
        const destinationId = applicationsPerStatus.findIndex(aps => aps.status === destination.droppableId);

        const updatedApplicationPerStatus = [...applicationsPerStatus];

        updatedApplicationPerStatus[destinationId].applications = newDestinationApplicationList.applications || [];

        if (sourceId !== destinationId) {
            updatedApplicationPerStatus[sourceId].applications = newSourceApplicationList.applications || [];
        }

        setApplicationsPerStatus(updatedApplicationPerStatus);
        console.log('state', applicationsPerStatus);

    }

    return (
        <div>
            <h1>Hello Beautiful Dnd</h1>
            <div style={{ border: "1px solid black", padding: "5px" }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    {applicationsPerStatus?.map((applicationsPerStatus, statusIndex) => (
                        <DropComponent droppableId={applicationsPerStatus.status} droppableTitle={applicationsPerStatus.status} key={statusIndex}>
                            {applicationsPerStatus.applications.map((application, applicationIndex) => (
                                <DragComponent draggableId={application.id} index={applicationIndex} key={applicationIndex}>
                                    <div style={{ backgroundColor: "#3287a8", margin: '3px' }}>
                                        {application.id}: {application.name}
                                    </div>
                                </DragComponent>
                            ))}
                        </DropComponent>
                    ))}
                </DragDropContext>
            </div>
        </div>
    );
}

export default BeautifulDndComponent;