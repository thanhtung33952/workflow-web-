import React, { useState, useEffect } from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { withCookies, Cookies, useCookies } from 'react-cookie';
import classNames from 'classnames';
import { Redirect, useLocation } from 'react-router-dom';

// @material-ui components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import LockIcon from '@material-ui/icons/LockOpen';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';

// jss
import useStyles from 'assets/jss/pages/Authentication/ChangePasswordStyle';
// constant
import { folderRoot, apiRoot } from 'constant/index.js';
import axios from 'axios';
// helpers
import { isNullOrUndefined, isNullOrEmpty } from 'utils/helpers';
// image
import logo from 'assets/img/logo.png';

function ChangePassword() {
  const classes = useStyles();
  const [cookies, removeCookie] = useCookies(['AuthenticationWorkflow']);
  const [isCheck, setCheck] = useState();
  // cookies
  const [data, setData] = useState({
    oldPassword: '',
    newPassword: ''
  });
  const [submit, setSubmit] = useState({
    isLoading: false,
    status: 0, // 0: normar, -1 error, 1 success
    msg: ''
  });
  const [inValid, setInValid] = useState(false);

  const query = new URLSearchParams(useLocation().search);
  const email = query.get('email');
  const querypassword = new URLSearchParams(useLocation().search);
  const password = querypassword.get('password');

  useEffect(() => {
    // check validation input
    function checkValid() {
      if (isNullOrEmpty(data.newPassword) || isNullOrEmpty(data.rePassWord)) {
        setInValid(false);
        return;
      }

      setInValid(true);
    }

    checkValid();
  });
  const handleChangeField = name => e => {
    let val = e.target.value;
    setData({ ...data, [name]: val });
  };

  const isValid = () => {
    if (data.newPassword !== data.rePassWord) {
      setCheck(-1);
      return false;
    } else {
      setCheck(1);
      return true;
    }
  };
  const handelPasswordReset = async () => {
    const isValidation = isValid();
    if (!isValidation || isNullOrUndefined(email, password)) return;
    setSubmit({ ...submit, isLoading: true });
    // start reset password
    const dataSubmit = {
      email: email,
      oldPassword: password,
      newPassword: data.newPassword
    };
    try {
      const res = await axios.put(`${apiRoot}/updatepassword`, dataSubmit);
      // reset password error
      if (res.status !== 200) {
        setSubmit({
          ...submit,
          isLoadding: false,
          status: -1,
          msg: 'Oops, something went wrong!'
        });
        return;
      }
      // reset password success
      setSubmit({
        ...submit,
        isLoadding: false,
        status: 1,
        msg: 'パスワードが正常に更新されました'
      });
    } catch (error) {
      // code not found
      if (error.response && error.response.data.code === -1) {
        setSubmit({
          ...submit,
          isLoadding: false,
          status: -1,
          msg: 'パスワードの更新に失敗しました'
        });
        return;
      }
      setSubmit({
        ...submit,
        isLoadding: false,
        status: -1,
        msg: 'Oops, something went wrong!'
      });
    }
    removeCookie('AuthenticationWorkflow');
  };
  const onKeyPressPasswordReset = e => {
    if (e.key === 'Enter') {
      handelPasswordReset();
    }
  };
  // ChangePassword success redirect to signin page
  if (submit.status === 1) {
    return <Redirect to={`${folderRoot}signin`} />;
  }

  return (
    <div className={classNames(classes.session)}>
      <div className={classes.content}>
        <Box className={classes.wrapper} boxShadow={2}>
          <Card className={classes.cardForm}>
            <CardContent>
              {/* logo */}
              <div className={classes.logo}>
                <img src={logo} alt="Jibannet" />
                <span>パスワード変更</span>
              </div>
              <Typography variant="h1" component="h1" className={classes.title}>
                {'地盤ネットワークフローへようこそ'}
              </Typography>
              {/* form ChangePassword */}
              <form className={classes.form} style={{ marginTop: 100 }}>
                <Typography className={classes.titleForm}>
                  {'パスワードの変更をお願いいたします。'}
                </Typography>
                {/* newPassword */}
                <TextField
                  error={!data.newPassword && isCheck === -1 ? true : false}
                  className={classes.inputLogin}
                  helperText={
                    !data.newPassword &&
                    isCheck === -1 &&
                    '必ず入力してください。'
                  }
                  placeholder="新しいパスワード"
                  type="password"
                  variant="outlined"
                  InputProps={{
                    classes: {
                      root: classes.rootInput,
                      input: classes.thisInput,
                      error: classes.thisInputError
                    },
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        className={classes.iconInput}
                      >
                        <LockIcon />
                      </InputAdornment>
                    )
                  }}
                  onChange={handleChangeField('newPassword')}
                  onKeyPress={onKeyPressPasswordReset}
                />
                {/* re-password */}
                <TextField
                  error={
                    (!data.rePassWord && isCheck === -1) ||
                    (isCheck === -1 && data.rePassWord !== data.newPassword)
                      ? true
                      : false
                  }
                  className={classes.inputLogin}
                  helperText={
                    !data.rePassWord && isCheck === -1
                      ? '必ず入力してください。'
                      : isCheck === -1 &&
                        data.rePassWord !== data.newPassword &&
                        '新しいパスワードが一致しません'
                  }
                  placeholder="パスワードを再入力"
                  type="password"
                  variant="outlined"
                  InputProps={{
                    classes: {
                      root: classes.rootInput,
                      input: classes.thisInput,
                      error: classes.thisInputError
                    },
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        className={classes.iconInput}
                      >
                        <LockIcon />
                      </InputAdornment>
                    )
                  }}
                  onChange={handleChangeField('rePassWord')}
                  onKeyPress={onKeyPressPasswordReset}
                  style={{ marginBottom: 10 }}
                />
                {/* message */}
                <Typography
                  className={classNames(classes.message, {
                    [classes.msgError]: submit.status === -1,
                    [classes.msgSuc]: submit.status === 1
                  })}
                >
                  {submit.msg}
                </Typography>
                {/* submit */}
                <div className={classes.rowSubmit}>
                  <Button
                    disabled={submit.isLoading || !inValid}
                    type="button"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.submit}
                    onClick={handelPasswordReset}
                  >
                    変更
                  </Button>
                  {submit.isLoading && (
                    <CircularProgress
                      size={24}
                      className={classes.iconProgress}
                    />
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </Box>
      </div>
    </div>
  );
}

ChangePassword.prototypes = {
  userInfo: PropTypes.object.isRequired,
  cookies: instanceOf(Cookies).isRequired
};
export default withCookies(ChangePassword);
