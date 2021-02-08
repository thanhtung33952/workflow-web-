import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

// nodejs library to set properties for components
import PropTypes from 'prop-types';

// @material-ui
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  InputAdornment,
  FormControl,
  Select
} from '@material-ui/core';

// icons

// common
import { isNullOrUndefined } from 'utils/helpers';
import AlignText from 'components/Common/AlignText';

const useStyles = makeStyles(() => ({
  propertiesRoot: {
    color: '#fff',
    fontSize: '0.8rem',
    paddingTop: 15,
    paddingBottom: 15
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'baseline',
    '& span': {
      minWidth: 50
    }
  },
  control: {
    '& fieldset': {
      borderColor: '#fff !important'
    },
    '& input': {
      padding: '0 10px',
      height: 30,
      lineHeight: '30px',
      fontSize: '0.8rem',
      backgroundColor: '#fff'
    },
    '& textarea': {
      padding: '0 10px',
      fontSize: '0.8rem',
      backgroundColor: '#fff'
    }
  },
  fullControl: {
    flex: 1,
    marginLeft: 20
  },
  textAreaControl: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 2,
    '& fieldset': {
      borderColor: '#fff !important'
    }
  },
  lengthControl: {
    backgroundColor: '#fff',
    '& input': {
      textAlign: 'left'
    }
  },
  selectControl: {
    flex: 1,
    marginLeft: 20,
    color: '#000',
    '& select': {
      height: 30,
      lineHeight: '30px',
      fontSize: 14,
      background: '#fff !important',
      padding: '0 40px 0 20px',
      borderRadius: 3
    },
    '& fieldset': {
      borderColor: '#fff !important'
    }
  }
}));

function TextboxProperties(props) {
  const { data, callbackChangeProps } = props;
  const classes = useStyles();

  const [valForm, setValForm] = useState({
    id: 1,
    value: '',
    width: '',
    valueType: 'text',
    align: ''
  });

  useEffect(() => {
    if (!isNullOrUndefined(data)) setValForm(data);
  }, [data]);

  useEffect(() => {
    if (callbackChangeProps) {
      callbackChangeProps(valForm);
    }
  }, [valForm]);

  // change field txt
  const handleChangeTxt = name => e => {
    let val = e.target.value;
    setValForm({ ...valForm, [name]: val });
  };

  // output
  return (
    <div className={classes.propertiesRoot}>
      <div className={classes.row}>
        <span>ID︓</span>
        <TextField
          disabled={true}
          value={valForm.id}
          variant="outlined"
          className={classNames(classes.fullControl, classes.control)}
        />
      </div>
      <div className={classes.row}>
        <span>価値︓</span>
        <TextField
          value={valForm.value}
          variant="outlined"
          className={classNames(classes.fullControl, classes.control)}
          onChange={handleChangeTxt('value')}
        />
      </div>
      <div className={classes.row}>
        <span>⻑さ︓</span>
        <TextField
          variant="outlined"
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
            classes: {
              adornedEnd: classes.lengthControl
            }
          }}
          className={classNames(classes.fullControl, classes.control)}
          value={valForm.width}
          onChange={handleChangeTxt('width')}
        />
      </div>
      <div className={classes.row}>
        <span>値型︓</span>
        <FormControl variant="outlined" className={classes.selectControl}>
          <Select
            native
            value={valForm.valueType}
            onChange={e =>
              setValForm({ ...valForm, valueType: e.target.value })
            }
          >
            <option value={'text'}>Text</option>
            <option value={'number'}>Number</option>
            <option value={'password'}>Password</option>
          </Select>
        </FormControl>
      </div>
      <div className={classes.row}>
        <span>揃え︓</span>
        <AlignText
          alignProp={valForm.align}
          callbackChange={align => setValForm({ ...valForm, align: align })}
        />
      </div>
    </div>
  );
}

TextboxProperties.propTypes = {
  data: PropTypes.object,
  callbackChangeProps: PropTypes.func
};

// TextboxProperties.defaultProps = {
//   data: PropTypes.object
// };

export default TextboxProperties;
