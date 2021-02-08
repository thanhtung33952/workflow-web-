import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from 'classnames';
import LockIcon from '@material-ui/icons/LockOpen';
import ArrowRightIcon from '@material-ui/icons/ArrowRightAlt';
import { ShieldIcon } from 'components/Icons/Icons';
// image
import logo from 'assets/img/logo.png';
// constant
import { folderRoot, apiRoot } from 'constant/index.js';
import axios from 'axios';

// jss
import useStyles from 'assets/jss/pages/Authentication/Authentication';

export default function PasswordReset() {
  const classes = useStyles();
  const [isCheck, setCheck] = useState();
  const [data, setData] = useState({
    password: '',
    rePassWord: ''
  });
  const [submit, setSubmit] = useState({
    isLoading: false,
    status: 0, // 0: normar, -1 error, 1 success
    msg: ''
  });

  const query = new URLSearchParams(useLocation().search);
  const code = query.get('code');

  // handle Change Field TextField
  const handleChangeField = name => e => {
    let val = e.target.value;
    setData({ ...data, [name]: val });
  };

  // isValid password in data and passWord !== rePassWord
  const isValid = () => {
    if (!data.passWord || data.passWord !== data.rePassWord) {
      setCheck(-1);
      return false;
    } else {
      setCheck(1);
      return true;
    }
  };

  // handle password reset
  const handlePasswordReset = async () => {
    const isValidation = isValid();
    if (!isValidation || !code) return;
    setSubmit({ ...submit, isLoading: true });
    // start reset password
    const dataSubmit = {
      codeChangePass: code,
      newPassword: data.passWord
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
  };

  // enter submit PasswordReset
  const onKeyPressPasswordReset = e => {
    if (e.key === 'Enter') {
      handlePasswordReset();
    }
  };

  return (
    <div className={classNames(classes.session)}>
      <div className={classes.content}>
        <Box className={classes.wrapper} boxShadow={2}>
          <Card className={classes.cardForm}>
            <CardContent>
              {/* logo */}
              <div className={classes.logo}>
                <img src={logo} alt="Jibannet" />
                <span>パスワードを更新する</span>
              </div>
              {/* form reset passowrd */}
              {submit.status === 1 ? (
                <div className={classes.formSuccess}>
                  <ShieldIcon />
                  <Typography>{submit.msg}</Typography>
                  {/* link login */}
                  <Link
                    to={`${folderRoot}signin`}
                    className={classes.link}
                    style={{ marginTop: 20 }}
                  >
                    <ArrowRightIcon style={{ fontSize: 22 }} />
                    ログインに移動
                  </Link>
                </div>
              ) : (
                <form className={classes.form} style={{ marginTop: 70 }}>
                  {/* password */}
                  <TextField
                    error={!data.passWord && isCheck === -1 ? true : false}
                    className={classes.inputLogin}
                    helperText={
                      !data.passWord &&
                      isCheck === -1 &&
                      '必ず入力してください。'
                    }
                    placeholder="パスワード"
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
                    onChange={handleChangeField('passWord')}
                    onKeyPress={onKeyPressPasswordReset}
                  />
                  {/* re-password */}
                  <TextField
                    error={
                      (!data.rePassWord && isCheck === -1) ||
                      (isCheck === -1 && data.rePassWord !== data.passWord)
                        ? true
                        : false
                    }
                    className={classes.inputLogin}
                    helperText={
                      !data.rePassWord && isCheck === -1
                        ? '必ず入力してください。'
                        : isCheck === -1 &&
                          data.rePassWord !== data.passWord &&
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
                  {/* link login */}
                  <Link to={`${folderRoot}signin`} className={classes.link}>
                    <ArrowRightIcon />
                    ログインに移動
                  </Link>
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
                      disabled={submit.isLoading}
                      type="button"
                      variant="contained"
                      color="primary"
                      fullWidth
                      className={classes.submit}
                      onClick={handlePasswordReset}
                    >
                      更新
                    </Button>
                    {submit.isLoading && (
                      <CircularProgress
                        size={24}
                        className={classes.iconProgress}
                      />
                    )}
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </Box>
      </div>
    </div>
  );
}
