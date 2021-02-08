import React, { useState } from 'react';
import PropTypes from 'prop-types';
// material ui
import { TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import { isNullOrUndefined } from 'utils/helpers';
import LockIcon from '@material-ui/icons/LockOpen';
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
  iconInput: {
    zIndex: 999,
    color: theme.palette.grey.light,
    '& svg': {
      fontSize: 20
    }
  },
  thisInput: {
    padding: 12,
    borderRadius: 0,
    zIndex: 2,
    color: '#616161'
  },
  adornedEnd: {
    paddingRight: 0
  }
}));
function InputPasswordControl(props) {
  const classes = useStyles();

  const { field, form, placeholder, disabled, className, autoComplete } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name] ? true : false;

  return (
    <TextField
      {...field}
      id={name}
      type={'password'}
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
          error: classes.thisInputError,
          adornedEnd: classes.adornedEnd
        },
        startAdornment: (
          <InputAdornment position="start" className={classes.iconInput}>
            <LockIcon />
          </InputAdornment>
        )
      }}
      autoComplete={autoComplete}
    />
  );
}
InputPasswordControl.propTypes = {
  ield: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  className: PropTypes.node,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool
};

InputPasswordControl.defaultProps = {
  type: 'text',
  placeholder: '',
  disabled: false,
  autoComplete: ''
};
export default InputPasswordControl;
