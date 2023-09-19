import React from 'react';
import { useDraggableCollectionState, useDroppableCollectionState, useListData, useListState } from 'react-stately';
import {
    ListDropTargetDelegate, ListKeyboardDelegate, mergeProps,
    useDroppableCollection, useDroppableItem, useFocusRing, useListBox, useOption, useDropIndicator, useDraggableCollection, useDraggableItem, useGridList, useGridListItem, isTextDropItem
} from 'react-aria';
import { Item, ListBox, useDragAndDrop } from 'react-aria-components';
import { Application } from '../../models/application';

const ListBoxComponent = (props: {
    initialItems: Application[],
    ariaLabel: string
}) => {

    let list = useListData({
        initialItems: props.initialItems
    });

    let { dragAndDropHooks } = useDragAndDrop({
        // Provide drag data in a custom format as well as plain text.
        getItems(keys) {
            return [...keys].map((key) => {
                console.log("key", key);
                let item = list.getItem(key);
                return {
                    'custom-app-type': JSON.stringify(item),
                    'text/plain': item?.name
                };
            });
        },

        // Accept drops with the custom format.
        acceptedDragTypes: ['custom-app-type'],

        // Ensure items are always moved rather than copied.
        getDropOperation: () => 'move',

        // Handle drops between items from other lists.
        async onInsert(e) {
            let processedItems = await Promise.all(
                e.items
                    .filter(isTextDropItem)
                    .map(async item => {
                        const result = await item.getText('custom-app-type');
                        console.log(result);
                        return JSON.parse(await item.getText('custom-app-type'))
                    })
            );
            if (e.target.dropPosition === 'before') {
                list.insertBefore(e.target.key, ...processedItems);
            } else if (e.target.dropPosition === 'after') {
                list.insertAfter(e.target.key, ...processedItems);
            }
        },

        // Handle drops on the collection when empty.
        async onRootDrop(e) {
            let processedItems = await Promise.all(
                e.items
                    .filter(isTextDropItem)
                    .map(async item => JSON.parse(await item.getText('custom-app-type')))
            );
            list.append(...processedItems);
        },

        // Handle reordering items within the same list.
        onReorder(e) {
            if (e.target.dropPosition === 'before') {
                list.moveBefore(e.target.key, e.keys);
            } else if (e.target.dropPosition === 'after') {
                list.moveAfter(e.target.key, e.keys);
            }
        },

        // Remove the items from the source list on drop
        // if they were moved to a different list.
        onDragEnd(e) {
            if (e.dropOperation === 'move' && !e.isInternal) {
                list.remove(...e.keys);
            }
        }
    });

    // Merge listbox props and dnd props, and render the items as normal.
    return (
        <ListBox
            aria-label={props.ariaLabel}
            selectionMode="multiple"
            selectedKeys={list.selectedKeys}
            onSelectionChange={list.setSelectedKeys}
            items={list.items}
            dragAndDropHooks={dragAndDropHooks}
            renderEmptyState={() => 'Drop items here'}>
            {item => <Item>{item?.name}</Item>}
        </ListBox>
    );
}

export default ListBoxComponent;