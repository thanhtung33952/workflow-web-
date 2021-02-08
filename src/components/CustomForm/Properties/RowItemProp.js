import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

// nodejs library to set properties for components
import PropTypes, { array } from 'prop-types';

// redux
import { connect } from 'react-redux';

// @material-ui
import { makeStyles } from '@material-ui/core/styles';

// common
import { isNullOrUndefined } from 'utils/helpers';

const useStyles = makeStyles(() => ({
  rowTemplate: {
    backgroundColor: '#aaa',
    cursor: 'pointer',
    marginTop: 5,
    textAlign: 'center',
    display: 'flex',
    border: '2px dashed #ccc',
    '& div:last-child': {
      borderRight: 'none !important'
    }
  },
  selected: {
    borderStyle: 'solid',
    borderColor: '#2196f3'
  },
  colTemplate: {
    width: '100%',
    padding: 0,
    borderRight: '2px dashed #ccc',
    boxSizing: 'border-box',
    textAlign: 'center',
    height: 38,
    lineHeight: '38px'
  },
  col_1_1: {
    width: '100%'
  },
  col_1_2: {
    width: `50%`
  },
  col_1_3: {
    width: `${(1 / 3) * 100}%`
  },
  col_1_4: {
    width: '25%'
  },
  col_2_3__1_3: {
    '&:nth-child(1)': {
      width: `${(2 / 3) * 100}%`
    },
    '&:nth-child(2)': {
      width: `${(1 / 3) * 100}%`
    }
  },
  col_1_3__2_3: {
    '&:nth-child(1)': {
      width: `${(1 / 3) * 100}%`
    },
    '&:nth-child(2)': {
      width: `${(2 / 3) * 100}%`
    }
  },
  col_1_4__3_4: {
    '&:nth-child(1)': {
      width: `${(1 / 4) * 100}%`
    },
    '&:nth-child(2)': {
      width: `${(3 / 4) * 100}%`
    }
  },
  col_3_4__1_4: {
    '&:nth-child(1)': {
      width: `${(3 / 4) * 100}%`
    },
    '&:nth-child(2)': {
      width: `${(1 / 4) * 100}%`
    }
  },
  col_1_2__1_4__1_4: {
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
  col_1_4__1_4__1_2: {
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
  col_1_4__1_2__1_4: {
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
  col_1_5__4_5: {
    '&:nth-child(1)': {
      width: `${(1 / 5) * 100}%`
    },
    '&:nth-child(2)': {
      width: `${(4 / 5) * 100}%`
    }
  },
  col_4_5__1_5: {
    '&:nth-child(1)': {
      width: `${(4 / 5) * 100}%`
    },
    '&:nth-child(2)': {
      width: `${(1 / 5) * 100}%`
    }
  },
  col_3_5__2_5: {
    '&:nth-child(1)': {
      width: `${(3 / 5) * 100}%`
    },
    '&:nth-child(2)': {
      width: `${(2 / 5) * 100}%`
    }
  },
  col_2_5__3_5: {
    '&:nth-child(1)': {
      width: `${(2 / 5) * 100}%`
    },
    '&:nth-child(2)': {
      width: `${(3 / 5) * 100}%`
    }
  },
  col_1_5__1_5__3_5: {
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
  col_1_5__3_5__1_5: {
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
  col_1_2__1_6__1_6__1_6: {
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
  col_1_6__1_6__1_6__1_2: {
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
  col_1_6__2_3__1_6: {
    '&:nth-child(1)': {
      width: `${(1 / 6) * 100}%`
    },
    '&:nth-child(2)': {
      width: `${(2 / 3) * 100}%`
    },
    '&:nth-child(3)': {
      width: `${(1 / 6) * 100}%`
    }
  }
}));

function RowItemProp(props) {
  const { selectedItem, callbackChangeProps } = props;
  const classes = useStyles();
  const [rowLayoutType, setRowLayoutType] = useState(
    !isNullOrUndefined(selectedItem) ? selectedItem : ''
  );

  // update state when props change
  useEffect(
    () =>
      setRowLayoutType(!isNullOrUndefined(selectedItem) ? selectedItem : ''),
    [selectedItem]
  );

  const handleSeleteRowType = type => () => {
    setRowLayoutType(type);

    // callback
    if (!isNullOrUndefined(callbackChangeProps)) {
      callbackChangeProps({ rowLayoutType: type });
    }
  };

  const renderRow = type => {
    const arrType = {
      row_1_1: ['1/1'],
      row_1_2: ['1/2', '1/2'],
      row_1_3: ['1/3', '1/3', '1/3'],
      row_1_4: ['1/4', '1/4', '1/4', '1/4'],
      row_2_3__1_3: ['2/3', '1/3'],
      row_1_3__2_3: ['1/3', '2/3'],
      row_1_4__3_4: ['1/4', '3/4'],
      row_3_4__1_4: ['3/4', '1/4'],
      row_1_2__1_4__1_4: ['1/2', '1/4', '1/4'],
      row_1_4__1_4__1_2: ['1/4', '1/4', '1/2'],
      row_1_4__1_2__1_4: ['1/4', '1/2', '1/4'],
      row_1_5__4_5: ['1/5', '4/5'],
      row_4_5__1_5: ['4/5', '1/5'],
      row_3_5__2_5: ['3/5', '2/5'],
      row_2_5__3_5: ['2/5', '3/5'],
      row_1_5__1_5__3_5: ['1/5', '1/5', '3/5'],
      row_1_5__3_5__1_5: ['1/5', '3/5', '1/5'],
      row_1_2__1_6__1_6__1_6: ['1/2', '1/6', '1/6', '1/6'],
      row_1_6__1_6__1_6__1_2: ['1/6', '1/6', '1/6', '1/2'],
      row_1_6__2_3__1_6: ['1/6', '2/3', '1/6']
    };
    const rowRender = arrType[`row_${type}`];
    return (
      <div
        className={classNames({
          [classes.rowTemplate]: true,
          [classes.selected]: rowLayoutType === type ? true : false
        })}
        onClick={handleSeleteRowType(type)}
      >
        {rowRender.map((col, i) => {
          return (
            <div
              key={i}
              className={classNames({
                [classes.colTemplate]: true,
                [classes[`col_${type}`]]: true
              })}
            >
              {col}
            </div>
          );
        })}
      </div>
    );
  };

  // output
  return (
    <div>
      {/** Grid template */}
      <div className={classes.gridTemplate}>
        {/** Row 1_1 */}
        {renderRow('1_1')}

        {/** Row 1_2 */}
        {renderRow('1_2')}

        {/** Row 1_3 */}
        {renderRow('1_3')}

        {/** Row 1_4 */}
        {renderRow('1_4')}

        {/** Row 2_3__1_3 */}
        {renderRow('2_3__1_3')}

        {/** Row 1_3__2_3 */}
        {renderRow('1_3__2_3')}

        {/** Row 1_4__3_4 */}
        {renderRow('1_4__3_4')}

        {/** Row 3_4__1_4 */}
        {renderRow('3_4__1_4')}

        {/** Row 1_2__1_4__1_4 */}
        {renderRow('1_2__1_4__1_4')}

        {/** Row 1_4__1_4__1_2 */}
        {renderRow('1_4__1_4__1_2')}

        {/** Row 1_4__1_2__1_4 */}
        {renderRow('1_4__1_2__1_4')}

        {/** Row 1_5__4_5 */}
        {renderRow('1_5__4_5')}

        {/** Row 4_5__1_5 */}
        {renderRow('4_5__1_5')}

        {/** Row 3_5__2_5 */}
        {renderRow('3_5__2_5')}

        {/** Row 2_5__3_5 */}
        {renderRow('2_5__3_5')}

        {/** Row 1_5__1_5__3_5 */}
        {renderRow('1_5__1_5__3_5')}

        {/** Row 1_5__3_5__1_5 */}
        {renderRow('1_5__3_5__1_5')}

        {/** Row 1_2__1_6__1_6__1_6 */}
        {renderRow('1_2__1_6__1_6__1_6')}

        {/** Row 1_6__1_6__1_6__1_2 */}
        {renderRow('1_6__1_6__1_6__1_2')}

        {/** Row 1_6__2_3__1_6 */}
        {renderRow('1_6__2_3__1_6')}
      </div>
    </div>
  );
}

RowItemProp.propTypes = {
  selectedItem: PropTypes.string,
  callbackChangeProps: PropTypes.func
};

export default RowItemProp;
