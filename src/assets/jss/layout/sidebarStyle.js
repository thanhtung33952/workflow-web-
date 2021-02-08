import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth } from 'assets/common';

export default makeStyles(theme => ({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    maxWidth: drawerWidth,
    height: '100%',
    zIndex: theme.zIndex.drawer + 99,
    backgroundColor: theme.palette.grey.main
  },
  modal: {
    [theme.breakpoints.down('sm')]: {
      top: '56px!important'
    },
    [theme.breakpoints.up('sm')]: {
      top: '64px!important'
    },
    zIndex: '1000!important'
  },
  backdrop: {
    [theme.breakpoints.down('sm')]: {
      top: '56px'
    },
    [theme.breakpoints.up('sm')]: {
      top: '64px'
    }
  },
  tabs: {
    backgroundColor: theme.palette.grayBlue.main
  },
  indicator: {
    display: 'none'
  },
  tab: {
    minWidth: 'auto',
    flex: 1,
    color: '#fff',
    fontSize: '1.1rem',
    paddingLeft: 0,
    paddingRight: 0
  },
  tabSelected: {
    backgroundColor: theme.palette.grey.main
  },
  iconMenu: {
    border: 'solid 1px',
    borderColor: '#fff',
    width: 'max-content',
    borderRadius: '50%',
    padding: 3,
    position: 'absolute',
    bottom: 4,
    right: 2,
    '& svg': {
      width: 15,
      height: 15,
      color: '#fff'
    }
  },
  tabHidden: {
    color: '#fff',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    '& span': {
      lineHeight: '16px',
      margin: 0,
      padding: '15px 10px'
    },
    '& span:first-child': {
      backgroundColor: theme.palette.grey.light
    },
    '& span:last-child': {
      backgroundColor: theme.palette.primary.main
    }
  }
}));
