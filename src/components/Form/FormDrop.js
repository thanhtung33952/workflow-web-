import React, { useState, useCallback } from 'react';
import { Button } from '@material-ui/core';
import { ConnectDropTarget, DropTargetMonitor, useDrop } from 'react-dnd';
import { DropTarget } from 'react-dnd';
import update from 'immutability-helper';

// component customer
import ControlSort from 'components/Form/ControlSort';

// style
import useStyles from 'assets/jss/pages/Customform/Addform';
export default function FormDrop(props) {
  const classes = useStyles();
  const { onDrop, accept } = props;
  const [listControl, setListControl] = useState([]);
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: accept,
    drop: (item, index) => {
      if (item && item.sort) return;
      setListControl([...listControl, { ...item, idForm: index.targetId }]);
      onDrop(item, index);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const handleMove = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = listControl[dragIndex];
      setListControl(
        update(listControl, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard]
          ]
        })
      );
    },
    [listControl]
  );
  console.log(listControl)

  const isActive = isOver && canDrop;

  let backgroundColor = '#fff';
  if (isActive) {
    backgroundColor = '#f3f3f3';
  } else if (canDrop) {
    backgroundColor = '#fff';
  }

  return (
    <>
      <div
        ref={drop}
        style={{
          backgroundColor: backgroundColor,
          minHeight: 200,
          width: '100%'
        }}
      >
        {listControl.map((el, i) => {
          return <ControlSort key={i} data={el} moveControl={handleMove} />;
        })}
      </div>
    </>
  );
}
