import { makeStyles } from '@material-ui/core/styles';
import { btnCance } from 'assets/common';

export default makeStyles(theme => ({
  root: {
    // overflowY: 'scroll'
  },
  title: {
    borderBottom: 'solid 1px #ddd',
    padding: '6px 20px',
    textAlign: 'center',
    '& h2': {
      fontSize: 17
    }
  },
  content: {
    textAlign: 'center',
    margin: '15px 0',
    fontSize: 16,
    fontWeight: '500',
    padding: '0 30px'
  },
  rowSubmit: {
    justifyContent: 'center',
    marginBottom: 8,
    '& button': {
      minWidth: 80,
      minHeight: 32,
      padding: '0 10px',
      margin: '0 10px',
      fontSize: 15
    }
  },
  btnCance: {
    ...btnCance
  }
}));
