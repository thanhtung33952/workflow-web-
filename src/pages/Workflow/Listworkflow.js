import React from 'react';

//component material
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// component common
import Wrapper from 'components/Wrapper/Wrapper';

// jss
import useStyles from 'assets/jss/pages/Workflow/Listworkflow';
export default function Listworkflow() {
  const classes = useStyles();

  const rows = [
    ['Contact form', 159, 6.0, 24, 4.0],
    ['Register form', 237, 9.0, 37, 4.3],
    ['Hello form', 262, 16.0, 24, 6.0],
    ['Good bye form', 305, 3.7, 67, 4.3],
    ['Good morning form', 356, 16.0, 49, 3.9]
  ];
  return (
    <Wrapper>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12}>
          <Typography className={classes.titleTool}>List Work Flow</Typography>
          <div className={classes.contentForm}>
            <TableContainer component={Paper}>
              <Table className={classes.table}>
                <TableHead className={classes.headTable}>
                  <TableRow>
                    <TableCell>Form name</TableCell>
                    <TableCell align="center">Number one</TableCell>
                    <TableCell align="center">Number two</TableCell>
                    <TableCell align="center">Number three</TableCell>
                    <TableCell align="center">Number four</TableCell>
                    <TableCell align="center">Option</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {row[0]}
                      </TableCell>
                      <TableCell align="center">{row[1]}</TableCell>
                      <TableCell align="center">{row[2]}</TableCell>
                      <TableCell align="center">{row[3]}</TableCell>
                      <TableCell align="center">{row[4]}</TableCell>
                      <TableCell align="center">
                        <Button variant="contained" className={classes.btnEdit}>
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          className={classes.btnDelete}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
    </Wrapper>
  );
}
