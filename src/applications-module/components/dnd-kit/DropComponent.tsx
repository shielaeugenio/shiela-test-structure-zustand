import React from 'react';
import {useDroppable} from '@dnd-kit/core';

const DropComponent = (props: { id: string, children: any}) => {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    backgroundColor: isOver? '#3287a8' : '#e6edf0',
    width: '40vw',
    height: '40vh',
    border: '1px solid black'
  };
  
  
  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

export default DropComponent;