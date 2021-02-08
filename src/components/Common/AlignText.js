import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// @material-ui
import { makeStyles } from '@material-ui/core/styles';
import { ButtonGroup, Button } from '@material-ui/core';

// icons
import AlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import AlignRightIcon from '@material-ui/icons/FormatAlignRight';
import AlignCenterIcon from '@material-ui/icons/FormatAlignCenter';

const useStyles = makeStyles(() => ({
  root: {},
  btnGroup: {
    background: '#fff',
    '& button': {
      minWidth: 30,
      height: 30,
      padding: '5px 8px',
      color: '#777'
    },
    '& button span': {
      minWidth: 10
    },
    '& svg': {
      fontSize: 17
    }
  },
  active: {
    '& span': {
      color: '#25a29b'
    }
  }
}));

function AlignText(props) {
  const classes = useStyles();
  const { callbackChange, alignProp } = props;
  const [align, setAlign] = useState('left');

  useEffect(() => {
    if (alignProp) {
      setAlign(alignProp);
    } else setAlign('left');
  }, [alignProp]);

  useEffect(() => {
    if (callbackChange) {
      callbackChange(align);
    }
  }, [align]);

  return (
    <div>
      <ButtonGroup className={classes.btnGroup}>
        <Button
          className={classNames({
            [classes.active]: align === 'left'
          })}
          onClick={() => setAlign('left')}
        >
          <AlignLeftIcon />
        </Button>
        <Button
          className={classNames({
            [classes.active]: align === 'center'
          })}
          onClick={() => setAlign('center')}
        >
          <AlignCenterIcon />
        </Button>
        <Button
          className={classNames({
            [classes.active]: align === 'right'
          })}
          onClick={() => setAlign('right')}
        >
          <AlignRightIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}
AlignText.defaultProps = {
  alignProp: 'left'
};

AlignText.propTypes = {
  callbackChange: PropTypes.func,
  alignProp: PropTypes.string
};

export default AlignText;
