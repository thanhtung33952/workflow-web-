import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

// nodejs library to set properties for components
import PropTypes from 'prop-types';

// @material-ui
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// common
import { isNullOrUndefined } from 'utils/helpers';

const useStyles = makeStyles(() => ({
  labelRoot: {
    '& p': {
      border: 'solid 1px rgba(0, 0, 0, 0.38)',
      borderRadius: 3,
      minHeight: 40,
      lineHeight: '40px',
      color: 'rgba(0, 0, 0, 0.38)',
      maxWidth: '100%',
      minWidth: 'fit-content',
      textAlign: 'left'
    }
  },
  labelDefault: {
    lineHeight: '20px',
    color: '#222',
    textAlign: 'left'
  }
}));

function LabelControl(props) {
  const { data, isReality } = props;
  const classes = useStyles();

  // output
  return (
    <div
      className={
        isNullOrUndefined(isReality) ? classes.labelRoot : classes.labelDefault
      }
    >
      <Typography
        style={{
          color: data.color,
          fontSize: data.fontSize,
          fontStyle: data.fontStyle,
          textAlign: data.align,
          width: `${data.width}%`
        }}
      >
        {data.content}
      </Typography>
    </div>
  );
}

LabelControl.propTypes = {
  data: PropTypes.object,
  isReality: PropTypes.bool // isReality: true => control cho người dùng nhập dữ liệu <> control cho layout admin
};

export default LabelControl;
