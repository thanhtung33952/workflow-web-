import React, { useRef } from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// redux
import { connect } from 'react-redux';

import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

// @material-ui

// control component
import LabelControl from 'components/CustomForm/Controls/LabelControl.js';
import TextboxControl from 'components/CustomForm/Controls/TextboxControl.js';
import CheckboxControl from 'components/CustomForm/Controls/CheckboxControl.js';
import RadioControl from 'components/CustomForm/Controls/RadioControl.js';
import SelectControl from 'components/CustomForm/Controls/SelectControl.js';
import LineControl from 'components/CustomForm/Controls/LineControl.js';

// common
import { isNullOrUndefined } from 'utils/helpers';

const useStyles = makeStyles(() => ({
  row: {
    display: 'flex',
    width: '100%',
    marginBottom: 20
  },
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
    boxSizing: 'border-box',
    paddingLeft: 15,
    paddingRight: 15
  },
  col_1_1: {
    width: '100%'
  },
  col_1_2: {
    width: '50%'
  },
  col_1_3: {
    width: `${100 / 3}%`
  },
  col_1_4: {
    width: `${100 / 4}%`
  },
  col_1_5: {
    width: `${(1 / 5) * 100}%`
  },
  col_1_6: {
    width: `${(1 / 6) * 100}%`
  },
  col_2_3: {
    width: `${(2 / 3) * 100}%`
  },
  col_2_5: {
    width: `${(2 / 5) * 100}%`
  },
  col_3_4: {
    width: `${(3 / 4) * 100}%`
  },
  col_3_5: {
    width: `${(3 / 5) * 100}%`
  },
  col_4_5: {
    width: `${(4 / 5) * 100}%`
  }
}));

function RowItem(props) {
  const { key, id, type, cols } = props;
  const classes = useStyles();

  const randomClass = (type, i) => {
    if (isNullOrUndefined(type)) return;

    let arrCol = type.split('__');
    let classCol = !isNullOrUndefined(arrCol[i]) ? arrCol[i] : arrCol[0];
    classCol = `col_${classCol}`;
    return classCol;
  };

  // render column item
  const renderColItem = colType => {
    // col error
    if (isNullOrUndefined(cols) || cols.length === 0) {
      return;
    }

    // col item
    return cols.map((item, i) => {
      // render class column
      const classCol = randomClass(colType, i);
      return (
        <div
          key={item.id}
          className={classNames(classes.colItem, classes[classCol])}
        >
          {renderElementItem(item.elements)}
        </div>
      );
    });
  };

  // render element item
  const renderElementItem = elements => {
    if (isNullOrUndefined(elements) || elements.length === 0) {
      return;
    }

    return elements.map(el => {
      return renderControl(el);
    });
  };

  const renderControl = el => {
    switch (el.type) {
      case 'CTRL_LABEL':
        return <LabelControl data={el} isReality={true} />;

      case 'CTRL_TEXT':
        return (
          <TextboxControl data={el} type="text" title="" isReality={true} />
        );

      case 'CTRL_TEXTAREA':
        return (
          <TextboxControl data={el} type="textarea" title="" isReality={true} />
        );

      case 'CTRL_RADIO':
        return <RadioControl data={el} isReality={true} />;

      case 'CTRL_CHECKBOX':
        return <CheckboxControl data={el} isReality={true} />;

      case 'CTRL_SELECT':
        return <SelectControl data={el} isReality={true} />;

      case 'CTRL_LINE':
        return <LineControl data={el} />;

      default:
        return;
    }
  };

  return (
    <div className={classes.row} key={key}>
      {renderColItem(type)}
    </div>
  );
}

RowItem.propTypes = {
  dispatch: PropTypes.any,
  key: PropTypes.number,
  id: PropTypes.number,
  type: PropTypes.string,
  cols: PropTypes.array
};

export default connect()(RowItem);
