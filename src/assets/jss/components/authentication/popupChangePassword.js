import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  popupchangpass: {
    '& .MuiTypography-h6': {
      textAlign: 'center',
      fontWeight: 600
    },
    '& .MuiDialog-paperWidthSm': {
      width: 400
    }
  },
  backgroundMenu: {
    backgroundColor: '#717171',
    '&:hover': {
      backgroundColor: '#6d6d6d'
    }
  },
  title: {
    display: 'block',
    justifyContent: 'center',
    '& .MuiDialogTitle-root': {
      margin: 'auto',
      padding: '10px 24px'
    }
  },
  btnclose: {
    position: 'absolute',
    top: '3%',
    right: '3%',
    borderRadius: '50%',
    maxWidth: 50,
    minWidth: 10,
    maxHeight: 50,
    minHeight: 10,
    padding: 6,
    background: '#fff',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
      background: '#fff'
    }
  }
}));
