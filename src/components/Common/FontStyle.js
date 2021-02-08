import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// material-ul
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Select } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  selectControl: {
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

function FontStyle(props) {
  const classes = useStyles();
  const { fontStyle, callbackChange } = props;
  const [style, setStyle] = useState('normal');

  useEffect(() => {
    if (fontStyle) {
      setStyle(fontStyle);
    } else setStyle('normal');
  }, [fontStyle]);

  useEffect(() => {
    if (callbackChange) {
      callbackChange(style);
    }
  }, [style]);

  return (
    <div>
      <FormControl variant="outlined" className={classes.selectControl}>
        <Select
          native
          value={style}
          onChange={e => setStyle(e.target.value)}
          inputProps={{
            name: 'font-style',
            id: 'font-style-control'
          }}
        >
          <option value={'normal'}>Normal</option>
          <option value={'italic'}>Italic</option>
          <option value={'oblique'}>Oblique</option>
          <option value={'revert'}>Revert</option>
        </Select>
      </FormControl>
    </div>
  );
}

FontStyle.defaultProps = {
  fontStyle: 'normal'
};

FontStyle.propTypes = {
  callbackChange: PropTypes.func,
  fontStyle: PropTypes.string
};

export default FontStyle;
