// import { useDraggableCollectionState, useListState } from "react-stately";

// const LaneComponent = (props: {}) => {
//     let state = useListState(props as ListProps<T>);
//     let ref = useRef(null);
//     let { listBoxProps } = useListBox(props, state, ref);

//     // Setup drag state for the collection.
//     let dragState = useDraggableCollectionState({
//         // Pass through events from props.
//         ...props,

//         // Collection and selection manager come from list state.
//         collection: state.collection,
//         selectionManager: state.selectionManager,

//         ...props as DraggableCollectionProps

//         // Provide data for each dragged item. This function could
//         // also be provided by the user of the component.
//         // getItems: (keys) => {
//         //   return [...keys].map((key) => {
//         //     let item = state.collection.getItem(key);

//         //     return {
//         //       'text/plain': item?.textValue
//         //     } as DragItem;
//         //   });
//         // },
//         // async onDragStart (e: DraggableCollectionStartEvent) {
//         //     console.log("onDragStart", e);
//         //     (props as any).onReorder({
//         //         keys: e.keys,
//         //         target: { 
//         //             dropPosition: 'before'
//         //         } 
//         //     });
//         // },
//         // onDragEnd: (e: DraggableCollectionEndEvent) => {
//         //     console.log("onDragEnd", e);
//         //     (props as any).onReorder({
//         //         keys: e.keys,
//         //         target: { 
//         //             dropPosition: 'after'
//         //         } 
//         //     });
//         // }
//     });

//     return (<ul
//         id={(props as { id: string }).id}
//         {...mergeProps(listBoxProps, collectionProps)}
//         ref={ref}
//     >
//         {[...state.collection].map((item) => (
//             <ReorderableOption
//                 key={item.key}
//                 item={item}
//                 state={state}
//                 dragState={dragState}
//             />
//         ))}
//     </ul>)
// }