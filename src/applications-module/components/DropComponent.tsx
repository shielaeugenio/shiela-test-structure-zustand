import { Droppable } from 'react-beautiful-dnd';
import { Application } from '../models/application';
import DragComponent from './DragComponent';

const DropComponent = (props: { applications: Application[], dropId: string}) => {

    const { applications, dropId} = props;
    return (
        <Droppable droppableId={dropId}>
        {(provided) => (
            <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ border: "1px solid black", backgroundColor: "#e6edf0", padding: "1px" }}>
                <h1>{dropId}</h1>
                {applications.map((application, applicationIndex) => (
                    <DragComponent application={application} id={applicationIndex} key={applicationIndex}/>
                ))}
                {provided.placeholder}
            </div>
        )}
    </Droppable>
    );
}

export default DropComponent;