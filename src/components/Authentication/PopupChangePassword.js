import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// @material-ui components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
// jss
import useStyles from 'assets/jss/components/authentication/popupChangePassword';
// constant
import { apiRoot } from 'constant/index.js';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
// component common
import FormChangepassword from 'components/Form/FormChangepassword';
// import { AuthContext } from 'libs/Auth';
// helpers
import { isNullOrUndefined, isNullOrEmpty } from 'utils/helpers';

const validationSchema = Yup.object({
  oldPassword: Yup.string().required('必須項目です。入力してください。'),
  newPassword: Yup.string()
    .required('必須項目です。入力してください。'),
  newPasswordConfirm: Yup.string()
    .required('必須項目です。入力してください。')
    .oneOf(
      [Yup.ref('newPassword'), null],
      '新しいパスワードと確認パスワードが異なっています'
    )
});
function PopupChangePassword(props) {
  const classes = useStyles();
  const { userInfo, isOpen, onClose } = props;
  const [statusSubmit, setStatusSubmit] = useState({
    isLoading: false,
    open: false,
    msg: '',
    flag: 0 // 0: normal, 1: success, -1: error
  });

  useEffect(() => {
    // nếu isOpen === true , tức là popup đó mở lên thì đi clean statusSubmit trở về default
    if (isOpen) setStatusSubmit({...statusSubmit, msg: ''});
  }, [isOpen])
  // submit form
  const submit = async data => {
    if ( isNullOrUndefined(userInfo.email)) return;

    setStatusSubmit({
      ...statusSubmit,
      open: false,
      isLoading: true
    });
    // call api
    const dataSubmit = {
      email: userInfo.email,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword
    };
    try {
      const res = await axios.put(`${apiRoot}/updatepassword`, dataSubmit);
      // Failed
      console.log(res);
      if (res.status !== 200) {
        setStatusSubmit({
          ...statusSubmit,
          flag: -1,
          open: true,
          msg: 'Oop! パスワードの変更を失敗しました。',
          isLoading: false
        });
      }
      // pass cũ sai
      if (res.data.code === -1) {
        setStatusSubmit({
          ...statusSubmit,
          flag: -1,
          open: true,
          msg: '現在のパスワードは正しくない。',
          isLoading: false
        });
      }
      // Success
      setStatusSubmit({
        ...statusSubmit,
        flag: 1,
        open: true,
        msg: 'パスワードの変更を完了しました。',
        isLoading: false
      });
    } catch (error) {
      if (error.response.data.code === -1) {
        setStatusSubmit({
          ...statusSubmit,
          flag: -1,
          open: true,
          msg: '現在のパスワードは正しくない。',
          isLoading: false
        });
      } else {
        setStatusSubmit({
          ...statusSubmit,
          flag: -1,
          open: true,
          msg: 'Oop! パスワードの変更を失敗しました。',
          isLoading: false
        });
      }
    }
  };
  const values = {
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: ''
  };
  return (
      <Dialog
        className={classes.popupchangpass}
        open={isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <div className={classes.title}>
        <DialogTitle id="alert-dialog-title">{'パスワード変更'}</DialogTitle>
        <Button
            type="button"
            variant="contained"
            className={classes.btnclose}
            onClick={onClose}
        >
            <CloseIcon />
        </Button>
        <Formik
          initialValues={values}
          validationSchema={validationSchema}
          onSubmit={submit}
        >
            {props => <FormChangepassword {...props} status={statusSubmit} />}
        </Formik>
        </div>
    </Dialog>
  );
}

PopupChangePassword.prototypes = {
  userInfo: PropTypes.object.isRequired,
  isOpen: PropTypes.string,
  onClose: PropTypes.string
};
export default PopupChangePassword;
