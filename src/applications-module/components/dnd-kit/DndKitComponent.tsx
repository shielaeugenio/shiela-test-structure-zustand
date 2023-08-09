import * as React from 'react';
import { DndContext } from '@dnd-kit/core';
import DropComponent from './DropComponent';
import DragComponent from './DragComponent';
import { useGetApplications } from '../../store/applicationsServerStore';
import { Application } from '../../models/application';


type ApplicationsPerStatus = {
    status: string;
    applications: Application[];
}

const DndKitComponent = () => {

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

    return (
        <div>
            <h1>Hello DnD Kit</h1>
            <DndContext onDragEnd={handleDragEnd}>
                {applicationsPerStatus?.map((aps, index) => (
                    <DropComponent id={aps.status} key={index}>
                        {
                            aps.applications?.map((application, key) => (
                                <DragComponent id={application.id} currentLane={aps.status} key={key}>
                                   {application.id} : {application.name}
                                </DragComponent>
                            ))
                        }
                    </DropComponent>
                ))}
            </DndContext>
        </div >
    );

    function handleDragEnd(event: any) {
        console.log('ondrag', event);

        const { active, over } = event;

        const sourceApplicationList = applicationsPerStatus.find(aps => aps.status === active.data.current.currentLane);
        const applicationToUpdate: Application = sourceApplicationList?.applications.find(a => a.id === active.id)!;

        const newSourceApplicationList = {
            status: sourceApplicationList?.status,
            applications: sourceApplicationList?.applications.filter((aps) => aps.id !== active.id)
        };

        console.log('>> source', newSourceApplicationList)

        const destinationApplicationList = (over.id === active.data.current.currentLane) ?
            newSourceApplicationList :
            applicationsPerStatus.find(aps => aps.status === over.id);

        destinationApplicationList?.applications?.push({
            ...applicationToUpdate,
            applicationStatus: over.id
        });

        const sourceId = applicationsPerStatus.findIndex(aps => aps.status === active.data.current.currentLane);
        const destinationId = applicationsPerStatus.findIndex(aps => aps.status === over.id);

        const updatedApplicationPerStatus = [...applicationsPerStatus];

        updatedApplicationPerStatus[destinationId].applications =  destinationApplicationList?.applications || [];

        if (sourceId !== destinationId) {
            updatedApplicationPerStatus[sourceId].applications = newSourceApplicationList.applications || [];
        }

        setApplicationsPerStatus(updatedApplicationPerStatus);
        console.log('state', applicationsPerStatus);
    }
}

export default DndKitComponent;