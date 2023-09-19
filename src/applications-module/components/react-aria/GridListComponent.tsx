import { useObjectRef } from '@react-aria/utils';
import { DraggableCollectionProps, DroppableCollectionReorderEvent, DroppableCollectionUtilityOptions } from '@react-types/shared';
import { useEffect, useRef } from 'react';
import {AriaGridListProps, DragItem, DraggableCollectionEndEvent, DraggableCollectionStartEvent, DropIndicatorProps, DropTarget, ListDropTargetDelegate, ListKeyboardDelegate, isTextDropItem, mergeProps, useDraggableCollection, useDraggableItem, useDropIndicator, useDroppableCollection, useFocusRing, useGridList, useListBox, useOption} from 'react-aria';
import {DraggableCollectionState, DroppableCollectionState, Item, ListProps, ListState, useCollection, useDraggableCollectionState, useDroppableCollectionState, useListData, useListState, Node} from 'react-stately';

// interface GridListProps<T> extends Omit<AriaGridListProps<T>, 'children'>, CollectionProps<T> {
//   onReorder?: (e: DroppableCollectionReorderEvent) => void,
// }

const ReorderableListBox = <T extends object>(props: ListProps<T> | { id: string }) => {
    let state = useListState(props as ListProps<T>);
    let ref = useRef(null);
    let { listBoxProps } = useListBox(props, state, ref);

      // Setup drag state for the collection.
  let dragState = useDraggableCollectionState({
    // Pass through events from props.
    ...props,

    // Collection and selection manager come from list state.
    collection: state.collection,
    selectionManager: state.selectionManager,

    ...props as DraggableCollectionProps

    // Provide data for each dragged item. This function could
    // also be provided by the user of the component.
    // getItems: (keys) => {
    //   return [...keys].map((key) => {
    //     let item = state.collection.getItem(key);

    //     return {
    //       'text/plain': item?.textValue
    //     } as DragItem;
    //   });
    // },
    // async onDragStart (e: DraggableCollectionStartEvent) {
    //     console.log("onDragStart", e);
    //     (props as any).onReorder({
    //         keys: e.keys,
    //         target: { 
    //             dropPosition: 'before'
    //         } 
    //     });
    // },
    // onDragEnd: (e: DraggableCollectionEndEvent) => {
    //     console.log("onDragEnd", e);
    //     (props as any).onReorder({
    //         keys: e.keys,
    //         target: { 
    //             dropPosition: 'after'
    //         } 
    //     });
    // }
  });
  useDraggableCollection({}, dragState, ref);

  // Setup react-stately and react-aria hooks for dropping.
  let dropState = useDroppableCollectionState({
    ...props as DroppableCollectionUtilityOptions,
    collection: state.collection,
    selectionManager: state.selectionManager,
    getDropOperation: () => 'move',
  });

  let { collectionProps } = useDroppableCollection(
    {
      ...props,
      getDropOperation: () => 'move',
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

  return (
    <ul
      id={(props as { id: string }).id}
      {...mergeProps(listBoxProps, collectionProps)}
      ref={ref}
    >
      {[...state.collection].map((item) => (
        <ReorderableOption
          key={item.key}
          item={item}
          state={state}
          dragState={dragState}
          dropState={dropState}
        />
      ))}
    </ul>
  );
}

function ReorderableOption<T>(props: { item: Node<T>, state: ListState<T>, dragState: DraggableCollectionState, dropState: DroppableCollectionState }) {
    const { item, state, dragState, dropState } = props;

    let ref = useObjectRef<any>(item.props.ref);
    let { optionProps } = useOption({ key: item.key }, state, ref);
    let { isFocusVisible, focusProps } = useFocusRing();

    // Register the item as a drag source.
  let { dragProps } = useDraggableItem({
    key: item.key,
  }, dragState);

  return (
    <>
      <DropIndicator
        target={{ type: 'item', key: item.key, dropPosition: 'before' }}
        dropState={dropState}
      />
      <li
        {...mergeProps(optionProps, dragProps, focusProps)}
        ref={ref}
        className={`option ${isFocusVisible ? 'focus-visible' : ''}`}
      >
        {item.rendered}
      </li>
      {state.collection.getKeyAfter(item.key) == null &&
        (
          <DropIndicator
            target={{ type: 'item', key: item.key, dropPosition: 'after' }}
            dropState={dropState}
          />
        )}
    </>
  );
}

const DropIndicator = (props: { target: DropTarget, dropState: DroppableCollectionState }) => {
  let ref = useRef(null);
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

const GridListComponent = (props: { items: any[]; id: string }) => {
    let list = useListData({
      initialItems: [...props.items]
    });

    const droppableCollectionOptions: DraggableCollectionProps | DroppableCollectionUtilityOptions = {
      getItems: (keys) => {
        return [...keys].map((key) => {
          console.log("key", key);
          let item = list.getItem(key);
          return {
              'custom-app-type': JSON.stringify(item),
              'text/plain': item?.name
          };
        });
      },
      // onDragStart: (e) => {
      //   console.log("onDragStart", e);
      //   list.remove(...e.keys);
      // },
      onInsert: async (e) => {
        let processedItems = await Promise.all(
            e.items
                .filter(isTextDropItem)
                .map(async item => JSON.parse(await item.getText('custom-app-type')))
        );
        console.log("processedItems", e);
        console.log("processedItems", processedItems[0]);
        //list.remove(processedItems[0].id);
        if (e.target.dropPosition === 'before') {
            list.insertBefore(e.target.key, ...processedItems);
        } else if (e.target.dropPosition === 'after') {
            list.insertAfter(e.target.key, ...processedItems);
        }
        console.log("list", list);
      },
      async onRootDrop(e) {
        let processedItems = await Promise.all(
            e.items
                .filter(isTextDropItem)
                .map(async item => JSON.parse(await item.getText('custom-app-type')))
        );
        list.append(...processedItems);
      },
      onReorder: (e: any) => {
          console.log("onReorder", e);
        if (e.target.dropPosition === 'before') {
          console.log("before", e.target.key);
          list.moveBefore(e.target.key, e.keys);
        } else if (e.target.dropPosition === 'after') {
          console.log("after", e.target.key);
          list.moveAfter(e.target.key, e.keys);
        }
      },
      onDragEnd(e) {
        console.log("onDragEnd", e);
        if (e.dropOperation === 'move' && !e.isInternal) {
            list.remove(...e.keys);
        }
      }
    }

    // useEffect(() => {
    //     console.log("list", list.items);
    // }, [list.items])
  
    return (
      <ReorderableListBox
        aria-label={props.id}
        selectionMode="multiple"
        selectionBehavior="replace"
        items={list.items}
        {...droppableCollectionOptions}
      >
        {(item: any) => <Item>{item.name}<p>{item.id}</p></Item>}
      </ReorderableListBox>
    );
  }

export default GridListComponent;