import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth } from 'assets/common';

export default makeStyles(theme => ({
  root: {
    color: 'red'
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
  contentForm: {
    border: 'solid 1px #ddd',
    fontFamily: "'M PLUS 1p', sans-serif",
    display: 'block',
    height: '100%',
    padding: 10,
    marginTop: 5
  },
  boxStep1: {
    textAlign: 'center',
    marginTop: 30,
    '& p': {
      fontWeight: 600
    },
    '& i': {
      fontSize: 14
    },
    '& button': {
      display: 'flex',
      margin: 'auto',
      marginTop: 20,
      borderRadius: 0,
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      fontWeight: 600,
      textTransform: 'none',
      '& svg': {
        fontSize: 18,
        marginRight: 5
      },
      '&:hover': {
        backgroundColor: theme.palette.primary.main
      }
    }
  },
  boxStep2: {
    display: 'flex',
    width: '80%',
    justifyContent: 'center',
    margin: 'auto',
    marginTop: 20
  },
  boxOption: {
    border: 'dotted 1px #aaaaaa',
    padding: '5px 2px',
    display: 'flex',
    flexDirection: 'row',
    flex: '1 auto',
    margin: 15,
    height: 60,
    cursor: 'pointer',
    '& span': {
      display: 'block',
      background: '#aaaaaa',
      flex: '1 auto',
      margin: '0 3px',
      textAlign: 'center',
      color: '#f3f3f3',
      fontSize: 14,
      lineHeight: '60px'
    },
    '&:hover': {
      borderColor: theme.palette.primary.main,
      '& span': {
        backgroundColor: theme.palette.primary.main
      }
    }
  },
  form: {
    margin: '20px 10px',
    '& h3': {
      color: 'gray',
      marginBottom: 4,
      fontSize: 14
    },
    '& $content': {
      border: 'dashed 1px #ddd',
      minHeight: 200,
      color: '#333',
      padding: 15
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  openPropety: {
    width: `calc(100% - ${drawerWidth + 40}px)`
  },
  // content: {},
  fullHeight: {
    height: '100%'
  },
  colLeft: {
    overflowY: 'auto'
  },
  colRight: {
    overflowY: 'auto'
  }
}));
