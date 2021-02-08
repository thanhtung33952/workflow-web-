import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
// constant
import { apiRoot } from 'constant/index.js';
import {
  Paper,
  Typography,
  Divider,
  TextField,
  FormControl,
  Select,
  InputLabel,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';

import { isEmail, isNullOrEmpty } from 'utils/helpers';

// icons
import EditIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Check';
import CanceIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
// jss
import useStyles from 'assets/jss/components/users/popupDepartment';

export default function PopupDepartment(props) {
  const classes = useStyles();
  const { isOpen, callback, handleClose, data } = props;
  const [statusSubmit, setStatusSubmit] = useState({
    status: 0, // -1: error, 1: success
    isLoading: false,
    msg: ''
  });
  // value  tempt add/edit/delete
  const [dataSubmit, setDataSubmit] = useState({
    id: null,
    name: '',
    description: '',
    flag: ''
  });
  // is validation
  const [isValid, setValid] = useState(false);

  useEffect(() => {
    var elmnt = document.getElementById('listContent');
    if (!elmnt) return;
    elmnt.scrollTop = elmnt.scrollHeight ? elmnt.scrollHeight : 0;
  });

  // change value temp
  const handleChange = name => e => {
    setDataSubmit({ ...dataSubmit, [name]: e.target.value });
  };

  // isvalidation
  const validation = () => {
    if (isNullOrEmpty(dataSubmit.name)) {
      setValid(true);
      return false;
    }
    setValid(false);
    return true;
  };

  // addnew
  const handleAddData = async () => {
    if (!validation()) return;
    setStatusSubmit({ ...statusSubmit, isLoading: true });
    // call api
    const result = await addnew(dataSubmit.name, dataSubmit.description);
    // error
    if (!result) {
      setStatusSubmit({ ...statusSubmit, status: -1, isLoading: false });
      handleCance();
      return;
    }
    // success
    setStatusSubmit({ ...statusSubmit, status: 1, isLoading: false });
    let newArr = [...data]; // copying the old data array
    newArr.push(result);

    // callback to parent
    callback(newArr);
    handleCance();
  };

  // update
  const handleUpdateData = async () => {
    if (!validation()) return;
    setStatusSubmit({ ...statusSubmit, isLoading: true });
    // call api
    const result = await updateById(
      dataSubmit.id,
      dataSubmit.name,
      dataSubmit.description
    );
    // error
    if (!result) {
      setStatusSubmit({ ...statusSubmit, status: -1, isLoading: false });
      handleCance();
      return;
    }
    // success
    setStatusSubmit({ ...statusSubmit, status: 1, isLoading: false });
    let newArr = [...data]; // copying the old data array
    let index = newArr.findIndex(x => x.id === dataSubmit.id);
    newArr[index]['departmentName'] = dataSubmit.name;
    newArr[index]['departmentDescription'] = dataSubmit.description;

    // callback to parent
    callback(newArr);
    handleCance();
  };

  // delete
  const handleDeleteData = async () => {
    setStatusSubmit({ ...statusSubmit, isLoading: true });
    // call api
    const result = await deleteById(dataSubmit.id);
    // error
    if (!result) {
      setStatusSubmit({ ...statusSubmit, status: -1, isLoading: false });
      handleCance();
      return;
    }
    // success
    setStatusSubmit({ ...statusSubmit, status: 1, isLoading: false });
    let newArr = [...data]; // copying the old data array
    let index = newArr.findIndex(x => x.id === dataSubmit.id);
    if (index !== -1) {
      newArr.splice(index, 1);
      callback(newArr);
      handleCance();
    }
  };
  // cance action
  const handleCance = () => {
    setDataSubmit({
      id: null,
      name: '',
      description: '',
      flag: ''
    });
  };
  return (
    <Dialog
      fullWidth={true}
      maxWidth={'sm'}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-group"
    >
      <DialogTitle id="form-group" className={classes.title}>
        部署一覧
      </DialogTitle>
      <DialogContent style={{ padding: '0 4px' }} id="listContent">
        <>
          {statusSubmit.isLoading && (
            <div className={classes.boxLoading}>
              <CircularProgress size={30} />
            </div>
          )}
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead className={classes.headTable}>
                <TableRow>
                  <TableCell align="left">部署名</TableCell>
                  <TableCell align="center">説明</TableCell>
                  <TableCell align="center">作成日</TableCell>
                  <TableCell align="center" style={{ width: 80 }}>
                    編集
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!isNullOrEmpty(data) &&
                  data.map((e, i) => (
                    <TableRow key={i}>
                      {/* mode edit */}
                      {dataSubmit.flag === 'edit' && dataSubmit.id === e.id ? (
                        <>
                          <TableCell align="left">
                            <TextField
                              placeholder="Name"
                              value={dataSubmit.name}
                              onChange={handleChange('name')}
                              error={isValid && !dataSubmit.name ? true : false}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <TextField
                              placeholder="Description"
                              value={
                                dataSubmit.description
                                  ? dataSubmit.description
                                  : ''
                              }
                              onChange={handleChange('description')}
                            />
                          </TableCell>
                          <TableCell align="center">
                            {moment(e.createDate).format('YYYY/MM/DD')}
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              size="small"
                              className={classes.btnEdit}
                              onClick={handleUpdateData}
                            >
                              <DoneIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              className={classes.btnDelete}
                              onClick={handleCance}
                            >
                              <CanceIcon />
                            </IconButton>
                          </TableCell>
                        </>
                      ) : dataSubmit.flag === 'delete' &&
                        dataSubmit.id === e.id ? (
                        // mode delete
                        <>
                          <TableCell align="left" colSpan={3}>
                            <Typography>
                              Are you sure you want to delete this row?
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              size="small"
                              className={classes.btnEdit}
                              onClick={handleDeleteData}
                            >
                              <DoneIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              className={classes.btnDelete}
                              onClick={handleCance}
                            >
                              <CanceIcon />
                            </IconButton>
                          </TableCell>
                        </>
                      ) : (
                        // mode view
                        <>
                          <TableCell align="left">{e.departmentName}</TableCell>
                          <TableCell align="center">
                            {e.departmentDescription}
                          </TableCell>
                          <TableCell align="center">
                            {moment(e.createDate).format('YYYY/MM/DD')}
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              className={classes.btnEdit}
                              size="small"
                              onClick={() =>
                                setDataSubmit({
                                  ...dataSubmit,
                                  name: e.departmentName,
                                  description: e.departmentDescription,
                                  flag: 'edit',
                                  id: e.id
                                })
                              }
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() =>
                                setDataSubmit({
                                  ...dataSubmit,
                                  flag: 'delete',
                                  id: e.id
                                })
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                {dataSubmit.flag === 'addnew' && (
                  <TableRow>
                    <TableCell align="center">
                      <TextField
                        placeholder="Name"
                        value={dataSubmit.name}
                        error={isValid && !dataSubmit.name ? true : false}
                        onChange={handleChange('name')}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        placeholder="Description"
                        value={dataSubmit.description}
                        onChange={handleChange('description')}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {moment().format('YYYY/MM/DD')}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        className={classes.btnEdit}
                        onClick={handleAddData}
                      >
                        <DoneIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        className={classes.btnDelete}
                        onClick={handleCance}
                      >
                        <CanceIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      </DialogContent>
      <DialogActions>
        <div className={classes.rowSubmit}>
          <Button
            variant="contained"
            color="primary"
            className={classes.btnAdd}
            onClick={() =>
              setDataSubmit({
                id: null,
                name: '',
                description: '',
                flag: 'addnew'
              })
            }
          >
            <AddIcon />
          </Button>
          <Button
            variant="contained"
            className={classes.btnCance}
            onClick={handleClose}
          >
            キャンセル
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
PopupDepartment.prototypes = {
  data: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  callback: PropTypes.func
};
PopupDepartment.defaultProps = {
  data: [],
  isOpen: false,
  callback: null
};

// add new
async function addnew(name, description) {
  try {
    const res = await axios.post(`${apiRoot}/departments`, {
      departmentName: name,
      departmentDescription: description
    });
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
// update
async function updateById(id, name, description) {
  if (isNullOrEmpty(id)) return;
  try {
    const res = await axios.put(`${apiRoot}/departments/${id}`, {
      departmentName: name,
      departmentDescription: description
    });
    // error
    if (res.data.code !== 1 || res.status !== 200) {
      return false;
    }
    // success
    return true;
  } catch (error) {
    return false;
  }
}
// delete
async function deleteById(id) {
  if (isNullOrEmpty(id)) return;
  try {
    const res = await axios.delete(`${apiRoot}/departments/${id}`);
    // error
    if (res.data.code !== 1 || res.status !== 200) {
      return false;
    }
    // success
    return true;
  } catch (error) {
    return false;
  }
}
