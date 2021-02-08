import React, { useState } from 'react';
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
// icon
import MailIcon from '@material-ui/icons/MailOutline';
import LockIcon from '@material-ui/icons/LockOpen';
import ArrowRightIcon from '@material-ui/icons/ArrowRightAlt';
// image
import logo from 'assets/img/logo.png';
// constant
import { folderRoot, apiRoot } from 'constant/index.js';
import axios from 'axios';

// jss
import useStyles from 'assets/jss/pages/Authentication/Authentication';

export default function Singup() {
  const classes = useStyles();
  const [isCheck, setCheck] = useState();
  const [data, setData] = useState({
    email: '',
    password: '',
    rePassWord: ''
  });
  const [submit, setSubmit] = useState({
    isLoading: false,
    status: 0, // 0: normar, -1 error, 1 success
    msg: ''
  });

  const isEmail = () => {
    if (!data.email) {
      return false;
    }

    // eslint-disable-next-line no-useless-escape
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(data.email).toLowerCase())) {
      return false;
    } else {
      return true;
    }
  };
  const handleChangeField = name => e => {
    let val = e.target.value;
    setData({ ...data, [name]: val });
  };

  const onKeyPressRegister = e => {
    if (e.key === 'Enter') {
      handelRegister();
    }
  };

  const isValid = () => {
    if (
      !data.email ||
      !data.passWord ||
      !isEmail() ||
      data.passWord !== data.rePassWord
    ) {
      setCheck(-1);
      return false;
    } else {
      setCheck(1);
      return true;
    }
  };
  const handelRegister = async () => {
    const isValidation = isValid();
    if (!isValidation) return;
    setSubmit({ ...submit, isLoading: true });
    // start register
    const dataSubmit = {
      email: data.email,
      password: data.passWord
    };

    try {
      const res = await axios.post(`${apiRoot}/register`, dataSubmit);
      // register error
      if (res.status !== 200) {
        setSubmit({
          ...submit,
          isLoadding: false,
          status: -1,
          msg: 'Oops, something went wrong!'
        });
        return;
      }
      // register success
      setSubmit({
        ...submit,
        isLoadding: false,
        status: 1,
        msg: '登録に成功しました'
      });
    } catch (error) {
      // Email already exists
      if (error.response && error.response.data.code === -1) {
        setSubmit({
          ...submit,
          isLoadding: false,
          status: -1,
          msg: 'メールはすでに存在します'
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
  return (
    <div className={classNames(classes.session)}>
      <div className={classes.content}>
        <Box className={classes.wrapper} boxShadow={2}>
          <Card className={classes.cardForm}>
            <CardContent>
              {/* logo */}
              <div className={classes.logo}>
                <img src={logo} alt="Jibannet" />
                <span>アカウントにサインアップする</span>
              </div>
              {/* form signup */}
              <form className={classes.form} style={{ marginTop: 70 }}>
                {/* email */}
                <TextField
                  error={!isEmail() && isCheck === -1 ? true : false}
                  className={classes.inputLogin}
                  helperText={
                    !isEmail() &&
                    isCheck === -1 &&
                    'メールアドレスは有効がありません。'
                  }
                  placeholder="メールアドレス"
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
                        <MailIcon />
                      </InputAdornment>
                    )
                  }}
                  onChange={handleChangeField('email')}
                  onKeyPress={onKeyPressRegister}
                />
                {/* password */}
                <TextField
                  error={!data.passWord && isCheck === -1 ? true : false}
                  className={classes.inputLogin}
                  helperText={
                    !data.passWord && isCheck === -1 && '必ず入力してください。'
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
                  onKeyPress={onKeyPressRegister}
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
                  onKeyPress={onKeyPressRegister}
                  style={{ marginBottom: 10 }}
                />
                {/* link register */}
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
                    onClick={handelRegister}
                  >
                    サインアップ
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
