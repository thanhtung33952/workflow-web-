import React from 'react';
import classNames from 'classnames';

// nodejs library to set properties for components
import PropTypes from 'prop-types';

// @material-ui
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

// common
import { isNullOrUndefined } from 'utils/helpers';
import { isNullOrEmpty } from 'utils/helpers';

const useStyles = makeStyles(() => ({
  radioGroup: {
    display: 'flex'
  },
  vertical: {
    flexDirection: 'row'
  }
}));

function RadioControl(props) {
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

  const styleProps = makeStyles(() => ({
    radioStyle: {
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
  const disabled = isNullOrUndefined(isReality) ? true : false;

  const defaultValue = findDefaultOption();

  // output
  return (
    <FormGroup
      style={{ width: !isNullOrEmpty(data.width) ? `${data.width}%` : 'auto' }}
    >
      <RadioGroup
        name="position"
        aria-label="position"
        className={classNames(classes.radioGroup, classesProp.radioStyle)}
        defaultValue={defaultValue}
      >
        {!isNullOrUndefined(data) && data.options.length > 0 ? (
          data.options.map(op => {
            return (
              <FormControlLabel
                key={op.id}
                disabled={disabled}
                value={op.label}
                control={disabled ? <Radio checked={op.default} /> : <Radio />}
                label={op.label}
              />
            );
          })
        ) : (
          <>
            <FormControlLabel
              disabled={disabled}
              value="Radio 1"
              control={<Radio />}
              label="Radio 1"
            />
            <FormControlLabel
              disabled={disabled}
              value="Radio 2"
              control={<Radio />}
              label="Radio 2"
            />
          </>
        )}
      </RadioGroup>
    </FormGroup>
  );
}

RadioControl.propTypes = {
  data: PropTypes.object,
  isReality: PropTypes.bool // isReality: true => người dùng nhập dữ liệu <> layout admin
};

export default RadioControl;
