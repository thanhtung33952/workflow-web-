import React, { useRef } from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// redux
import { connect } from 'react-redux';
import {
  seleteSingleRow,
  selectedControl,
  toggleModalElement,
  deleteControl
} from 'actions';

import classNames from 'classnames';
import { useDrag, useDrop } from 'react-dnd';
import { makeStyles } from '@material-ui/core/styles';

// @material-ui
import Button from '@material-ui/core/Button';
// @material-icons
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Clear';

// control component
import LabelControl from 'components/CustomForm/Controls/LabelControl.js';
import TextboxControl from 'components/CustomForm/Controls/TextboxControl.js';
import CheckboxControl from 'components/CustomForm/Controls/CheckboxControl.js';
import RadioControl from 'components/CustomForm/Controls/RadioControl.js';
import SelectControl from 'components/CustomForm/Controls/SelectControl.js';
import LineControl from 'components/CustomForm/Controls/LineControl.js';

// common
import { isNullOrUndefined } from 'utils/helpers';

// constant
import { ItemTypes } from './ItemTypes.js';

const useStyles = makeStyles(() => ({
  rowItem: {
    display: 'flex',
    textAlign: 'center',
    border: '2px dashed gray',
    cursor: 'move',
    margin: 10,
    '& div:last-child': {
      borderRight: 'none !important'
    }
  },
  colItem: {
    borderRight: '2px dashed gray',
    padding: 5,
    boxSizing: 'border-box'
  },
  colItem_1_1: {
    width: '100%'
  },
  colItem_1_2: {
    width: '50%'
  },
  colItem_1_3: {
    width: `${100 / 3}%`
  },
  colItem_1_4: {
    width: `${100 / 4}%`
  },
  colItem_2_3__1_3: {
    '&:nth-child(1)': {
      width: `${(2 / 3) * 100}%`
    },
    '&:nth-child(2)': {
      width: `${(1 / 3) * 100}%`
    }
  },
  colItem_1_3__2_3: {
    '&:nth-child(1)': {
      width: `${(1 / 3) * 100}%`
    },
    '&:nth-child(2)': {
      width: `${(2 / 3) * 100}%`
    }
  },
  colItem_1_4__3_4: {
    '&:nth-child(1)': {
      width: `${(1 / 4) * 100}%`
    },
    '&:nth-child(2)': {
      width: `${(3 / 4) * 100}%`
    }
  },
  colItem_3_4__1_4: {
    '&:nth-child(1)': {
      width: `${(3 / 4) * 100}%`
    },
    '&:nth-child(2)': {
      width: `${(1 / 4) * 100}%`
    }
  },
  colItem_1_2__1_4__1_4: {
    '&:nth-child(1)': {
      width: '50%'
    },
    '&:nth-child(2)': {
      width: `${(1 / 4) * 100}%`
    },
    '&:nth-child(3)': {
      width: `${(1 / 4) * 100}%`
    }
  },
  colItem_1_4__1_4__1_2: {
    '&:nth-child(1)': {
      width: `${(1 / 4) * 100}%`
    },
    '&:nth-child(2)': {
      width: `${(1 / 4) * 100}%`
    },
    '&:nth-child(3)': {
      width: '50%'
    }
  },
  colItem_1_4__1_2__1_4: {
    '&:nth-child(1)': {
      width: `${(1 / 4) * 100}%`
    },
    '&:nth-child(2)': {
      width: '50%'
    },
    '&:nth-child(3)': {
      width: `${(1 / 4) * 100}%`
    }
  },
  colItem_1_5__4_5: {
    '&:nth-child(1)': {
      width: `${(1 / 5) * 100}%`
    },
    '&:nth-child(2)': {
      width: `${(4 / 5) * 100}%`
    }
  },
  colItem_4_5__1_5: {
    '&:nth-child(1)': {
      width: `${(4 / 5) * 100}%`
    },
    '&:nth-child(2)': {
      width: `${(1 / 5) * 100}%`
    }
  },
  colItem_3_5__2_5: {
    '&:nth-child(1)': {
      width: `${(3 / 5) * 100}%`
    },
    '&:nth-child(2)': {
      width: `${(2 / 5) * 100}%`
    }
  },
  colItem_2_5__3_5: {
    '&:nth-child(1)': {
      width: `${(2 / 5) * 100}%`
    },
    '&:nth-child(2)': {
      width: `${(3 / 5) * 100}%`
    }
  },
  colItem_1_5__1_5__3_5: {
    '&:nth-child(1)': {
      width: `${(1 / 5) * 100}%`
    },
    '&:nth-child(2)': {
      width: `${(1 / 5) * 100}%`
    },
    '&:nth-child(3)': {
      width: `${(3 / 5) * 100}%`
    }
  },
  colItem_1_5__3_5__1_5: {
    '&:nth-child(1)': {
      width: `${(1 / 5) * 100}%`
    },
    '&:nth-child(2)': {
      width: `${(3 / 5) * 100}%`
    },
    '&:nth-child(3)': {
      width: `${(1 / 5) * 100}%`
    }
  },
  colItem_1_2__1_6__1_6__1_6: {
    '&:nth-child(1)': {
      width: '50%'
    },
    '&:nth-child(2)': {
      width: `${(1 / 6) * 100}%`
    },
    '&:nth-child(3)': {
      width: `${(1 / 6) * 100}%`
    },
    '&:nth-child(4)': {
      width: `${(1 / 6) * 100}%`
    }
  },
  colItem_1_6__1_6__1_6__1_2: {
    '&:nth-child(1)': {
      width: `${(1 / 6) * 100}%`
    },
    '&:nth-child(2)': {
      width: `${(1 / 6) * 100}%`
    },
    '&:nth-child(3)': {
      width: `${(1 / 6) * 100}%`
    },
    '&:nth-child(4)': {
      width: '50%'
    }
  },
  colItem_1_6__2_3__1_6: {
    '&:nth-child(1)': {
      width: `${(1 / 6) * 100}%`
    },
    '&:nth-child(2)': {
      width: `${(2 / 3) * 100}%`
    },
    '&:nth-child(3)': {
      width: `${(1 / 6) * 100}%`
    }
  },
  colItemError: {
    color: 'red',
    textAlign: 'center'
  },
  selected: {
    borderStyle: 'solid',
    borderColor: '#2196f3'
  },
  btnAddElement: {
    width: '100%',
    maxWidth: 100
  },
  rootControl: {
    position: 'relative',
    cursor: 'pointer'
  },
  iconDelete: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: '#FE5576',
    color: '#fff',
    padding: 2,
    boxSizing: 'border-box',
    top: 'calc(50% - 10px)',
    right: 10,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#e61840'
    }
  }
}));

function RowItem(props) {
  const { id, index, type, isSelected, cols, moveRow, dispatch } = props;
  const classes = useStyles();

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.ROWITEM,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
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
      moveRow(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.ROWITEM, id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  // handle selected row
  const handleSeledted = e => {
    e.stopPropagation();
    dispatch(seleteSingleRow(id));
  };

  // handle selected control
  const handleSelectControl = (colID, elID) => e => {
    e.stopPropagation();
    dispatch(selectedControl(id, colID, elID));
  };

  const handleAddNewElement = (rowID, colID) => e => {
    e.stopPropagation();
    dispatch(toggleModalElement(rowID, colID));
  };

  // render column item
  const renderColItem = colType => {
    // col error
    if (isNullOrUndefined(cols) || cols.length === 0) {
      return <div className={classes.colItemError}>Error</div>;
    }

    // col item
    return cols.map(item => {
      return (
        <div
          key={item.id}
          className={classNames({
            [classes.colItem]: true,
            [classes.colItem_1_1]: colType === '1_1',
            [classes.colItem_1_2]: colType === '1_2',
            [classes.colItem_1_3]: colType === '1_3',
            [classes.colItem_1_4]: colType === '1_4',
            [classes.colItem_2_3__1_3]: colType === '2_3__1_3',
            [classes.colItem_1_3__2_3]: colType === '1_3__2_3',
            [classes.colItem_1_4__3_4]: colType === '1_4__3_4',
            [classes.colItem_3_4__1_4]: colType === '3_4__1_4',
            [classes.colItem_1_2__1_4__1_4]: colType === '1_2__1_4__1_4',
            [classes.colItem_1_4__1_2__1_4]: colType === '1_4__1_2__1_4',
            [classes.colItem_1_5__4_5]: colType === '1_5__4_5',
            [classes.colItem_4_5__1_5]: colType === '4_5__1_5',
            [classes.colItem_3_5__2_5]: colType === '3_5__2_5',
            [classes.colItem_2_5__3_5]: colType === '2_5__3_5',
            [classes.colItem_1_5__1_5__3_5]: colType === '1_5__1_5__3_5',
            [classes.colItem_1_5__3_5__1_5]: colType === '1_5__3_5__1_5',
            [classes.colItem_1_2__1_6__1_6__1_6]:
              colType === '1_2__1_6__1_6__1_6',
            [classes.colItem_1_6__1_6__1_6__1_2]:
              colType === '1_6__1_6__1_6__1_2',
            [classes.colItem_1_6__2_3__1_6]: colType === '1_6__2_3__1_6'
          })}
        >
          {renderElementItem(id, item.id, item.elements)}
        </div>
      );
    });
  };

  // delete control in colum
  const handleDeleteControl = (rowID, colID, elID) => e => {
    e.stopPropagation();
    dispatch(deleteControl(rowID, colID, elID));
  };

  // render element item
  const renderElementItem = (rowID, colID, elements) => {
    // button add element
    if (isNullOrUndefined(elements) || elements.length === 0) {
      return (
        <Button
          variant="outlined"
          color="primary"
          className={classes.btnAddElement}
          onClick={handleAddNewElement(rowID, colID)}
        >
          <AddIcon />
        </Button>
      );
    }

    return elements.map(el => {
      return (
        <div
          key={el.id}
          className={classes.rootControl}
          onClick={handleSelectControl(colID, el.id)}
        >
          {renderControl(el)}
          <DeleteIcon
            className={classes.iconDelete}
            onClick={handleDeleteControl(rowID, colID, el.id)}
          />
        </div>
      );
    });
  };

  const renderControl = el => {
    switch (el.type) {
      case 'CTRL_LABEL':
        return <LabelControl data={el} />;

      case 'CTRL_TEXT':
        return <TextboxControl data={el} type="text" />;

      case 'CTRL_TEXTAREA':
        return <TextboxControl data={el} type="textarea" title="TextArea" />;

      case 'CTRL_RADIO':
        return <RadioControl data={el} />;

      case 'CTRL_CHECKBOX':
        return <CheckboxControl data={el} />;

      case 'CTRL_SELECT':
        return <SelectControl data={el} />;

      case 'CTRL_LINE':
        return <LineControl data={el} />;

      // case 'CTRL_EMAIL':
      //   return <TextboxControl type="email" title="Email" />;

      // case 'CTRL_NUMBER':
      //   return <TextboxControl type="number" title="Number" />;

      // case 'CTRL_PHONE':
      //   return <TextboxControl type="phone" title="Phone" />;

      // case 'CTRL_DATE':
      //   return <TextboxControl type="date" title="Date" />;

      default:
        return <div>NULL</div>;
    }
  };

  return (
    <div
      className={classNames({
        [classes.rowItem]: true,
        [classes.selected]: isSelected
      })}
      ref={ref}
      style={{ opacity }}
      onClick={handleSeledted}
    >
      {renderColItem(type)}
    </div>
  );
}

RowItem.propTypes = {
  dispatch: PropTypes.any,
  id: PropTypes.number,
  index: PropTypes.number,
  type: PropTypes.string,
  isSelected: PropTypes.bool,
  cols: PropTypes.array,
  moveRow: PropTypes.func
};

export default connect()(RowItem);
