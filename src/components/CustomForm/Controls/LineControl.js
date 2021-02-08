import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

// nodejs library to set properties for components
import PropTypes from 'prop-types';

// @material-ui
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

// common
import { isNullOrUndefined } from 'utils/helpers';

const useStyles = makeStyles(() => ({
  lineRoot: {
    paddingTop: 10,
    paddingBottom: 10
  }
}));

function LineControl(props) {
  const classes = useStyles();

  // output
  return (
    <div className={classes.lineRoot}>
      <Divider />
    </div>
  );
}

LineControl.propTypes = {};

LineControl.defaultProps = {};

export default LineControl;
