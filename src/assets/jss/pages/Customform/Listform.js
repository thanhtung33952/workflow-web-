import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  titleTool: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18
  },
  contentForm: {
    height: '100%',
    padding: 10,
    marginTop: 5
  },
  table: {
    minWidth: 650
  },
  headTable: {
    backgroundColor: '#f3f3f3'
  },
  btnEdit: {
    backgroundColor: '#ffc107',
    padding: 2,
    fontSize: 14,
    textTransform: 'none',
    color: '#382a03',
    minWidth: 50,
    marginRight: 10,
    '&:hover': {
      backgroundColor: '#ffa000'
    }
  },
  btnDelete: {
    backgroundColor: '#f44336',
    padding: 2,
    fontSize: 14,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#d32f2f'
    }
  }
}));
