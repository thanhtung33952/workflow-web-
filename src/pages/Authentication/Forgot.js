import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import classNames from 'classnames';
// icon
import MailIcon from '@material-ui/icons/MailOutline';
import ArrowRightIcon from '@material-ui/icons/ArrowRightAlt';
import RegisterIcon from '@material-ui/icons/HowToReg';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SendIcon } from 'components/Icons/Icons';
// image
import logo from 'assets/img/logo.png';
// constant
import { folderRoot, apiRoot } from 'constant/index.js';
import axios from 'axios';

// jss
import useStyles from 'assets/jss/pages/Authentication/Authentication';

export default function Forgot() {
  const classes = useStyles();
  const [isCheck, setCheck] = useState();
  const [data, setData] = useState({ email: '' });
  const [submit, setSubmit] = useState({
    isLoading: false,
    status: 0, // 0: normar, -1 error, 1 success
    msg: ''
  });

  // isValid isEmail
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

  // handle Change Field TextField
  const handleChangeField = name => e => {
    let val = e.target.value;
    if (name === 'remember') val = e.target.checked;
    setData({ ...data, [name]: val });
  };

  // isValid email, password in data
  const isValid = () => {
    if (!data.email || !isEmail()) {
      setCheck(-1);
      return false;
    } else {
      setCheck(1);
      return true;
    }
  };

  // handle forgot
  const handleForgot = async e => {
    if (e) e.preventDefault();
    const isValidation = isValid();
    if (!isValidation) return;
    setSubmit({ ...submit, isLoading: true });
    // start forgot
    const dataSubmit = { email: data.email };

    try {
      const res = await axios.post(`${apiRoot}/forgotpassword`, dataSubmit);
      // forgot error
      if (res.status !== 200) {
        setSubmit({
          ...submit,
          isLoadding: false,
          status: -1,
          msg: 'Oops, something went wrong!'
        });
        return;
      }
      // forgot success
      setSubmit({
        ...submit,
        isLoadding: false,
        status: 1,
        msg:
          'システムはリンクを登録したイーメールに送信したので、アカウントを確認するようにそのリンクをクリックしてください。'
      });
    } catch (error) {
      // Email already exists
      if (error.response && error.response.data.code === -1) {
        setSubmit({
          ...submit,
          isLoadding: false,
          status: -1,
          msg: 'メールアドレスが存在しません。'
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

  // enter submit forgot
  const onKeyPressForgot = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleForgot();
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
                <span>パスワードを取り戻す</span>
              </div>
              {/* form forgot */}
              {submit.status === 1 ? (
                <div className={classes.formSuccess}>
                  <SendIcon />
                  <Typography>{submit.msg}</Typography>
                  <div
                    className={classes.rowSubmit}
                    style={{ marginBottom: 70 }}
                  >
                    <Button
                      disabled={submit.isLoading}
                      type="button"
                      variant="contained"
                      color="primary"
                      fullWidth
                      className={classes.btnClose}
                      href={`${folderRoot}signin`}
                    >
                      ログインへ戻る
                    </Button>
                    {submit.isLoading && (
                      <CircularProgress
                        size={24}
                        className={classes.iconProgress}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <form className={classes.form}>
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
                    onKeyPress={onKeyPressForgot}
                  />
                  {/* row link */}
                  <div className={classes.rowLink}>
                    <Link to={`${folderRoot}signup`} className={classes.link}>
                      <RegisterIcon />
                      サインアップ
                    </Link>
                    <Link to={`${folderRoot}signin`} className={classes.link}>
                      <ArrowRightIcon />
                      ログインに移動
                    </Link>
                  </div>
                  {/* message */}
                  <Typography
                    className={classNames(classes.message, {
                      [classes.msgError]: submit.status === -1,
                      [classes.svg]: submit.status === 1
                    })}
                  >
                    {submit.msg}
                  </Typography>
                  {/* submit */}
                  <div
                    className={classes.rowSubmit}
                    style={{ marginBottom: 70 }}
                  >
                    <Button
                      disabled={submit.isLoading}
                      type="button"
                      variant="contained"
                      color="primary"
                      fullWidth
                      className={classes.submit}
                      onClick={handleForgot}
                    >
                      次へ進む
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
