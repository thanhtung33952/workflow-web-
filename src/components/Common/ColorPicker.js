import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';

// @material-ui
import { makeStyles } from '@material-ui/core/styles';
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowUpIcon from '@material-ui/icons/ArrowDropUp';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative'
  },
  color: {
    width: '36px',
    height: '18px',
    borderRadius: '2px',
    background: '#000'
  },
  swatch: {
    padding: '4px',
    background: '#fff',
    borderRadius: '2px',
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      fontSize: 18,
      color: '#000'
    }
  },
  popover: {
    position: 'absolute',
    zIndex: '2',
    right: 0
  },
  cover: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px'
  }
}));
function ColorPicker(props) {
  const { callbackColor, colorProp } = props;
  const classes = useStyles();
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState('#000');

  useEffect(() => {
    if (colorProp !== color) {
      setColor(colorProp);
    }
  }, [colorProp]);

  // open color popup
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = color => {
    setColor(color.hex);
    if (callbackColor) callbackColor(color.hex);
  };

  return (
    <div className={classes.root}>
      <div className={classes.swatch} onClick={handleClick}>
        <div className={classes.color} style={{ backgroundColor: color }} />
        {displayColorPicker ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </div>
      {displayColorPicker ? (
        <div className={classes.popover}>
          <div className={classes.cover} onClick={handleClose} />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
}

ColorPicker.defaultProps = {
  colorProp: '#000'
};

ColorPicker.propTypes = {
  callbackColor: PropTypes.func,
  colorProp: PropTypes.string
};
export default ColorPicker;
