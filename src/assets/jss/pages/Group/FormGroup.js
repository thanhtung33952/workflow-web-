import { makeStyles } from '@material-ui/core/styles';
import { rowSubmit, btnCance } from 'assets/common';
export default makeStyles(theme => ({
  root: {
    height: '100%',
    overflowY: 'auto'
  },
  titleForm: {
    margin: '20px 20px 40px 40px',
    fontSize: '1.2rem'
  },
  formContent: {
    padding: 40,
    position: 'relative'
  },
  formGroup: {
    display: 'flex',
    marginBottom: 20,
    alignItems: 'center',
    '& label': {
      width: '20%',
      '& em': {
        color: 'red',
        fontStyle: 'inherit'
      }
    }
  },
  inputControl: {
    width: '80%',
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
    padding: 10
  },
  rowInline: {
    display: 'flex',
    width: '80%'
  },
  search: {
    position: 'relative',
    width: '80%',
    margin: 0,
    border: 'solid 1px',
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.grey.main
  },
  boxSelect: {
    width: '80%'
  },
  contentChip: {
    border: 'solid 1px',
    borderColor: theme.palette.grey.main,
    padding: 10,
    width: 'calc(100% - 20px)',
    display: 'flex',
    justifyContent: 'start',
    flexWrap: 'wrap',
    minHeight: 42,
    borderRadius: 4,
    '& span': {
      color: '#fff'
    },
    '& > *': {
      margin: theme.spacing(0.5)
    }
  },
  errorChipData: {
    borderColor: theme.palette.pink.main
  },
  containerTable: {
    width: '80%',
    marginBottom: 20
  },
  txtError: {
    margin: '5px 0 0',
    color: theme.palette.pink.main,
    fontSize: 10
  },
  table: {
    '& tr': {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#f3f3f3'
      }
    },
    '& td': {
      padding: '8px 24px 8px 16px'
    }
  },
  headTable: {
    backgroundColor: theme.palette.primary.main,
    '& tr': {
      '&:hover': {
        backgroundColor: theme.palette.primary.main
      }
    },
    '& th': {
      color: '#fff'
    }
  },
  btnOpen: {
    marginLeft: 20,
    minWidth: 200,
    fontSize: '1rem'
  },
  rowSubmit: {
    ...rowSubmit
  },
  btnCance: {
    ...btnCance
  },
  boxLoading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255, 0.3)',
    zIndex: 99999
  },
  iconProgress: {
    color: theme.palette.grey.light,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  msgError: {
    color: theme.palette.pink.main,
    paddingRight: 50,
    paddingTop: 15
  },
  msgSuc: {
    color: theme.palette.green.main,
    paddingRight: 50,
    paddingTop: 15
  }
}));
