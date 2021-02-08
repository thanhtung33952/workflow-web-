import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

// nodejs library to set properties for components
import PropTypes from 'prop-types';

// @material-ui
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// common
import { isNullOrUndefined } from 'utils/helpers';

const useStyles = makeStyles(() => ({
  textboxRoot: {
    cursor: 'pointer'
  },
  root: {
    '& label': {
      transform: 'translate(11px, 14px) scale(1)'
    }
  },
  rootArea: {
    '& .MuiOutlinedInput-multiline': {
      paddingTop: 10,
      paddingBottom: 10
    }
  }
}));

function TextboxControl(props) {
  const { data, title, type, isReality } = props;
  const classes = useStyles();
  
  const styleProps = makeStyles(() => ({
    inputStyle: {
      '& input': {
        textAlign: data.align ? data.align : 'left',
        paddingTop: 12,
        paddingBottom: 12
      }
    },
    textareaStyle: {
      '& textarea': {
        textAlign: data.align ? data.align : 'left',
        height: `${data.height ? data.height : 'auto'}px !important`
      }
    }
  }));
  const classesProp = styleProps();

  const disabled = isNullOrUndefined(isReality) ? true : false;

  // output
  return (
    <div className={classes.textboxRoot}>
      {type == 'textarea' ? (
        <TextField
          label={title}
          fullWidth={true}
          multiline={true}
          variant="outlined"
          disabled={disabled}
          placeholder=""
          defaultValue={data.value}
          style={{ width: `${data.width}%` }}
          className={classes.rootArea}
          InputProps={{
            className: classesProp.textareaStyle
          }}
        />
      ) : (
        <TextField
          label={title}
          fullWidth={true}
          variant="outlined"
          type={data.valueType}
          disabled={disabled}
          placeholder=""
          defaultValue={data.value}
          style={{ width: `${data.width}%` }}
          className={classes.root}
          InputProps={{
            className: classesProp.inputStyle
          }}
        />
      )}
    </div>
  );
}

TextboxControl.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  data: PropTypes.object,
  isReality: PropTypes.bool // isReality: true => người dùng nhập dữ liệu <> layout admin
};

TextboxControl.defaultProps = {
  title: 'Textbox',
  type: 'text',
  isReality: false
};

export default TextboxControl;
