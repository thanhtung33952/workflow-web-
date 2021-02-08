import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

// nodejs library to set properties for components
import PropTypes from 'prop-types';

// @material-ui
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  InputLabel,
  InputAdornment,
  FormControl,
  Select
} from '@material-ui/core';

// icons

// common
import { isNullOrUndefined } from 'utils/helpers';
import ColorPicker from 'components/Common/ColorPicker';
import AlignText from 'components/Common/AlignText';
import FontStyle from 'components/Common/FontStyle';

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
    flex: 1
  },
  textAreaControl: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 2,
    '& fieldset': {
      borderColor: '#fff !important'
    }
  },
  selectControl: {
    width: 100
  },
  lengthControl: {
    backgroundColor: '#fff',
    width: 120,
    '& input': {
      textAlign: 'left'
    }
  }
}));

function LabelProperties(props) {
  const { data, callbackChangeProps } = props;
  const classes = useStyles();

  const [valForm, setValForm] = useState({
    id: 1,
    content: '',
    fontSize: '',
    fontStyle: '',
    color: '',
    align: '',
    width: ''
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
        <span>内容︓</span>
        <TextField
          value={valForm.content}
          variant="outlined"
          multiline
          rows={3}
          className={classes.textAreaControl}
          onChange={handleChangeTxt('content')}
        />
      </div>
      <div className={classes.row}>
        <span>サイズ︓</span>
        <TextField
          variant="outlined"
          className={classes.control}
          value={valForm.fontSize}
          onChange={handleChangeTxt('fontSize')}
        />
      </div>
      <div className={classes.row}>
        <span>フォントスタイル︓</span>
        <FontStyle
          fontStyle={valForm.fontStyle}
          callbackChange={style => setValForm({ ...valForm, fontStyle: style })}
        />
      </div>
      <div className={classes.row}>
        <span>フォント⾊︓</span>
        <ColorPicker
          colorProp={valForm.color}
          callbackColor={color => setValForm({ ...valForm, color: color })}
        />
      </div>
      <div className={classes.row}>
        <span>揃え︓</span>
        <AlignText
          alignProp={valForm.align}
          callbackChange={align => setValForm({ ...valForm, align: align })}
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
          className={classes.control}
          value={valForm.width}
          onChange={handleChangeTxt('width')}
        />
      </div>
    </div>
  );
}

LabelProperties.propTypes = {
  data: PropTypes.object,
  callbackChangeProps: PropTypes.func
};

// LabelProperties.defaultProps = {
//   data: PropTypes.object
// };

export default LabelProperties;
