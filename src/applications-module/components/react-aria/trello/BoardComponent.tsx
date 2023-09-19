// import { DroppableCollectionUtilityOptions } from "@react-types/shared";
// import { useRef } from "react";
// import { ListDropTargetDelegate, ListKeyboardDelegate, isTextDropItem, useDroppableCollection, useListBox } from "react-aria";
// import { useDroppableCollectionState, useListData, useListState } from "react-stately";

// type Lane = {
//     id: string;
//     cards: { id: string; name: string; }
// }
// type Props = {
//     children: any;
// }

// const App = () => {
//     return (
//         <BoardComponent>
//             <div key="1">Lane 1</div>
//             <div key="2">Lane 2</div>
//             <div key="3">Lane 3</div>
//         </BoardComponent>
//     )
// }
// const BoardComponent = (props: Props) => {
//     let state = useListState({
//         collection: props.children
//     });
//     let ref = useRef(null);

//     // Setup react-stately and react-aria hooks for drag and drop.
//     let dropState = useDroppableCollectionState({
//         collection: state.collection,
//         selectionManager: state.selectionManager
//     });

//     let { collectionProps } = useDroppableCollection(
//         {
//             keyboardDelegate: new ListKeyboardDelegate(
//                 state.collection,
//                 state.disabledKeys,
//                 ref
//             ),
//             dropTargetDelegate: new ListDropTargetDelegate(state.collection, ref)
//         },
//         dropState,
//         ref
//     );
    

//     return (
//         <div
//             aria-label="board"
//             selectionMode="multiple"
//             selectionBehavior="replace"
//             items={list.items}
//             {...droppableCollectionOptions}
//             dropState={dropState}
//         >
//             {...props.children}
//         </div>
//     );
// }