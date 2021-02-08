import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  titleTool: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18
  },
  controlList: {
    '& ul': {
      padding: 0,
      color: '#404d5b'
    },
    '& svg': {
      fontSize: 16,
      color: '#404d5b'
    }
  },
  itemControl: {
    margin: '5px 0',
    padding: '5px 10px',
    border: '1px dashed #ddd'
  },
  iconControl: {
    minWidth: 30,
    marginLeft: 10,
    marginRight: 10
  },
  txtControl: {
    color: '#404d5b',
    '& span': {
      fontSize: 15
    }
  }
}));
