import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';
// constant
import { apiRoot } from 'constant/index.js';
import { useParams } from 'react-router-dom';
import { isNullOrEmpty, isNullOrUndefined } from 'utils/helpers';

// material component
import {
  Typography,
  Divider,
  TextField,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button
} from '@material-ui/core';

// icons
import CircularProgress from '@material-ui/core/CircularProgress';
//component customer
import SearchInput from 'components/SearchForm/SearchInput';
import PopupQuestion from 'components/Popup/PopupQuestion';

// jss
import useStyles from 'assets/jss/pages/Group/FormGroup';
import { folderRoot } from 'constant';

export default function FormGroup() {
  const classes = useStyles();
  // mode insert/update
  let { group_id } = useParams();
  const [isNew, setNewGroup] = useState(true);
  const [groupData, setGroupData] = useState({ approvalGroupName: '' });
  // data form
  const [isFirst, setFirst] = useState(true);
  const [isFirstSearch, setFirstSearch] = useState(true);
  const [listUser, setListUser] = useState([]);
  const [listSelect, setListSelect] = useState([]);
  const [statusSubmit, setStatusSubmit] = useState({
    status: 0, // -1: error, 1: success
    isLoading: false,
    msg: ''
  });
  const [isValid, setInValid] = useState(false);
  // is open popup question save
  const [isOpenQuestionSave, setOpenPopupQuestionSave] = useState(false);
  // is open popup question cance page addnew/update
  const [isOpenQuestionCance, setOpenPopupQuestionCance] = useState(false);

  // get data on select box
  useEffect(() => {
    // get data user (nếu url có user id)
    async function getDataGroup(groupId) {
      try {
        const res = await axios.get(`${apiRoot}/approvalgroups/${groupId}`);
        // error
        if (res.status !== 200) {
          return;
        }
        const result = res.data;
        // success
        setGroupData(result.data);
        setListSelect(
          !isNullOrEmpty(result.data.details) ? result.data.details : []
        );
      } catch (error) {
        return;
      }
    }
    if (!isNullOrEmpty(group_id)) {
      !isNullOrUndefined(group_id) && setNewGroup(false);
      getDataGroup(group_id);
    }
  }, []);

  // check validation
  useEffect(() => {
    // check validation input
    function checkValid() {
      if (
        isNullOrEmpty(groupData.approvalGroupName) ||
        isNullOrEmpty(listSelect)
      ) {
        setInValid(false);
        return;
      }
      setInValid(true);
    }

    checkValid();
  });

  // change value form
  const handleChange = name => e => {
    setGroupData({
      ...groupData,
      [name]: e.target.value
    });
  };

  // on submit search user by key
  const handleSearchUser = async (formValue, callback) => {
    setFirstSearch(false);
    // call api search user
    const result = await callApiSearch(formValue);
    if (!result) {
      callback();
      return;
    }
    callback();
    setListUser(result);
  };

  // save user data
  const handleSave = async flag => {
    setOpenPopupQuestionSave(false);
    if (!validation() || flag === 'no') {
      return;
    }

    setStatusSubmit({ ...statusSubmit, isLoading: true });
    const data = {
      approvalGroupName: groupData.approvalGroupName,
      details: listSelect
    };
    const result = await callAPISubmitGroup(data, group_id);
    // error
    if (!result) {
      setStatusSubmit({
        ...statusSubmit,
        status: -1,
        isLoading: false,
        msg: isNew ? '新規登録が失敗しました。' : '更新が失敗しました。'
      });
      return;
    }
    // success
    if (isNew) {
      // mode insert nên sau khi insert thành công cho redirect qua url update group theo group_id mới
      window.location.href = `${folderRoot}groups/update/${result.id}`;
    }
    setStatusSubmit({
      ...statusSubmit,
      status: 1,
      isLoading: false,
      msg: isNew ? '新規登録が完了しました。' : '更新が完了しました。'
    });
  };

  // validation
  const validation = () => {
    if (
      isNullOrEmpty(groupData.approvalGroupName) ||
      isNullOrEmpty(listSelect)
    ) {
      setFirst(false);
      return false;
    }
    return true;
  };

  // remove item user in list user selected
  const handleRemoveApprover = user_id => {
    setListSelect(listSelect.filter(e => e.id !== user_id));
  };

  // select user on table
  const handleSelectApprover = user => {
    const indexSelected = listSelect.findIndex(u => u.id === user.id);
    if (indexSelected === -1) {
      setListSelect([...listSelect, { id: user.id, userName: user.userName }]);
    } else {
      setListSelect(listSelect.filter(e => e.id !== user.id));
    }
  };

  // cance
  const handleCance = () => {
    let confirmChange = window.confirm('更新画面を終了しますか。');
    if (confirmChange === false) {
      return;
    }

    window.location.href = `${folderRoot}groups`;
  };

  // check is select check box
  const isSelected = u_id => listSelect.findIndex(u => u.id === u_id) !== -1;

  // render user not group
  const userApprovers = [];
  listUser.length > 0 &&
    listUser.map(u => {
      if (!isNullOrEmpty(u.approvalGroupId)) return;

      const isItemSelected = isSelected(u.id);
      userApprovers.push(
        <TableRow key={u.id} onClick={() => handleSelectApprover(u)}>
          <TableCell padding="checkbox">
            <Checkbox checked={isItemSelected} />
          </TableCell>
          <TableCell align="left">{u.userName}</TableCell>
          <TableCell align="left">{u.email}</TableCell>
          <TableCell align="right">
            {u.role === '1' ? '管理者' : '編集者'}
          </TableCell>
        </TableRow>
      );
    });

  // render list user selected
  const userSelected = listSelect.map(u => {
    return (
      <Chip
        key={u.id}
        label={u.userName}
        onDelete={() => handleRemoveApprover(u.id)}
        color="secondary"
      />
    );
  });

  return (
    <div className={classes.root}>
      <Typography className={classes.titleForm}>
        承認グループの新規追加
      </Typography>
      <Divider />
      <div className={classes.formContent}>
        {statusSubmit.isLoading && (
          <div className={classes.boxLoading}>
            <CircularProgress size={30} />
          </div>
        )}
        <div className={classes.formGroup}>
          <label>承認グループ名</label>
          <TextField
            value={groupData.approvalGroupName}
            error={
              isNullOrEmpty(groupData.approvalGroupName) && !isFirst
                ? true
                : false
            }
            helperText={
              isNullOrEmpty(groupData.approvalGroupName) && !isFirst
                ? '必ず入力してください。'
                : ''
            }
            onChange={handleChange('approvalGroupName')}
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
          <label>承認者選択</label>
          <div className={classes.search}>
            <SearchInput
              placeholder="ユーザーを検索"
              onSubmit={handleSearchUser}
            />
          </div>
        </div>
        <div
          className={classes.formGroup}
          style={{
            marginBottom: 0
          }}
        >
          <label></label>
          {!isFirstSearch && (
            <TableContainer
              component={Paper}
              className={classes.containerTable}
            >
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead className={classes.headTable}>
                  <TableRow>
                    <TableCell style={{ minWidth: 50 }}>選択</TableCell>
                    <TableCell align="left">ユーザ名</TableCell>
                    <TableCell align="left">メールアドレス</TableCell>
                    <TableCell align="right">部署</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!isNullOrEmpty(userApprovers) ? (
                    userApprovers
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4}>データがありません。</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
        <div className={classes.formGroup}>
          <label>承認者一覧</label>
          <div className={classes.boxSelect}>
            <div
              className={classNames(classes.contentChip, {
                [classes.errorChipData]:
                  isNullOrEmpty(listSelect) && !isFirst ? true : false
              })}
            >
              {userSelected}
            </div>
            {isNullOrEmpty(listSelect) && !isFirst ? (
              <Typography className={classes.txtError}>
                必ず承認者を選択してください。
              </Typography>
            ) : (
              ''
            )}
          </div>
        </div>
        {/* row submit */}
        <div className={classes.rowSubmit}>
          <Typography
            className={classNames({
              [classes.msgError]: statusSubmit.status === -1,
              [classes.msgSuc]: statusSubmit.status === 1
            })}
          >
            {statusSubmit.msg}
          </Typography>
          <div style={{ position: 'relative' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenPopupQuestionSave(true)}
              disabled={!isValid || statusSubmit.isLoading}
            >
              {!isNew ? '変更' : '追加'}
            </Button>
            {statusSubmit.isLoading && (
              <CircularProgress size={24} className={classes.iconProgress} />
            )}
          </div>
          <Button
            variant="contained"
            className={classes.btnCance}
            onClick={handleCance}
          >
            キャンセル
          </Button>
        </div>
      </div>
      {/* popup action after call api user */}
      <PopupQuestion
        open={isOpenQuestionSave}
        content={isNew ? '承認グループの新規追加。' : '承認グループの更新。'}
        callback={handleSave}
        handleClose={() => setOpenPopupQuestionSave(false)}
      />
      {/* end popup */}
      {/* popup question cance page addnew/update user */}
      <PopupQuestion
        open={isOpenQuestionCance}
        content={
          isNew ? '新規追加画面を終了しますか。' : '更新画面を終了しますか。'
        }
        callback={handleCance}
        handleClose={() => setOpenPopupQuestionCance(false)}
      />
      {/* end popup */}
    </div>
  );
}

// insert new user
async function callAPISubmitGroup(data, groupId) {
  try {
    let res;
    if (groupId) {
      // update
      res = await axios.put(`${apiRoot}/approvalgroups/${groupId}`, data);
    } else {
      // insert
      res = await axios.post(`${apiRoot}/approvalgroups`, data);
    }
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

// insert new user
async function callApiSearch(data) {
  try {
    const res = await axios.get(`${apiRoot}/users/search/${data.searchTerm}`);
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
