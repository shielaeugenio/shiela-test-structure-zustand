import * as React from 'react';
import { useGetApplications } from '../../store/applicationsServerStore';
import { Application } from '../../models/application';
import ListBoxComponent from './ListBoxComponent';
import { Item, useListData } from 'react-stately';
import { Button } from 'react-aria-components';

type ApplicationsPerStatus = {
    status: string;
    applications: Application[];
    isDisabled: boolean;
}

const ReactAriaComponent = () => {

    const { applications } = useGetApplications();

    const [applicationsPerStatus, setApplicationsPerStatus] = React.useState<ApplicationsPerStatus[]>([]);

    React.useEffect(() => {
        if (applications.length > 0) {
            const newApplications = applications.filter(a => a.applicationStatus === 'new');
            const screeningApplications = applications.filter(a => a.applicationStatus === 'screening');
            console.log('persisting');
            setApplicationsPerStatus([{ status: 'new', isDisabled: true, applications: newApplications },
            { status: 'screening', isDisabled: false, applications: screeningApplications }]);
        }
    }, [applications]);

    
    let onInsert = async (e: any) => {
        let name = await e.items[0].getText('item');
        console.log('>> insert name', name);
    }

    return (
        <div>
            <h1>Hello React Aria</h1>
            {applicationsPerStatus?.length > 0 &&
                <div style={{ display: 'flex', margin: '3px' }}>
                    {applicationsPerStatus.map((aps, index) => (
                        <div style={{ display: 'flex', flexDirection:'column', padding: '10px', border: '1px solid black'}} key={index}>
                            <h3>{aps.status}</h3>
                            <ListBoxComponent
                                aria-label={aps.status}
                                selectionMode="multiple"
                                selectionBehavior="replace"
                                acceptedDragTypes={'all'}
                                items={aps.applications}
                                onInsert={onInsert}
                            >
                                {(application: Application) => (
                                    <Item key={application.id} textValue={application.name}>
                                        <div style={{ backgroundColor: '#a9c1e8', marginBottom: '10px' }}>
                                            {application.name}<br/>
                                            <span>Status: {application.applicationStatus}</span><br/>
                                            <span>Gender: {application.gender}</span>
                                        </div>

                                    </Item>
                                )}
                            </ListBoxComponent>
                        </div>
                    ))

                    }
                </div>
            }

        </div >
    );
}

export default ReactAriaComponent;