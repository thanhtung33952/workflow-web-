import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';
// constant
import { apiRoot } from 'constant/index.js';
import { useParams } from 'react-router-dom';
import { isEmail, isNullOrEmpty, isNullOrUndefined } from 'utils/helpers';

// material component
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  Typography,
  Divider,
  TextField,
  FormControl,
  Select,
  InputLabel,
  Button
} from '@material-ui/core';
// icons
import CircularProgress from '@material-ui/core/CircularProgress';
//component customer
import PopupDepartment from 'components/Users/PopupDepartment';
import PopupQuestion from 'components/Popup/PopupQuestion';

// jss
import useStyles from 'assets/jss/pages/Users/FormUser';
import { folderRoot } from 'constant';

export default function FormUser() {
  const classes = useStyles();
  // mode insert/update
  let { user_id } = useParams();
  const [isNew, setNewUser] = useState(true);
  const [userData, setUserData] = useState(null); // userName, email, role, departmentId, approvalGroupId
  // data form
  const name = useFormInput(
    !isNullOrEmpty(userData) ? userData.userName : '',
    true
  );
  const email = useFormInput(
    !isNullOrEmpty(userData) ? userData.email : '',
    false,
    true
  );
  // group data
  const [listGroup, setListGroup] = useState(null);
  const [groupSelect, setGroupSelect] = useState([]);
  // department data
  const [listDepartment, setListDepartment] = useState(null);
  // flag submit
  const [statusSubmit, setStatusSubmit] = useState({
    status: 0, // -1: error, 1: success
    isLoading: false,
    msg: ''
  });
  // is open popup add/edit group user
  const [isOpen, setOpen] = useState(false);
  const [isValid, setInValid] = useState(false);
  // is open popup after save user
  const [isOpenQuestion, setOpenPopupQuestion] = useState(false);
  // is open popup question update
  const [isOpenQuestionUpdate, setOpenPopupQuestionUpdate] = useState(false);
  // is open popup question cance page addnew/update
  const [isOpenQuestionCance, setOpenPopupQuestionCance] = useState(false);

  // get data on select box
  useEffect(() => {
    // check isNew user
    !isNullOrUndefined(user_id) && setNewUser(false);
    // get data department
    async function getDataDepartment() {
      try {
        const res = await axios.get(`${apiRoot}/departments`);
        // error
        if (res.status !== 200) {
          return;
        }
        // success
        setListDepartment(res.data.data);
      } catch (error) {
        return;
      }
    }
    // get data approvalGroup
    async function getListGroup() {
      try {
        const res = await axios.get(`${apiRoot}/approvalgroups`);
        // error
        if (res.status !== 200) {
          return;
        }
        // success
        setListGroup(res.data.data);
      } catch (error) {
        return;
      }
    }

    // get data user (nếu url có user id)
    async function getDataUser(userId) {
      try {
        const res = await axios.get(`${apiRoot}/users/${userId}`);
        // error
        if (res.status !== 200) {
          return;
        }
        // success
        const result = res.data.data;
        setUserData(result);
        setGroupSelect(result.approvalGroup);
      } catch (error) {
        return;
      }
    }
    if (!isNullOrEmpty(user_id)) {
      getDataUser(user_id);
    }

    getDataDepartment();
    getListGroup();
  }, []);

  // check validation
  useEffect(() => {
    // check validation input
    function checkValid() {
      if (!validation()) {
        setInValid(false);
        return;
      }

      setInValid(true);
    }

    checkValid();
  });

  const handleChange = name => e => {
    setUserData({
      ...userData,
      [name]: e.target.value
    });
  };
  // callback from component PopupDepartment
  const handleCallbackGroup = data => {
    setListDepartment(data);
  };

  // save user data
  const handleSave = async () => {
    if (!validation()) return;

    // show question mode update
    if (!isNew) {
      setOpenPopupQuestionUpdate(true);
      return;
    }

    // mode addnew user
    handleAddnew();
  };

  // handle update user
  const handleUpdate = async flag => {
    setOpenPopupQuestionUpdate(false);
    if (flag === 'no' || isNullOrUndefined(user_id)) return;

    // call api
    setStatusSubmit({ ...statusSubmit, isLoading: true });
    const data = {
      userName: name.value,
      email: email.value,
      role:
        !isNullOrUndefined(userData) && !isNullOrUndefined(userData.role)
          ? userData.role
          : 0, // 1: admin;  0:user thường
      departmentId:
        !isNullOrUndefined(userData) &&
        !isNullOrUndefined(userData.departmentId)
          ? userData.departmentId
          : null,
      approvalGroup: isNullOrEmpty(groupSelect)
        ? []
        : groupSelect.map(e => {
            return {
              id: e.id,
              approvalGroupName: e.approvalGroupName
            };
          })
    };
    const result = await callAPIUser(data, user_id);
    // error
    if (!result) {
      setStatusSubmit({
        ...statusSubmit,
        status: -1,
        isLoading: false,
        msg: '更新が失敗しました。'
      });
      return;
    }
    // success
    setStatusSubmit({
      ...statusSubmit,
      status: 1,
      isLoading: false,
      msg: '更新が完了しました。'
    });
  };

  // handle add new user
  const handleAddnew = async () => {
    // call api
    setStatusSubmit({ ...statusSubmit, isLoading: true });
    const data = {
      userName: name.value,
      email: email.value,
      role:
        !isNullOrUndefined(userData) && !isNullOrUndefined(userData.role)
          ? userData.role
          : 0, // 1: admin;  0:user thường
      departmentId:
        !isNullOrUndefined(userData) &&
        !isNullOrUndefined(userData.departmentId)
          ? userData.departmentId
          : null,
      approvalGroup: isNullOrEmpty(groupSelect)
        ? []
        : groupSelect.map(e => {
            return {
              id: e.id,
              approvalGroupName: e.approvalGroupName
            };
          })
    };
    const result = await callAPIUser(data, null);
    // error
    if (!result) {
      setStatusSubmit({
        ...statusSubmit,
        status: -1,
        isLoading: false,
        msg: '新規登録が失敗しました。'
      });
      return;
    }
    // error: Email đã tồn tại
    if (result === -1) {
      setStatusSubmit({
        ...statusSubmit,
        status: -1,
        isLoading: false,
        msg: 'メールはすでに存在します'
      });
      return;
    }
    // success
    setUserData({
      ...userData,
      id: result.id
    });
    setStatusSubmit({
      ...statusSubmit,
      status: 1,
      isLoading: false,
      msg: '新規登録が完了しました。'
    });
    // mode insert nên sau khi insert thành công show question redirect url update user or ridirect url list user
    setOpenPopupQuestion(true);
  };

  // validation
  const validation = () => {
    if (!name.value || !isEmail(email.value)) return false;
    return true;
  };

  const handleClosePopup = () => {
    setOpen(false);
  };

  const getGroupSelected = list => {
    setGroupSelect(list);
  };

  // cance
  const handleCance = flag => {
    setOpenPopupQuestionCance(false);
    // no
    if (flag === 'no') return;
    // yes
    window.location.href = `${folderRoot}users`;
  };

  //
  const handleAfterSave = flag => {
    setOpenPopupQuestion(false);
    // flag: yes||no
    if (flag === 'yes') {
      window.location.href = `${folderRoot}users`;
    } else {
      window.location.href = `${folderRoot}users/update/${userData.id}`;
    }
  };

  // rending option department
  const optionDeparment =
    !isNullOrEmpty(listDepartment) &&
    listDepartment.map(e => {
      return (
        <option value={e.id} key={e.id}>
          {e.departmentName}
        </option>
      );
    });
  return (
    <div className={classes.root}>
      <Typography className={classes.titleForm}>
        {isNew ? `ユーザーの新規追加` : `ユーザ編集`}
      </Typography>
      <Divider />
      <div className={classes.formContent}>
        {statusSubmit.isLoading && (
          <div className={classes.boxLoading}>
            <CircularProgress size={30} />
          </div>
        )}
        <div className={classes.formGroup}>
          <label>
            ユーザー名 <em>（必須）</em>
          </label>
          <TextField {...name} />
        </div>
        <div className={classes.formGroup}>
          <label>
            メールアドレス <em>（必須）</em>
          </label>
          <TextField {...email} disabled={isNew ? false : true} />
        </div>
        <div className={classes.formGroup}>
          <label>部署</label>
          <div className={classes.rowInline}>
            <FormControl
              variant="outlined"
              className={classes.formControlSelect}
            >
              {/* <InputLabel htmlFor="abc">sdf</InputLabel> */}
              <Select
                native
                value={!isNullOrEmpty(userData) ? userData.departmentId : ''}
                onChange={handleChange('departmentId')}
              >
                <option aria-label="None" value="" />
                {optionDeparment}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              className={classes.btnOpen}
              onClick={() => setOpen(true)}
            >
              部署の新規追加
            </Button>
          </div>
        </div>
        <div className={classes.formGroup}>
          <label>管理者機能権限</label>
          <div className={classes.rowInline}>
            <FormControl
              variant="outlined"
              className={classes.formControlSelect}
            >
              <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
              <Select
                native
                value={!isNullOrEmpty(userData) ? userData.role : ''}
                onChange={handleChange('role')}
                className={classes.select}
              >
                <option aria-label="None" value="" />
                <option value={1}>管理者</option>
                <option value={0}>編集者</option>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className={classes.formGroup}>
          <label>承認グループの追加</label>
          <div className={classes.rowInline}>
            <Autocomplete
              classes={{
                root: classes.formControlSelect,
                tag: classes.chip
              }}
              multiple
              options={listGroup ? listGroup : []}
              getOptionLabel={option => option.approvalGroupName}
              onChange={(e, value) => getGroupSelected(value)}
              filterSelectedOptions
              value={groupSelect}
              getOptionSelected={option => {
                return groupSelect.findIndex(x => x.id === option.id) !== -1
                  ? true
                  : false;
              }}
              renderInput={params => (
                <TextField {...params} variant="outlined" />
              )}
            />
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
              onClick={handleSave}
              disabled={!isValid || statusSubmit.isLoading}
            >
              {isNew ? `追加` : `変更`}
            </Button>
            {statusSubmit.isLoading && (
              <CircularProgress size={24} className={classes.iconProgress} />
            )}
          </div>
          <Button
            variant="contained"
            className={classes.btnCance}
            onClick={() => setOpenPopupQuestionCance(true)}
          >
            キャンセル
          </Button>
        </div>

        {/* popup add/edit list group*/}
        <PopupDepartment
          isOpen={isOpen}
          data={listDepartment}
          callback={handleCallbackGroup}
          handleClose={handleClosePopup}
        />
        {/* end popup add/edit list group*/}
        {/* popup question update data */}
        <PopupQuestion
          title="ユーザーの更新を確認する。"
          open={isOpenQuestionUpdate}
          content="変更してよろしでしょうか。"
          callback={handleUpdate}
          handleClose={() => setOpenPopupQuestionUpdate(false)}
        />
        {/* end popup */}

        {/* popup action after call api user */}
        <PopupQuestion
          open={isOpenQuestion}
          title="ユーザー追加の確認"
          content="追加行います。よろしいですか？"
          callback={handleAfterSave}
          handleClose={() => setOpenPopupQuestion(false)}
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
    </div>
  );
}

function useFormInput(initValue, isRequire, isEmailControl = false) {
  const classes = useStyles();
  const [value, setValue] = useState(initValue);
  const [isFirst, setIsFirst] = useState(true);
  useEffect(() => {
    if (!isNullOrEmpty(initValue)) {
      setValue(initValue);
    }
  }, [initValue]);

  function handleChange(e) {
    setValue(e.target.value);

    // check first time
    if (isFirst) {
      setIsFirst(!isFirst);
    }
  }
  let error = isRequire && isNullOrEmpty(value) && !isFirst ? true : false;
  let errorMsg =
    isRequire && isNullOrEmpty(value) && !isFirst ? '入力必須項目です。' : null;

  if (!isFirst && !isNullOrEmpty(value) && isEmailControl && !isEmail(value)) {
    error = true;
    errorMsg = 'メールアドレスは有効がありません。';
  }

  return {
    value: value,
    error: error,
    helperText: errorMsg,
    onChange: handleChange,
    variant: 'outlined',
    className: classes.inputControl,
    InputProps: {
      classes: {
        root: classes.rootInput,
        input: classes.thisInput,
        error: classes.thisInputError
      }
    }
  };
}

// insert new user
async function callAPIUser(data, userId) {
  try {
    let res;
    if (userId) {
      // update
      res = await axios.put(`${apiRoot}/users/${userId}`, data);
    } else {
      // insert
      res = await axios.post(`${apiRoot}/users`, data);
    }
    // error
    if (res.data.code !== 1 || res.status !== 200) {
      return false;
    }
    // success
    return res.data.data;
  } catch (error) {
    const result = error.response;
    if (result.status === 400 && result.data.code === -1) {
      // email đã tồn tại
      return -1;
    }
    return false;
  }
}
