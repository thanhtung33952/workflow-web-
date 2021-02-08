import { fade, makeStyles } from '@material-ui/core/styles';
import { rowSubmit, btnCance } from 'assets/common';

export default makeStyles(theme => ({
  root: {
    // '& .MuiBackdrop-root': {
    //   backgroundColor: 'inherit !mportant'
    // }
  },
  formFirst: {
    padding: '0 40px',
    backgroundColor: '#F8F8F8',
    borderBottom: 'solid 1px #D6D5D5',
    paddingBottom: 20
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 30
  },
  row2: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  col: {
    flex: 1,
    paddingRight: 20
  },
  inputControl: {
    flex: 1,
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
  inputGroup: {
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
      // width: '65%',
      '& input': {
        padding: '5px 8px'
      }
    }
  },
  formCreate: {
    display: 'inline-flex',
    width: '50%',
    verticalAlign: 'middle',
    alignItems: 'center',
    marginRight: 20,
    '& label': {
      fontSize: 22
    }
  },
  twoInput: {
    display: 'flex',
    flex: 1
  },
  rootInput1: {
    '& fieldset': {
      borderColor: theme.palette.grey.light + `${'!important'}`,
      borderRadius: '4px 0 0 4px',
      borderRight: 'none'
    }
  },
  rootInput2: {
    '& fieldset': {
      borderColor: theme.palette.grey.light + `${'!important'}`,
      borderRadius: '0px 4px 4px 0'
    }
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
  tbContainer: {
    width: 'auto',
    maxWidth: '100%',
    display: 'inline-block',
    overflowX: 'auto'
  },
  table: {
    minWidth: 400,
    width: 'auto',
    maxWidth: '100%',
    '& .MuiBackdrop-root': {
      top: '100%'
    },
    '& td': {
      padding: 10
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
  btnAddColumn: {
    width: 50,
    height: 50,
    minWidth: 'auto',
    borderRadius: '50%',
    backgroundColor: '#00A2FF'
  },
  selectControl: {
    flex: 1,
    '& select': {
      padding: 6
    },
    '& fieldset': {
      borderColor: theme.palette.grey.light + `${'!important'}`
    }
  }
}));
