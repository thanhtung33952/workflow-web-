import { fade, makeStyles } from '@material-ui/core/styles';
import { rowSubmit, btnCance } from 'assets/common';

export default makeStyles(theme => ({
  root: {
    // '& .MuiBackdrop-root': {
    //   backgroundColor: 'inherit !mportant'
    // }
    height: '100%'
  },
  inputControl: {
    '& p': {
      margin: '5px 0 0',
      fontSize: 10
    }
  },
  rootInput: {
    '& fieldset': {
      borderColor: theme.palette.grey.light + `${'!important'}`
    }
  },
  thisInputError: {
    '& fieldset': {
      borderColor: theme.palette.pink.main + `${'!important'}`
    }
  },
  thisInput: {
    padding: 8
  },
  btnGroup: {
    display: 'flex',
    '& div': {
      display: 'flex',
      flexDirection: 'column',
      fontSize: 10,
      textAlign: 'center'
    },
    '& svg': {
      fontSize: 18,
      color: theme.palette.grey.dark
    },
    '& button': {
      padding: '4px 16px',
      minWidth: 60,
      backgroundColor: '#CDCED0',
      border: 'none',
      marginBottom: 2
    }
  },
  formCreate: {
    display: 'inline-flex',
    width: '50%',
    verticalAlign: 'middle',
    alignItems: 'center',
    marginRight: 20
  },
  btnGroupAction: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& button': {
      margin: '0 10px',
      color: '#fff'
    }
  },
  btnEdit: {
    backgroundColor: '#00A2FF',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#0071b2'
    }
  },
  btnDelete: {
    backgroundColor: '#FF644E',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#b24636'
    }
  },
  listRequest: {
    width: '100%',
    display: 'table',
    marginTop: 20,
    borderTop: 'solid 1px #CDCED0',
    '& dl': {
      display: 'table-row',
      '& dt:nth-child(2)': {
        textAlign: 'right'
      }
    },
    '& dt': {
      display: 'table-cell',
      borderBottom: 'solid 1px #CDCED0',
      padding: 10
    },
    '& button': {
      padding: '2px 16px',
      margin: '0 5px'
    }
  },
  sidebar: {
    backgroundColor: theme.palette.grey.light,
    marginTop: 20,
    padding: '20px 10px',
    height: '100%'
  },
  formControlRoot: {
    paddingRight: 16,
    '& svg': {
      color: '#fff'
    }
  },
  labelCheck: {
    width: '100%',
    fontSize: 12,
    color: '#fff'
  },
  formInput: {
    display: 'flex',
    padding: '0 16px',
    verticalAlign: 'middle',
    marginTop: 15,
    '& label': {
      fontSize: 12,
      color: '#fff',
      marginRight: 10
    },
    '& $inputControl': {
      flex: 1
    },
    '& input': {
      backgroundColor: '#fff',
      padding: '4px 10px'
    },
    '& fieldset': {
      border: 'none'
    }
  },
  iconProgress: {
    color: 'gray',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}));
