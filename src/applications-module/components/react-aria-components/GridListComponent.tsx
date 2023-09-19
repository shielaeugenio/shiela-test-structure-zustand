import {useListData} from 'react-stately';
import {Button, GridList, GridListProps, Item, ItemProps, useDragAndDrop} from 'react-aria-components';

function MyGridList<T extends object>(
    { children, ...props }: GridListProps<T>
  ) {
    return (
      <GridList {...props}>
        {children}
      </GridList>
    );
  }

  function MyItem({ children, ...props }: ItemProps) {
    let textValue = typeof children === 'string' ? children : undefined;
    return (
      <Item textValue={textValue} {...props}>
        {({ selectionMode, selectionBehavior, allowsDragging }) => (
          <>
            {/* Add elements for drag and drop and selection. */}
            {allowsDragging && <Button slot="drag">≡</Button>}
            {/* {selectionMode === 'multiple' && selectionBehavior === 'toggle' && (
              <MyCheckbox />
            )} */}
            {children}
          </>
        )}
      </Item>
    );
  }

function GridListComponent() {
  let list = useListData({
    initialItems: [
      { id: 1, name: 'Adobe Photoshop' },
      { id: 2, name: 'Adobe XD' },
      { id: 3, name: 'Adobe Dreamweaver' },
      { id: 4, name: 'Adobe InDesign' },
      { id: 5, name: 'Adobe Connect' }
    ]
  });

  let { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys) =>
      [...keys].map((key) => ({ 'text/plain': list.getItem(key).name })),
    onReorder(e) {
      if (e.target.dropPosition === 'before') {
        list.moveBefore(e.target.key, e.keys);
      } else if (e.target.dropPosition === 'after') {
        list.moveAfter(e.target.key, e.keys);
      }
    }
  });

  return (
    <MyGridList
      aria-label="Reorderable list"
      selectionMode="multiple"
      items={list.items}
      dragAndDropHooks={dragAndDropHooks}
    >
      {(item) => <MyItem>{item.name}</MyItem>}
    </MyGridList>
  );
}

export default GridListComponent;