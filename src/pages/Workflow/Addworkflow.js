import React from 'react';
//component material
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// component common
import Wrapper from 'components/Wrapper/Wrapper';

// jss
import useStyles from 'assets/jss/pages/Workflow/Addworkflow';
export default function Addworkflow() {
  const classes = useStyles();
  return (
    <Wrapper>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12}>
          <Typography className={classes.titleTool}>Add Work Flow</Typography>
        </Grid>
      </Grid>
    </Wrapper>
  );
}
