import React from 'react';
import {useDraggable} from '@dnd-kit/core';

const DragComponent = (props: { children: any, id: string, currentLane: string}) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
    data: {
      currentLane: props.currentLane
    }
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  
  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}

export default DragComponent;