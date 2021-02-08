import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as moment from 'moment';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import { TextField, FormControl, Select, InputLabel } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

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
import { folderRoot } from 'constant';

export default function Report() {
  const classes = useStyles();
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState(null); // userName, email, role, departmentId, approvalGroupId
  useEffect(() => {
    async function getData() {
      // show loading
      setisLoading(true);

      // call api get data
      const result = await getUsers();

      // hide loading
      setisLoading(false);

      // faild
      if (!result) return;

      // success
      setData(result.data);
    }

    getData();
  }, []);
  const handleChange = name => e => {
    setUserData({
      ...userData,
      [name]: e.target.value
    });
  };

  // on submit search reports by key
  const handleSearchUser = async (formValue, callback) => {
    // call api search reports
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

  // render reports not group
  const reports = [];
  data.length > 0 &&
    data.map((row, i) => {
      reports.push(
        <TableRow key={i}>
          <TableCell align="center"></TableCell>
          <TableCell align="center">ABC-000001 　</TableCell>
          <TableCell align="center" component="th" scope="row">
            <Chip label={row.userName} className={classes.btnUser} />
          </TableCell>
          <TableCell className={classes.alignTableCell}>
            <span>{row.email}</span>
          </TableCell>
          <TableCell align="center">
            {moment(row.createDate).format('YY/MM/DD')}
          </TableCell>
          <TableCell align="center">
            <span>田中</span>
          </TableCell>
          <TableCell align="center">情報システム部</TableCell>
          <TableCell align="center">差し戻し</TableCell>
        </TableRow>
      );
    });

  return (
    <div className={classes.root}>
      <Typography className={classes.titleTool}> 総合申請一覧 </Typography>
      <div className={classes.row}>
        <div className={classes.searchReport}>
          <SearchInput
            autoFocus
            placeholder="申請内容を検索"
            onSubmit={handleSearchUser}
            onChange={handleChangeField('search')}
          />
        </div>
        <Button
          variant="contained"
          className={classes.btnAdd}
          href={`${folderRoot}users/addnew`}
        >
          フィルタを非表示
        </Button>
      </div>
      {/* col 1 */}
      <div className={classes.form}>
        <div className={classes.form1}>
          <div className={classes.formGroup}>
            <label>申請番号：</label>
            <TextField
              value={''}
              variant="outlined"
              className={classes.inputControl}
              InputProps={{
                classes: {
                  root: classes.rootInput,
                  input: classes.thisInput,
                  error: classes.thisInputError
                }
              }}
            />
          </div>
          <div className={classes.formGroup}>
            <label>検索する前後期間：</label>
            <div className={classes.twoInput}>
              <TextField
                value={''}
                placeholder="開始日"
                variant="outlined"
                className={classes.inputControl}
                InputProps={{
                  classes: {
                    root: classes.rootInput1,
                    input: classes.thisInput,
                    error: classes.thisInputError
                  }
                }}
              />
              <TextField
                value={''}
                placeholder="終了日"
                variant="outlined"
                className={classes.inputControl}
                InputProps={{
                  classes: {
                    root: classes.rootInput2,
                    input: classes.thisInput,
                    error: classes.thisInputError
                  }
                }}
              />
            </div>
          </div>
          <div className={classes.formGroup}>
            <label>分類：</label>
            <div className={classes.rowInline}>
              <FormControl
                variant="outlined"
                className={classes.formControlSelect}
              >
                <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
                <Select
                  native
                  value={!isNullOrEmpty(userData) ? 'userData.rose' : ''}
                  onChange={handleChange('role')}
                  className={classes.select}
                >
                  <option aria-label="None" value="" />
                  <option value={1}></option>
                  <option value={0}></option>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={classes.formGroup}>
            <label>分署：</label>
            <div className={classes.rowInline}>
              <FormControl
                variant="outlined"
                className={classes.formControlSelect}
              >
                <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
                <Select
                  native
                  value={!isNullOrEmpty(userData) ? 'userData.rose' : ''}
                  onChange={handleChange('role')}
                  className={classes.select}
                >
                  <option aria-label="None" value="" />
                  <option value={1}></option>
                  <option value={0}></option>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        {/* col 2 */}
        <div className={classes.form2}>
          <div className={classes.formGroup}>
            <label>作成者：</label>
            <TextField
              value={''}
              variant="outlined"
              className={classes.inputControl}
              InputProps={{
                classes: {
                  root: classes.rootInput,
                  input: classes.thisInput,
                  error: classes.thisInputError
                }
              }}
            />
          </div>
          <div className={classes.formGroup}>
            <label>承認者：</label>
            <TextField
              value={''}
              variant="outlined"
              className={classes.inputControl}
              InputProps={{
                classes: {
                  root: classes.rootInput,
                  input: classes.thisInput,
                  error: classes.thisInputError
                }
              }}
            />
          </div>
          <div className={classes.formGroup}>
            <label>状況：</label>
            <div className={classes.rowInline}>
              <FormControl
                variant="outlined"
                className={classes.formControlSelect}
              >
                <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
                <Select
                  native
                  value={!isNullOrEmpty(userData) ? 'userData.rose' : ''}
                  onChange={handleChange('role')}
                  className={classes.select}
                >
                  <option aria-label="None" value="" />
                  <option value={1}></option>
                  <option value={0}></option>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={classes.formGroup}>
            <label>申請フォーム：</label>
            <div className={classes.rowInline}>
              <FormControl
                variant="outlined"
                className={classes.formControlSelect}
              >
                <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
                <Select
                  native
                  value={!isNullOrEmpty(userData) ? 'userData.rose' : ''}
                  onChange={handleChange('role')}
                  className={classes.select}
                >
                  <option aria-label="None" value="" />
                  <option value={1}></option>
                  <option value={0}></option>
                </Select>
              </FormControl>
            </div>
          </div>
          <Button variant="contained" className={classes.btnForm}>
            <CheckIcon />
            <p> 添付ファイルあり </p>
          </Button>
        </div>
      </div>
      <Wrapper>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12}>
            <div className={classes.contentForm}>
              <TableContainer
                component={Paper}
                className={classes.containerReport}
              >
                <Table
                  className={classes.table}
                  stickyHeader
                  aria-label="sticky table"
                >
                  <TableHead className={classes.headTable}>
                    <TableRow>
                      <TableCell align="center">No.</TableCell>
                      <TableCell align="center">申請番号</TableCell>
                      <TableCell align="center">分類</TableCell>
                      <TableCell align="center">申請の内容</TableCell>
                      <TableCell align="center">作成日</TableCell>
                      <TableCell align="center">作成者</TableCell>
                      <TableCell align="center">分署</TableCell>
                      <TableCell align="center">状況</TableCell>
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
                    ) : isNullOrEmpty(reports) ? (
                      <TableRow>
                        <TableCell align="center" colSpan={6}>
                          データがありません。
                        </TableCell>
                      </TableRow>
                    ) : (
                      reports
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

//  get reports
async function getUsers() {
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

// insert new report
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
