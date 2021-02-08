import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// @material-ui
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Switch from '@material-ui/core/Switch';
import { isNullOrEmpty } from 'utils/helpers';

const useStyles = makeStyles(theme => ({
  root: {
    width: 60,
    height: 30,
    padding: 0,
    margin: 0
  },
  rootSmall: {
    width: 40,
    height: 24
  },
  switchBase: {
    padding: 1,
    color: '#847E7E',
    '&$checked': {
      transform: 'translateX(29px)',
      color: '#fff',
      '& + $track': {
        backgroundColor: '#1eb001',
        opacity: 1,
        border: 'none'
      }
    },
    '&$focusVisible $thumb': {
      color: '#1eb001',
      border: '6px solid #fff'
    }
  },
  switchBaseSmall: {
    '&$checked': {
      transform: 'translateX(16px)'
    }
  },
  thumb: {
    width: 28,
    height: 28
  },
  thumbSmall: {
    width: 22,
    height: 22
  },
  track: {
    borderRadius: 30 / 2,
    border: 'none',
    backgroundColor: '#eaeaea',
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border'])
  },
  trackSmall: {
    borderRadius: 25 / 2
  },
  checked: {},
  focusVisible: {}
}));

function SwitchStatus(props) {
  const classes = useStyles();
  const { callbackChange, statusProp, size } = props;
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (!isNullOrEmpty(statusProp)) {
      setStatus(statusProp);
    } else setStatus(false);
  }, [statusProp]);

  const handleChange = e => {
    let status = e.target.checked;
    setStatus(status);
    if (callbackChange) {
      callbackChange(status);
    }
  };

  return (
    <div>
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classNames(classes.root, size === 'small' && classes.rootSmall),
          switchBase: classNames(
            classes.switchBase,
            size === 'small' && classes.switchBaseSmall
          ),
          thumb: classNames(
            size === 'small' ? classes.thumbSmall : classes.thumb
          ),
          track: classNames(
            classes.track,
            size === 'small' && classes.trackSmall
          ),
          checked: classes.checked
        }}
        checked={status}
        onChange={e => handleChange(e)}
      />
    </div>
  );
}
SwitchStatus.defaultProps = {
  status: false
};

SwitchStatus.propTypes = {
  callbackChange: PropTypes.func,
  statusProp: PropTypes.bool,
  size: PropTypes.string
};

export default SwitchStatus;
