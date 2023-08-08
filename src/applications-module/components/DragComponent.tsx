import { Draggable } from 'react-beautiful-dnd';
import { Application } from '../models/application';

const DragComponent = (props: { application: Application, id: number}) => {
    const { application, id} = props;
    return (
        <Draggable draggableId={application.id} index={id}>
        {(provided) => (
            <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
            >
                <div style={{ backgroundColor: "#3287a8", margin: '3px' }}>
                    {application.id}: {application.name}    
                </div>
            </div>
        )}
    </Draggable>
    );
}

export default DragComponent;