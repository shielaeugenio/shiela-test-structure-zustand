import { Droppable } from 'react-beautiful-dnd';
import { Application } from '../../models/application';
import DragComponent from './DragComponent';

const DropComponent = (props: { children: any, droppableId: string, droppableTitle: string, isDisabled: boolean}) => {

    const { droppableId, droppableTitle, children, isDisabled} = props;
    return (
        <Droppable droppableId={droppableId} isDropDisabled={isDisabled}>
        {(provided) => (
            <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ border: "1px solid black", backgroundColor: "#e6edf0", padding: "1px" }}>
                <h1>{droppableTitle}</h1>
               {children}
               {provided.placeholder}
            </div>
        )}
    </Droppable>
    );
}
export default DropComponent;