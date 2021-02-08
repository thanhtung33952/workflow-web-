import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth } from 'assets/common';

export default makeStyles(() => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    top: '100px',
    width: drawerWidth,
    height: 'calc(100vh - 105px)',
    border: '1px solid #ccc'
  },
  drawerContainer: {
    overflow: 'auto'
  }
}));
