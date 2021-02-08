import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as moment from 'moment';
//component material
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';

// constant
import { apiRoot } from 'constant/index.js';

// component common
import Wrapper from 'components/Wrapper/Wrapper';
// helpers
import { isNullOrEmpty } from 'utils/helpers';
//component customer
import SearchInput from 'components/SearchForm/SearchInput';

// jss
import useStyles from 'assets/jss/pages/Users/ListUser';

export default function Status() {
  const classes = useStyles();
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      // show loading
      setisLoading(true);

      // call api get data
      const result = await getStatus();

      // hide loading
      setisLoading(false);

      // faild
      if (!result) return;

      // success
      setData(result.data);
    }

    getData();
  }, []);

  // on submit search by key
  const handleSearch = async (formValue, callback) => {
    // call api search
    const result = await callApiSearch(formValue);
    if (!result) {
      callback();
      return;
    }
    callback();
    setData(result);
  };
  const handleChangeField = name => e => {
    let val = e.target.value;
    setData({ ...data, [name]: val });
  };

  // render Status not group
  const status = [];
  data.length > 0 &&
    data.map((row, i) => {
      status.push(
        <TableRow key={i}>
          <TableCell align="center" component="th" scope="row">
            <Chip label={row.userName} className={classes.btnUser} />
          </TableCell>
          <TableCell align="center">
            <span>{row.email}</span>
          </TableCell>
          <TableCell align="center">
            <span>
              <b>{row.role === '1' ? '編集可能' : '-'}</b>
            </span>
          </TableCell>
          <TableCell align="center">
            <b>{row.departmentName}</b>
          </TableCell>
          <TableCell align="center">
            {moment(row.createDate).format('YY/MM/DD')}
          </TableCell>
        </TableRow>
      );
    });

  return (
    <div className={classes.root}>
      <Typography className={classes.titleTool}> 申請状況 </Typography>
      <div className={classes.searchFormlistApplication}>
        <SearchInput
          autoFocus
          placeholder="申請状況を検索"
          onSubmit={handleSearch}
          onChange={handleChangeField('search')}
        />
      </div>
      <Wrapper>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12}>
            <div className={classes.contentForm}>
              <TableContainer component={Paper} className={classes.container}>
                <Table
                  className={classes.table}
                  stickyHeader
                  aria-label="sticky table"
                >
                  <TableHead className={classes.headTable}>
                    <TableRow>
                      <TableCell align="center">分類</TableCell>
                      <TableCell align="center">申請番号</TableCell>
                      <TableCell align="center">申請書</TableCell>
                      <TableCell align="center">状況</TableCell>
                      <TableCell align="center">作成日</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={6}>
                          <CircularProgress
                            size={50}
                            className={classes.iconProgress}
                          />
                        </TableCell>
                      </TableRow>
                    ) : isNullOrEmpty(status) ? (
                      <TableRow>
                        <TableCell align="center" colSpan={6}>
                          データがありません。
                        </TableCell>
                      </TableRow>
                    ) : (
                      status
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
        </Grid>
      </Wrapper>
    </div>
  );
}

//  get
async function getStatus() {
  try {
    const res = await axios.get(`${apiRoot}/users`);
    // error
    if (res.status !== 200) {
      return null;
    }
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// insert new status
async function callApiSearch(data) {
  try {
    const res = await axios.get(
      `${apiRoot}/users/search/${data.searchTerm}?limit=20&offset=0`
    );
    // error
    if (res.data.code !== 1 || res.status !== 200) {
      return false;
    }
    // success
    return res.data.data;
  } catch (error) {
    return false;
  }
}
