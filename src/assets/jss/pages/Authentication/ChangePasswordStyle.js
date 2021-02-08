import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  popupchangpass: {
    '& .MuiTypography-h6': {
      textAlign: 'center'
    },
    '& .MuiDialog-paperWidthSm': {
      width: 400
    }
  },
  session: {
    position: 'relative',
    zIndex: 4000,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    padding: `40px ${theme.spacing(1)}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1 0 auto',
    flexDirection: 'column',
    minHeight: '100%',
    textAlign: 'center'
  },
  wrapper: {
    flex: 'none',
    maxWidth: 450,
    width: '100%',
    margin: '0 auto'
  },
  cardForm: {
    borderTopColor: theme.palette.grey.main,
    borderBottomColor: theme.palette.grey.main,
    borderBottom: 'solid 15px',
    borderTop: 'solid 15px',
    padding: '0 10px'
  },
  logo: {
    flexGrow: 1,
    overflow: 'hidden',
    margin: 'auto 0',
    padding: 0,
    width: 'auto',
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.primary.main,
    alignItems: 'flex-end',
    '& img': {
      [theme.breakpoints.up('sm')]: {
        maxWidth: '160px'
      },
      [theme.breakpoints.down('sm')]: {
        maxWidth: '150px'
      }
    },
    '& span': {
      fontSize: '0.8rem',
      textAlign: 'left',
      marginLeft: 10
    }
  },
  inputLogin: {
    width: '100%',
    marginBottom: 20
  },
  rootInput: {
    '& fieldset': {
      borderRadius: 5,
      borderColor: theme.palette.grey.pale + `${'!important'}`,
      backgroundColor: '#fff'
    }
  },
  thisInputError: {
    '& fieldset': {
      borderColor: theme.palette.pink.main + `${'!important'}`
    }
  },
  iconInput: {
    zIndex: 999,
    color: theme.palette.grey.light,
    '& svg': {
      fontSize: 20
    }
  },
  thisInput: {
    padding: 12,
    borderRadius: 0,
    zIndex: 2,
    color: '#616161'
  },
  message: {
    fontSize: '0.8rem',
    marginTop: 30,
    marginBottom: 10
  },
  msgError: {
    color: theme.palette.pink.main,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10
  },
  msgSuc: {
    color: theme.palette.green.main,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10
  },
  rowSubmit: {
    position: 'relative',
    marginBottom: 30,
    width: '80%',
    margin: 'auto'
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
  form: {
    marginTop: '0px !important',
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
    },
    '& .MuiTypography-body1': {
      fontSize: 14,
      fontWeight: 900,
      textShadow: '0px 0px 1px #606060',
      color: '#606060',
      marginBottom: 30
    }
  },
  title: {
    paddingTop: 30,
    marginBottom: 40,
    color: '#1c3d76',
    fontSize: 24,
    fontWeight: 'bold',
    textShadow: '1px 1px 2px #051b42'
  }
}));
