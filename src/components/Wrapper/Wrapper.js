import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  }
}));

const Wrapper = ({ children, padding }) => {
  const classes = useStyles();
  return (
    <div className={padding ? classes.root : null} style={{ height: '100%' }}>
      {children}
    </div>
  );
};

Wrapper.prototypes = {
  children: PropTypes.node.isRequired,
  padding: PropTypes.bool
};

Wrapper.defaultProps = {
  padding: true
};

export default Wrapper;
