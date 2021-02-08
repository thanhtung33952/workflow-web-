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
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteForeverOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';

// constant
import { apiRoot } from 'constant/index.js';

// component common
import Wrapper from 'components/Wrapper/Wrapper';
// helpers
import { isNullOrEmpty, isNullOrUndefined } from 'utils/helpers';
//component customer
import SearchInput from 'components/SearchForm/SearchInput';
import PopupQuestion from 'components/Popup/PopupQuestion';

// jss
import useStyles from 'assets/jss/pages/RequestDraft/ListRequestDraft';
import { folderRoot } from 'constant';

export default function ListRequestDraft() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState([]);
  // usser selected on delete
  const [draftSelected, setDraftSelected] = useState();

  const [statusSubmit, setStatusSubmit] = useState({
    status: 0, // -1: error, 1: success
    isLoading: false,
    msg: ''
  });
  useEffect(() => {
    async function getData() {
      // show loading
      setisLoading(true);

      // call api get data
      const result = await getDataDraft();

      // hide loading
      setisLoading(false);

      // faild
      if (!result) return;

      // success
      setData(result.data);
    }

    getData();
  }, []);

  const handleClickOpen = draft => {
    setDraftSelected(draft);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // delete User
  const deteleDraft = async () => {
    setStatusSubmit({ ...statusSubmit, isLoading: true });
    if (isNullOrUndefined(draftSelected)) return;
    // call api delete
    const result = await callAPIDeleteDraft(draftSelected.id);
    // console.log(data);
    // Failed
    if (!result) {
      setStatusSubmit({ ...statusSubmit, status: -1, isLoading: false });
      setOpen(false);
      return;
    }

    // success
    setStatusSubmit({ ...statusSubmit, status: 1, isLoading: false });
    let newArr = [...data]; // copying the old data array
    let index = newArr.findIndex(x => x.id === draftSelected.id);
    if (index !== -1) {
      newArr.splice(index, 1);
      setData(newArr);
      setOpen(false);
    }
  };
  const handleAfterDelete = flag => {
    setOpen(false);
    // flag: yes||no
    if (flag === 'yes') {
      deteleDraft();
    }
  };

  // on submit search draft by key
  const handleSearchDraft = async (formValue, callback) => {
    // call api search draft
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

  // render draft
  const draft = [];
  data.length > 0 &&
    data.map((row, i) => {
      draft.push(
        <TableRow key={i}>
          <TableCell align="center" component="th" scope="row">
            <Chip label={row.userName} className={classes.btnUser} />
          </TableCell>
          <TableCell align="left">
            <span>
              <u>{row.email}</u>
            </span>
          </TableCell>
          <TableCell align="center">{row.departmentName}</TableCell>
          <TableCell align="center">
            {moment(row.createDate).format('YYYY年MM月DD日')}
          </TableCell>
          <TableCell align="center">
            <Button
              variant="contained"
              className={classes.btnEdit}
              href={`${folderRoot}request-detail/${row.id}`}
            >
              <EditIcon />
            </Button>
            <Button
              variant="contained"
              className={classes.btnDelete}
              onClick={() => handleClickOpen(row)}
            >
              <DeleteIcon />
            </Button>
          </TableCell>
        </TableRow>
      );
    });

  return (
    <div className={classes.root}>
      <Typography className={classes.titleTool}> 下書き </Typography>
      <div className={classes.formGroup}>
        <div className={classes.search}>
          <SearchInput
            autoFocus
            placeholder="下書きを検索"
            onSubmit={handleSearchDraft}
            onChange={handleChangeField('search')}
          />
        </div>
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
                      <TableCell align="left">申請書</TableCell>
                      <TableCell align="center">状況</TableCell>
                      <TableCell align="center">保存日</TableCell>
                      <TableCell align="center">編集</TableCell>
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
                    ) : isNullOrEmpty(draft) ? (
                      <TableRow>
                        <TableCell align="center" colSpan={6}>
                          データがありません。
                        </TableCell>
                      </TableRow>
                    ) : (
                      draft
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <PopupQuestion
                open={open}
                title="下書きの削除を確認"
                content="この下書き削除でよろしいでしょうか。?"
                callback={handleAfterDelete}
                handleClose={handleClose}
              />
              {/* end popup */}
            </div>
          </Grid>
        </Grid>
      </Wrapper>
    </div>
  );
}

//  get Draft
async function getDataDraft() {
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

//  call API Delete Draft
async function callAPIDeleteDraft(id, data) {
  if (isNullOrEmpty(id)) return;
  try {
    const res = await axios.delete(`${apiRoot}/users/${id}`, data);
    // error
    if (res.data === false || res.status !== 200) {
      return false;
    }
    // success
    return true;
  } catch (error) {
    return false;
  }
}
// call api serach draft
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
