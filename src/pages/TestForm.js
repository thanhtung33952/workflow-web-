import React from 'react';
import PropTypes from 'prop-types';
// @material-ui
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

// component customer
import ShortcodeForm from 'components/RenderForm/ShortcodeForm';
import { Typography } from '@material-ui/core';

// jss
const useStyles = makeStyles(theme => ({
  root: {
    padding: '20px 15%',
    height: 'calc(100% - 40px)',
    overflow: 'auto'
  },
  form1: {
    padding: 15,
    backgroundColor: '#ddd'
  }
}));

function TestForm(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* form 1 */}
      <Box boxShadow={1} bgcolor="#f3f3f3" m={0} p={4}>
        <Typography
          style={{ textAlign: 'center', fontSize: '20px', marginBottom: 20 }}
        >
          Form 14
        </Typography>
        <ShortcodeForm formID={14} />
      </Box>

      {/* form 2 */}
      <Box boxShadow={1} bgcolor="#f3f3f3" p={4} style={{ marginTop: 20 }}>
        <Typography
          style={{ textAlign: 'center', fontSize: '20px', marginBottom: 20 }}
        >
          Form 15
        </Typography>
        <ShortcodeForm formID={15} />
      </Box>
    </div>
  );
}

TestForm.propTypes = {};
export default TestForm;
