import { fade, makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    // '& .MuiBackdrop-root': {
    //   backgroundColor: 'inherit !mportant'
    // }
  },
  titleTool: {
    fontWeight: 600,
    margin: '10px 0 0 40px',
    fontSize: 18
  },
  contentForm: {
    height: '100%',
    padding: 10,
    marginTop: 5
  },
  table: {
    minWidth: 650,
    '& .MuiBackdrop-root': {
      top: '100%'
    },
    '& .MuiTableCell-alignCenter': {
      paddingTop: 0,
      paddingBottom: 0
    }
  },
  headTable: {
    textAlign: 'center',
    '& .MuiTableCell-head': {
      backgroundColor: '#4A4E69',
      color: '#fff',
      lineHeight: '0.5rem',
      fontSize: '1rem',
      fontWeight: 600,
      borderRight: 0,
      paddingTop: 15,
      paddingBottom: 15
    }
  },
  container: {
    height: 'calc(100vh - 225px)'
  },
  btnEdit: {
    height: 42,
    borderRadius: '50%',
    minWidth: 0,
    minHeight: 0,
    maxHeight: 42,
    maxWidth: 42,
    textTransform: 'none',
    color: '#fff',
    marginRight: 10,
    backgroundColor: '#ffc107',
    '&:hover': {
      backgroundColor: '#ffa000'
    }
  },
  btnDelete: {
    marginRight: 10,
    height: 42,
    borderRadius: '50%',
    minWidth: 0,
    minHeight: 0,
    maxHeight: 42,
    maxWidth: 42,
    color: '#fff',
    backgroundColor: '#f44336',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#d32f2f'
    }
  },
  btnAdd: {
    color: '#fff',
    margin: '0 40px 10px 0',
    float: 'right',
    fontWeight: 600,
    backgroundColor: '#4ca4fb',
    fontSize: 14,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#4ca4fb'
    }
  },
  btnUser: {
    borderRadius: 4,
    width: '100%',
    backgroundColor: '#357a38',
    textTransform: 'none',
    color: '#fff',
    '& .MuiSvgIcon-root': {
      fontSize: '1.3rem'
    }
  },
  search: {
    border: '1px solid gray',
    position: 'relative',
    borderRadius: 10,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: 40,
    marginLeft: 40,
    marginTop: 60
  },
  searchIcon: {
    padding: '0 5px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    display: 'flex'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%'
  },
  underline: {
    textDecoration: 'underline'
  },
  iconProgress: {
    color: 'gray',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}));
