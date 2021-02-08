import React, { useContext } from 'react';
// constant
import PropTypes from 'prop-types';
import { Field } from 'formik';

import 'moment/locale/ja';
// material ui
import { Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import LockIcon from '@material-ui/icons/LockOpen';
import CloseIcon from '@material-ui/icons/Close';

// component customer
import InputSeePasswordControl from 'components/CustomForm/InputSeePasswordControl';
import InputPasswordControl from 'components/CustomForm/InputPasswordControl';

// jss
const useStyles = makeStyles(theme => ({
    form: {
        margin: 'auto',
        [theme.breakpoints.down('md')]: {
          width: '85%'
        },
        '& .MuiOutlinedInput-root': {
          width: '80%',
          margin: 'auto'
        },
        '& .MuiFormHelperText-root.Mui-error': {
          marginLeft: '11%'
        }
      },
    row: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 12,
        '& label': {
          width: '30%'
        }
    },
    rowSubmit: {
        position: 'relative',
        marginBottom: 30,
        width: '80%',
        margin: 'auto',
        paddingTop: 10
      },
      submit: {
        fontSize: '1rem',
        fontWeight: 400
      },
      iconProgress: {
        color: theme.palette.grey.light,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12
      },
      message: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 14
      },
      msgErr: {
        color: 'red'
      },
      msgSucc: {
        color: '#00bd40'
      }
  }));
function FormChangepassword(props) {
  const classes = useStyles();
  const { handleSubmit, isValid, isSubmitting, status, isOpen } = props;

  return (
    <form onSubmit={handleSubmit} autocomplete="off" open={isOpen} className={classes.form} style={{ marginTop: 30 }}>
        {/* oldPassword */}
        <div className={classes.row}>
            <Field
            name="oldPassword"
            placeholder="現在のパスワード"
            autoComplete="new-password"
            component={InputPasswordControl}
            className={classes.inputControl}
            />
        </div>
        {/* newPassword */}
        <div className={classes.row}>
            <Field
            placeholder="新しいパスワード"
            name="newPassword"
            autoComplete="new-password"
            component={InputSeePasswordControl}
            className={classes.inputControl}
            />
        </div>
        {/* newPasswordConfirm */}
        <div className={classes.row}>
            <Field
            placeholder="パスワードを再入力"
            name="newPasswordConfirm"
            autoComplete="new-password"
            component={InputSeePasswordControl}
            className={classes.inputControl}
            />
        </div>

        {status.open && (
            <div
            className={`${classes.message} ${
                status.flag !== 1 ? classes.msgErr : classes.msgSucc
            }`}
            >
            <p>{status.msg}</p>
            </div>
        )}
        <div className={classes.rowSubmit}>
            <Button
            variant="contained"
            color="primary"
            className={classes.submit}
            type="submit"
            fullWidth
            disabled={!isValid || isSubmitting}
            >
            変更
            </Button>
            {isSubmitting && (
            <CircularProgress size={24} className={classes.iconProgress} />
            )}
        </div>
  </form>
  );
}
FormChangepassword.prototypes = {
    isOpen: PropTypes.string,
    status: PropTypes.string,
  };
export default FormChangepassword;
