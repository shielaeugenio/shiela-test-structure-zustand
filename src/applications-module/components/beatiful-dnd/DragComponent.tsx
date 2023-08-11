import { Draggable } from 'react-beautiful-dnd';

const DragComponent = (props: {children: any, index: number, draggableId: string, isDisabled: boolean}) => {
    const { draggableId, index, children, isDisabled} = props;
    return (
        <Draggable draggableId={draggableId} index={index} isDragDisabled={isDisabled}>
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