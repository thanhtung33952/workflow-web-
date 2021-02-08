import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

// nodejs library to set properties for components
import PropTypes from 'prop-types';

// @material-ui
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import FormControl from '@material-ui/core/FormControl';

// common
import { isNullOrUndefined } from 'utils/helpers';
import { isNullOrEmpty } from 'utils/helpers';

const useStyles = makeStyles(() => ({
  checkboxGroup: {
    display: 'flex'
  },
  vertical: {
    flexDirection: 'row'
  }
}));

function CheckboxControl(props) {
  const { data, isReality } = props;
  const classes = useStyles();

  const findDefaultOption = () => {
    let opDefault = '';
    if (isNullOrUndefined(data) || data.options.length === 0) return opDefault;

    data.options.map(op => {
      if (op.default) opDefault = op.label;
    });
    return opDefault;
  };

  const disabled = isNullOrUndefined(isReality) ? true : false;

  const defaultValue = findDefaultOption();

  const styleProps = makeStyles(() => ({
    checkboxStyle: {
      flexDirection: data.display === 'vertical' ? 'row' : 'column',
      alignItems:
        data.align === 'right'
          ? 'flex-end'
          : data.align === 'center'
          ? 'center'
          : 'start',
      justifyContent:
        data.align === 'right'
          ? 'flex-end'
          : data.align === 'center'
          ? 'center'
          : 'start'
    }
  }));
  const classesProp = styleProps();
  // output
  return (
    <div
      style={{ width: !isNullOrEmpty(data.width) ? `${data.width}%` : 'auto' }}
    >
      <FormGroup
        name="Checkbox"
        className={classNames(classes.checkboxGroup, classesProp.checkboxStyle)}
      >
        {!isNullOrUndefined(data) && data.options.length > 0 ? (
          data.options.map(op => {
            return (
              <FormControlLabel
                key={op.id}
                disabled={disabled}
                value={op.label}
                control={
                  disabled ? (
                    <Checkbox checked={op.default} />
                  ) : (
                    <Checkbox defaultChecked={op.default} />
                  )
                }
                label={op.label}
              />
            );
          })
        ) : (
          <>
            <FormControlLabel
              disabled={disabled}
              value="female"
              control={<Checkbox />}
              label="Checkbox 1"
            />
            <FormControlLabel
              disabled={disabled}
              value="male"
              control={<Checkbox />}
              label="Checkbox 2"
            />
          </>
        )}
      </FormGroup>
    </div>
  );
}

CheckboxControl.propTypes = {
  data: PropTypes.object,
  isReality: PropTypes.bool // isReality: true => người dùng nhập dữ liệu <> layout admin\
};

export default CheckboxControl;
