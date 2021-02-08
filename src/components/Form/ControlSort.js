import React, { useRef, Children } from 'react';
import { useDrag, useDrop } from 'react-dnd';

// material
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// component customer
import { Input, HeadText } from 'components/ListControl';
import ItemTypes from 'components/Form/ItemTypes';

// style
import useStyles from 'assets/jss/components/form/control';
// id, text, index
export default function ControlSort({ data, moveControl }) {
  const classes = useStyles();
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.FORM,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      console.log(item);
      const dragIndex = item.index;
      const hoverIndex = data.index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveControl(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    item: { ...data, sort: true },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const renderControl = (type, index) => {
    switch (type) {
      case 'headding':
        return <HeadText key={index} />;
      case 'input':
        return <Input key={index} />;

      default:
        return;
    }
  };

  drag(drop(ref));
  return <div ref={ref}>{renderControl(data.control)}</div>;
}
