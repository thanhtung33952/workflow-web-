import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

// nodejs library to set properties for components
import PropTypes from 'prop-types';

// @material-ui
import { makeStyles } from '@material-ui/core/styles';

// icons

// common
import { isNullOrUndefined } from 'utils/helpers';

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

function LineProperties(props) {
  const { data } = props;
  const classes = useStyles();

  const [valForm, setValForm] = useState({ id: 1 });

  useEffect(() => {
    if (!isNullOrUndefined(data)) setValForm(data);
  }, [data]);

  return (
    <div className={classes.propertiesRoot}>
      <div className={classes.row}>
        <span>ID︓</span>
        <span className={classNames(classes.fullControl, classes.control)}>
          {valForm.id}
        </span>
      </div>
    </div>
  );
}

LineProperties.propTypes = {
  data: PropTypes.object
};
export default LineProperties;
