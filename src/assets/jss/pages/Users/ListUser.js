import { fade, makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    // overflowY: 'scroll'
  },
  titleTool: {
    fontWeight: 600,
    margin: '10px 0 0 40px',
    fontSize: 18
  },
  contentForm: {
    height: '100%',
    padding: 10,
    marginTop: 5
  },
  table: {
    minWidth: 650,
    '& .MuiBackdrop-root': {
      top: '100%'
    },
    '& td': {
      padding: 10
    },
    '& .MuiTableCell-alignCenter': {
      paddingTop: 0,
      paddingBottom: 0
    }
  },
  headTable: {
    textAlign: 'center',
    '& .MuiTableCell-head': {
      backgroundColor: '#4A4E69',
      color: '#fff',
      lineHeight: '0.5rem',
      fontSize: '1rem',
      fontWeight: 600,
      borderRight: 0,
      paddingTop: 15,
      paddingBottom: 15
    }
  },
  container: {
    height: 'calc(100vh - 225px)'
  },
  btnEdit: {
    height: 42,
    borderRadius: '50%',
    minWidth: 0,
    minHeight: 0,
    maxHeight: 42,
    maxWidth: 42,
    textTransform: 'none',
    color: '#fff',
    marginRight: 10,
    backgroundColor: '#ffc107',
    '&:hover': {
      backgroundColor: '#ffa000'
    }
  },
  btnDelete: {
    marginRight: 10,
    height: 42,
    borderRadius: '50%',
    minWidth: 0,
    minHeight: 0,
    maxHeight: 42,
    maxWidth: 42,
    color: '#fff',
    backgroundColor: '#f44336',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#d32f2f'
    }
  },
  btnAdd: {
    height: 38,
    color: '#fff',
    margin: '0 40px 10px 0',
    float: 'right',
    fontWeight: 600,
    backgroundColor: '#4ca4fb',
    fontSize: 14,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#4ca4fb'
    }
  },
  btnUser: {
    borderRadius: 4,
    width: '80%',
    backgroundColor: '#357a38',
    textTransform: 'none',
    color: '#fff',
    '& .MuiSvgIcon-root': {
      fontSize: '1.3rem'
    }
  },
  search: {
    border: '1px solid gray',
    position: 'relative',
    borderRadius: 10,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: 40,
    marginLeft: 40,
    marginTop: 60
  },
  searchFormlistApplication: {
    border: '1px solid gray',
    position: 'relative',
    borderRadius: 10,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: 40,
    marginLeft: 40,
    marginTop: 30,
    marginBottom: 30
  },
  searchIcon: {
    padding: '0 5px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  inputRoot: {
    color: 'inherit',
    display: 'flex',
    width: '50%'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%'
  },
  underline: {
    textDecoration: 'underline'
  },
  iconProgress: {
    color: 'gray',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  alignTableCell: {
    paddingLeft: '5%'
  },
  searchReport: {
    border: '1px solid gray',
    position: 'relative',
    borderRadius: 10,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    width: 'calc(100vw - 50%)',
    marginLeft: 40,
    height: 38
  },
  formGroup: {
    marginLeft: 40,
    display: 'inline-flex',
    width: '100%',
    verticalAlign: 'middle',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
    '& label': {
      width: '40%',
      fontSize: 13
    },
    '& $inputControl': {
      '& input': {
        padding: '5px 8px'
      }
    }
  },
  form: {
    display: 'flex',
    marginTop: 10,
    width: 'calc(100vw - 50%)'
  },
  form1: {
    flex: 1,
    width: '45%'
  },
  form2: {
    flex: 1,
    width: '45%',
    marginLeft: 77
  },
  inputControl: {
    flex: 1,
    '& p': {
      margin: '5px 0 0',
      fontSize: 10
    }
  },
  rootInput: {
    height: 35,
    '& fieldset': {
      borderColor: theme.palette.grey.light + `${'!important'}`,
      borderRadius: 4
    }
  },
  thisInputError: {
    '& fieldset': {
      borderColor: theme.palette.pink.main + `${'!important'}`
    }
  },
  thisInput: {
    padding: 10
  },
  thisInput1: {
    padding: 10,
    textAlign: 'right'
  },
  rowInline: {
    display: 'flex',
    width: '60%'
  },
  formControlSelect: {
    flex: 1,
    '& select': {
      padding: 6
    },
    '& fieldset': {
      borderColor: theme.palette.grey.light + `${'!important'}`
    }
  },
  btnForm: {
    minWidth: '200px',
    height: 38,
    color: '#000',
    margin: '10px 0 0 40px',
    fontWeight: 600,
    backgroundColor: '#FFF',
    fontSize: 14,
    textTransform: 'none',
    borderRadius: 30,
    border: '2px solid #4ca4fb',
    '&:hover': {
      backgroundColor: '#FFF'
    },
    '& .MuiSvgIcon-root': {
      color: 'lawngreen'
    },
    '& p': {
      margin: '0 0 0 10px'
    }
  },
  containerReport: {
    height: 'calc(100vh - 34.4%)'
  },
  twoInput: {
    display: 'flex',
    flex: 1,
    width: '80%'
  },
  rootInput1: {
    height: 35,
    '& fieldset': {
      borderColor: theme.palette.grey.light + `${'!important'}`,
      borderRadius: '4px 0 0 4px',
      borderRight: 'none'
    }
  },
  rootInput2: {
    height: 35,
    '& .MuiOutlinedInput-input': {
      textAlign: 'right'
    },
    '& fieldset': {
      borderColor: theme.palette.grey.light + `${'!important'}`,
      borderRadius: '0px 4px 4px 0'
    }
  }
}));
