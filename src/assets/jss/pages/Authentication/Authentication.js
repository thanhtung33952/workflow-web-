import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  card: {
    overflow: 'visible'
  },
  session: {
    position: 'relative',
    zIndex: 4000,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  background: {
    backgroundColor: theme.palette.primary.main
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
  fullWidth: {
    width: '100%'
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
  form: {
    width: '80%',
    margin: 'auto',
    marginTop: 100,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: 60
    }
  },
  inputLogin: {
    width: '100%',
    marginBottom: 20
  },
  rowInputForm: {
    margin: 0,
    minWidth: '70%',
    '& p': {
      marginLeft: 0
    }
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
  checkRemember: {
    '& svg': {
      fontSize: 18,
      color: theme.palette.grey.light
    },
    '& span': {
      fontSize: '0.8rem'
    }
  },
  checkbox: {
    fontSize: 12
  },
  message: {
    fontSize: '0.8rem',
    marginTop: 30,
    marginBottom: 10
  },
  msgError: {
    color: theme.palette.pink.main
  },
  msgSuc: {
    color: theme.palette.green.main
  },
  rowSubmit: {
    position: 'relative',
    marginBottom: 30
  },
  submit: {
    fontSize: '1.3rem',
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
  link: {
    color: theme.palette.grey.main,
    fontSize: '0.8rem',
    textDecoration: 'none',
    display: 'block',
    flex: 1,
    '& svg': {
      color: theme.palette.grey.main,
      verticalAlign: 'middle',
      marginRight: 5
    }
  },
  rowLink: {
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'center'
  },
  formSuccess: {
    padding: '80px 0 80px',
    '& svg': {
      fontSize: '4rem',
      color: theme.palette.green.main
    },
    '& p': {
      marginTop: 20,
      fontSize: '1rem',
      color: theme.palette.grey.main
    }
  },
  btnClose: {
    height: 38,
    color: '#fff',
    margin: '60px 0 10px 0',
    float: 'right',
    fontWeight: 400,
    backgroundColor: '#4a4e69',
    fontSize: '1rem',
    textTransform: 'none',
    width: 150,
    '&:hover': {
      backgroundColor: '#4a4e69'
    }
  }
}));
