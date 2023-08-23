import React from 'react';
import { useDraggableCollectionState, useDroppableCollectionState, useListState } from 'react-stately';
import {
    ListDropTargetDelegate, ListKeyboardDelegate, mergeProps,
    useDroppableCollection, useDroppableItem, useFocusRing, useListBox, useOption, useDropIndicator, useDraggableCollection, useDraggableItem, useGridList, useGridListItem
} from 'react-aria';

const Option = (props: { item: any, state: any, dropState: any, dragState: any }) => {
    const { item, state, dropState, dragState } = props;
    // Setup listbox option as normal. See useListBox docs for details.
    let ref = React.useRef(null);
    let { gridCellProps } = useGridListItem({ node: item }, state, ref);
    let { isFocusVisible, focusProps } = useFocusRing();

    // Register the item as a drag source.
    let { dragProps } = useDraggableItem({
        key: item.key
    }, dragState);

    // Register the item as a drop target.
    let { dropProps, isDropTarget } = useDroppableItem(
        {
            target: { type: 'item', key: item.key, dropPosition: 'on' }
        },
        dropState,
        ref
    );

    // Merge option props and dnd props, and render the item.
    return (
        <>
            <DropIndicator
                target={{ type: 'item', key: item.key, dropPosition: 'before' }}
                dropState={dropState}
            />
            <li
                {...mergeProps(gridCellProps, dropProps, focusProps, dragProps)}
                ref={ref}
                // Apply a class when the item is the active drop target.
                className={`option ${isFocusVisible ? 'focus-visible' : ''} ${isDropTarget ? 'drop-target' : ''
                    }`}
            >
                {item.rendered}
            </li>
        </>

    );
}


const DropIndicator = (props: any) => {
    let ref = React.useRef(null);
    let { dropIndicatorProps, isHidden, isDropTarget } = useDropIndicator(
        props,
        props.dropState,
        ref
    );
    if (isHidden) {
        return null;
    }

    return (
        <li
            {...dropIndicatorProps}
            role="option"
            ref={ref}
            className={`drop-indicator ${isDropTarget ? 'drop-target' : ''}`}
        />
    );
}

const ListBoxComponent = (props: any) => {
    // Setup listbox as normal. See the useListBox docs for more details.
    let state = useListState(props);
    let ref = React.useRef(null);
    let { gridProps } = useGridList(props, state, ref);

    // Setup react-stately and react-aria hooks for drag and drop.
    let dropState = useDroppableCollectionState({
        ...props,
        // Collection and selection manager come from list state.
        collection: state.collection,
        selectionManager: state.selectionManager,
        
    });

    let { collectionProps } = useDroppableCollection(
        {
            ...props,
            // Provide drop targets for keyboard and pointer-based drag and drop.
            keyboardDelegate: new ListKeyboardDelegate(
                state.collection,
                state.disabledKeys,
                ref
            ),
            dropTargetDelegate: new ListDropTargetDelegate(state.collection, ref)
        },
        dropState,
        ref
    );

    // Setup drag state for the collection.
    let dragState = useDraggableCollectionState({
        // Pass through events from props.
        ...props,

        // Collection and selection manager come from list state.
        collection: state.collection,
        selectionManager: state.selectionManager,

        // Provide data for each dragged item. This function could
        // also be provided by the user of the component.
        getItems: props.getItems || ((keys) => {

            return [...keys].map((key) => {
                let item = state.collection.getItem(key);

                console.log('>> item', item);
                return {
                    'item': item
                };
            });
        })
    });

    useDraggableCollection(props, dragState, ref);

    // Merge listbox props and dnd props, and render the items as normal.
    return (
        <ul {...mergeProps(gridProps, collectionProps)} ref={ref} style={{listStyleType: 'none', paddingLeft: '0'}}>
            {[...state.collection].map((item) => (
                <Option
                    key={item.key}
                    item={item}
                    state={state}
                    dropState={dropState}
                    dragState={dragState}
                />
            ))}
        </ul>
    );
}

export default ListBoxComponent;