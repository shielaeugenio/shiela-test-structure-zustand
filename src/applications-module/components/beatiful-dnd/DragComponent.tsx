import { Draggable } from 'react-beautiful-dnd';

const DragComponent = (props: {children: any, index: number, draggableId: string}) => {
    const { draggableId, index, children} = props;
    return (
        <Draggable draggableId={draggableId} index={index}>
        {(provided) => (
            <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
            >
                {children}
            </div>
        )}
    </Draggable>
    );
}

export default DragComponent;