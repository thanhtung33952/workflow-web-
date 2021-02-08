import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isNullOrEmpty } from 'utils/helpers';
import { apiRoot } from 'constant';
import { folderRoot } from 'constant';

// icon component
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';
import EditIcon from '@material-ui/icons/Create';

//component material
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Button,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Snackbar
} from '@material-ui/core';
//component customer
import SearchInput from 'components/SearchForm/SearchInput';
import SwitchStatus from 'components/Common/SwitchStatus ';
import Notification from 'components/Notification';

// jss
const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  listForm: {
    padding: 20,
    paddingTop: 0,
    marginTop: 20,
    height: '100%',
    overflow: 'auto'
  },
  header: {
    display: 'flex',
    padding: '0 20px',
    marginTop: 10
  },
  search: {
    flex: 1,
    border: 'solid 1px #cccccc',
    borderRadius: 5,
    marginRight: 20
  },
  btnAdd: {
    color: '#fff'
  },
  table: {},
  headTable: {
    '& th': {
      backgroundColor: '#ddd',
      padding: '10px 12px',
      fontWeight: 600,
      color: '#434443'
    }
  },
  bodyTable: {
    '& tr:nth-of-type(odd)': {
      backgroundColor: '#f3f3f3'
    },
    '& td': {
      padding: '4px 12px'
    }
  },
  iconEdit: {
    color: '#1eb001',
    padding: 10,
    marginRight: 10,
    '&:before': {
      content: '" "',
      height: '70%',
      width: 1,
      background: '#d2d0d0',
      position: 'absolute',
      right: -5
    }
  },
  iconDelete: {
    color: 'red',
    padding: 10
  },
  iconSwitch: {
    height: 25,
    '& $thumb': {
      width: 22,
      height: 22
    }
  }
}));

export default function Formlist() {
  const classes = useStyles();
  const [formList, setFormList] = useState([]);
  const [submit, setSubmit] = useState({
    isLoading: false,
    isOpenMsg: false,
    msg: '',
    status: 0 // 0: normal, 1: ok , -1: error, -2: data empty, -3: Oop
  });

  useEffect(() => {
    async function getData() {
      setSubmit({ ...submit, isLoading: true });

      try {
        const res = await axios.get(`${apiRoot}/forms`);

        // failed Oop
        if (res.status !== 200) {
          setSubmit({ ...submit, isLoading: false, status: -3 });
          return;
        }

        // data empty
        if (isNullOrEmpty(res.data.data)) {
          setSubmit({ ...submit, isLoading: false, status: -2 });
        }

        // success
        setFormList(res.data.data);
        setSubmit({ ...submit, isLoading: false, status: 1 });
      } catch (error) {
        setSubmit({ ...submit, isLoading: false, status: -3 });
      }
    }

    getData();
  }, []);

  const updateStatusForm = async (flag, idForm) => {
    let status = flag ? 1 : 0; // 1: public, 0: not public
    // loading
    setSubmit({ ...submit, isLoading: true });
    try {
      const res = await axios.put(`${apiRoot}/statusforms/${idForm}`, {
        public: status
      });
      
      // failed Oop
      if (res.status !== 200) {
        setSubmit({
          ...submit,
          isLoading: false,
          status: -3,
          isOpenMsg: true,
          msg: 'Oop'
        });
        return;
      }
      // error
      if (res.data.code !== 1) {
        setSubmit({
          ...submit,
          isLoading: false,
          status: -1,
          isOpenMsg: true,
          msg: 'Update status error'
        });
      }

      // success
      if (res.data.code === 1) {
        setSubmit({
          ...submit,
          isLoading: false,
          status: 1,
          isOpenMsg: true,
          msg: 'Update status success'
        });

        // update status is form on list
        let newForm = [...formList];
        let isFrom = newForm.findIndex(f => f.id === idForm);
        if (isFrom !== -1) {
          newForm[isFrom].public = status;
          setFormList(newForm);
        }
      }
    } catch (error) {
      setSubmit({
        ...submit,
        isLoading: false,
        status: -3,
        isOpenMsg: true,
        msg: 'Oop'
      });
    }
  };

  const handleDelete = async idForm => {
    var read = window.confirm('Bạn muốn xóa form này!');
    if (!read || !idForm) return;

    // loading
    setSubmit({ ...submit, isLoading: true });
    try {
      const res = await axios.delete(`${apiRoot}/forms/${idForm}`);
      console.log(res);
      // failed Oop
      if (res.status !== 200) {
        setSubmit({
          ...submit,
          isLoading: false,
          status: -3,
          isOpenMsg: true,
          msg: 'Oop'
        });
        return;
      }

      // success
      if (res.data.code === 1) {
        setSubmit({
          ...submit,
          isLoading: false,
          status: 1,
          isOpenMsg: true,
          msg: 'Delete success'
        });

        // remove is form on list
        let newForm = [...formList];
        let isFrom = newForm.findIndex(f => f.id === idForm);
        if (isFrom !== -1) {
          newForm.splice(isFrom, 1);
          setFormList(newForm);
        }
      }
    } catch (error) {
      setSubmit({
        ...submit,
        isLoading: false,
        status: -3,
        isOpenMsg: true,
        msg: 'Oop'
      });
    }
  };

  const closeNotification = () => {
    setSubmit({ ...submit, isOpenMsg: false, msg: '' });
  };

  return (
    <div className={classes.root}>
      {/* <Typography className={classes.titleTool}> フォーム一覧 </Typography> */}
      <div className={classes.header}>
        <div className={classes.search}>
          <SearchInput autoFocus placeholder="フォームを検索" />
        </div>
        <Button
          variant="contained"
          color="secondary"
          className={classes.btnAdd}
          href={`${folderRoot}admin/customform/addform`}
          target="_blank"
        >
          フォームの新規作成
        </Button>
      </div>

      {/* List form */}
      <div className={classes.listForm}>
        <Paper className={classes.tbContainer}>
          <Table
            className={classes.table}
            stickyHeader
            aria-label="customized table"
          >
            <TableHead className={classes.headTable}>
              <TableRow>
                <TableCell align="center" width="40px">
                  SST
                </TableCell>
                <TableCell align="left">Form Name</TableCell>
                <TableCell align="left" width="220px">
                  Date Created
                </TableCell>
                <TableCell align="center" width="60px">
                  Status
                </TableCell>
                <TableCell align="center" width="120px">
                  Options
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.bodyTable}>
              {formList.map((row, i) => {
                return (
                  <TableRow key={i}>
                    {/* sst */}
                    <TableCell key={i} align="center">
                      {i + 1}
                    </TableCell>

                    {/* form name */}
                    <TableCell align="left">{row.title}</TableCell>

                    {/* form created */}
                    <TableCell align="left">{row.createDate}</TableCell>

                    {/* action public */}
                    <TableCell align="center">
                      <SwitchStatus
                        statusProp={row.public === '1' ? true : false}
                        callbackChange={status =>
                          updateStatusForm(status, row.id)
                        }
                        size="small"
                      />
                    </TableCell>

                    {/* action delete */}
                    <TableCell align="center">
                      <IconButton
                        className={classes.iconEdit}
                        href={`${folderRoot}admin/customform/updateform/${row.id}`}
                        target="_blank"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        className={classes.iconDelete}
                        onClick={() => handleDelete(row.id)}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>

      {/* Notification event */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={submit.isOpenMsg}
        autoHideDuration={6000}
        onClose={closeNotification}
      >
        <Notification
          onClose={closeNotification}
          variant={submit.status !== 1 ? 'error' : 'success'}
          message={submit.msg}
        />
      </Snackbar>
    </div>
  );
}
