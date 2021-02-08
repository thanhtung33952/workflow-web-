import React from 'react';
import classNames from 'classnames';

// nodejs library to set properties for components
import PropTypes from 'prop-types';

// @material-ui
import { makeStyles } from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

// common
import { isNullOrUndefined } from 'utils/helpers';
import { isNullOrEmpty } from 'utils/helpers';

const useStyles = makeStyles(() => ({
  selectGroup: {
    width: '100%',
    '& .MuiInput-underline:before': {
      borderBottom: 0
    }
  }
}));

function SelectControl(props) {
  const { data, isReality } = props;
  const classes = useStyles();

  const styleProps = makeStyles(() => ({
    selectStyle: {
      width: '100%',
      textAlign:
        data.align === 'right'
          ? 'right'
          : data.align === 'center'
          ? 'center'
          : 'left',
      '& select': {
        border: 'solid 1px',
        padding: 10
      }
    }
  }));
  const classesProp = styleProps();
  const disabled = isNullOrUndefined(isReality) ? true : false;
  // output
  return (
    <div
      style={{ width: !isNullOrEmpty(data.width) ? `${data.width}%` : 'auto' }}
    >
      <FormControl
        variant="outlined"
        className={classNames(classes.selectGroup)}
        disabled={disabled}
      >
        <NativeSelect
          name="name"
          inputProps={{
            id: 'select-control'
          }}
          className={classesProp.selectStyle}
        >
          {!isNullOrUndefined(data) && data.options.length > 0 ? (
            data.options.map(op => {
              return (
                <option key={op.id} value={op.label} selected={op.default}>
                  {op.label}
                </option>
              );
            })
          ) : (
            <option>Select</option>
          )}
        </NativeSelect>
      </FormControl>
    </div>
  );
}

SelectControl.propTypes = {
  data: PropTypes.object,
  isReality: PropTypes.bool // isReality: true => người dùng nhập dữ liệu <> layout admin
};

export default SelectControl;
