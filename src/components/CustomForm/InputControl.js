import React from 'react';
import PropTypes from 'prop-types';
// material ui
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { isNullOrUndefined, isNullOrEmpty } from 'utils/helpers';
// jss

const useStyles = makeStyles(theme => ({
    inputControl: {
        width: '100%',
        margin: 0,
        '& p': {
          margin: 0,
          fontSize: '0.75rem',
          lineHeight: '18px'
        }
    },
    rootInput: {
    '& fieldset': {
        borderRadius: 5,
        borderColor: theme.palette.grey.pale + `${'!important'}`,
        backgroundColor: '#fff'
    }
    },
    thisInputError: {
    '& fieldset': {
        borderColor: theme.palette.pink.main + `${'!important'}`
    }
    },
    thisInput: {
    padding: 12,
    borderRadius: 0,
    zIndex: 2,
    color: '#616161'
    },
}));
function InputControl(props) {
  const classes = useStyles();

  const {
    field,
    form,
    type,
    placeholder,
    disabled,
    className,
    autoComplete,
    toFixedNumber
  } = props;
  const { name, onBlur } = field;
  const { errors, touched, setFieldValue } = form;
  const showError = errors[name] && touched[name] ? true : false;
  const handleBlur = e => {
    onBlur(e);
    // đợi
    setTimeout(() => {
      const isError = touched[name] && errors[name];
      const isSuccess = touched[name] && !errors[name];
      const val = e.target.value;
      if (isError) {
        // console.log('validation error');
        return;
      }

      // validate success => format lại value 0.000
      if (isSuccess && toFixedNumber) {
        // trường hợp này không bắt validate (blur nhưng val === '')
        if (isNullOrUndefined(val)) return;
        // end case

        // console.log('validation success');
        let valFormat = formatNumber(val, toFixedNumber);
        setFieldValue(name, valFormat);
        return;
      }

      // trường hợp touched lần 1 đã success
      if (
        isNullOrUndefined(touched[name]) &&
        isNullOrEmpty(errors[name]) &&
        toFixedNumber
      ) {
        if (isNullOrUndefined(val)) return;
        let valFormat = formatNumber(val, toFixedNumber);
        setFieldValue(name, valFormat);
        return;
      }
    }, 0);
  };
  const formatNumber = (val, number) => {
    // number interger -> auto format
    if (Number.isInteger(parseFloat(val))) {
      return parseFloat(val).toFixed(number);
    }

    // length percent > 3 -> return prototype
    if (
      !isNullOrUndefined(val.split('.')[1]) &&
      val.split('.')[1].length > number
    ) {
      return val;
    } else return parseFloat(val).toFixed(number);
  };

  return (
    <TextField
      {...field}
      id={name}
      type={type}
      disabled={disabled}
      variant="outlined"
      placeholder={placeholder}
      error={showError}
      helperText={showError ? errors[name] : ''}
      className={
        !isNullOrUndefined(className) ? className : classes.inputControl
      }
      InputProps={{
        classes: {
          root: classes.rootInput,
          input: classes.thisInput,
          error: classes.thisInputError
        }
      }}
      autoComplete={autoComplete}
      onBlur={handleBlur}
    />
  );
}
InputControl.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  className: PropTypes.node,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool
};

InputControl.defaultProps = {
  type: 'text',
  placeholder: '',
  disabled: false,
  autoComplete: ''
};
export default InputControl;
