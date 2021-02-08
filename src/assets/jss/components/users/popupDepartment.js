import { makeStyles } from '@material-ui/core/styles';
import { rowSubmit, btnCance } from 'assets/common';

export default makeStyles(theme => ({
  root: {},
  rowSubmit: {
    ...rowSubmit,
    marginTop: 20,
    marginBottom: 10,
    '& button': {
      minHeight: 30,
      padding: 4,
      minWidth: 90
    }
  },
  btnCance: {
    ...btnCance
  },
  btnAdd: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    minWidth: '40px !important'
  },
  title: {
    '& h2': {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '1.3rem'
    }
  },
  headTable: {
    backgroundColor: theme.palette.primary.main,
    '& th': {
      color: '#fff'
    }
  },
  btnEdit: {
    marginRight: 10,
    '& svg': {
      fontSize: 22
    }
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
    backgroundColor: 'rgba(255,255,255, 0.4)',
    zIndex: 99999
  }
}));
