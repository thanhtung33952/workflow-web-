import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  appBar: {
    boxShadow: '0 1px 2px rgba(0,0,0,.3)',
    position: 'relative',
    background: '#fff',
    zIndex: theme.zIndex.drawer + 100,
    [theme.breakpoints.down('sm')]: {
      position: 'fixed'
    }
  },
  toolBar: {
    paddingLeft: theme.spacing(1) / 2,
    paddingRight: theme.spacing(1) / 2
  },
  iconMenu: {
    color: theme.palette.primary.main
  },
  logo: {
    flexGrow: 1,
    overflow: 'hidden',
    margin: 'auto 0',
    marginLeft: 5,
    padding: 0,
    width: 'auto',
    display: 'flex',
    justifyContent: 'flex-start',
    color: theme.palette.primary.main,
    alignItems: 'flex-end',
    '& img': {
      margin: 'auto',
      marginRight: 10,
      [theme.breakpoints.up('sm')]: {
        maxWidth: '160px'
      },
      [theme.breakpoints.down('sm')]: {
        maxWidth: '120px'
      }
    },
    '& span': {
      fontSize: '0.8rem',
      flex: '1 1 auto',
      [theme.breakpoints.down('md')]: {
        fontSize: '0.6rem'
      }
    }
  },
  account: {
    width: 'auto',
    color: theme.palette.grey.dark,
    cursor: 'pointer',
    paddingTop: 0,
    paddingBottom: 0
  },
  avatar: {
    minWidth: 'auto',
    marginRight: 5,
    [theme.breakpoints.down('md')]: {
      marginRight: 0
    }
  },
  menuOption: {
    '& ul': {
      padding: 0,
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      '& li': {
        paddingLeft: 20,
        paddingRight: 20
      },
      '& li span': {
        fontSize: '0.8rem'
      }
    }
  }
}));
