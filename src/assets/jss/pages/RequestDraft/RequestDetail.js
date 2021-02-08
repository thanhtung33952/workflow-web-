import { makeStyles } from '@material-ui/core/styles';
import { rowSubmit, btnCance } from 'assets/common';
export default makeStyles(theme => ({
  root: {},
  headForm: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px 40px',
    fontSize: '1.1rem',
    '& label': {
      backgroundColor: theme.palette.yellow.main,
      color: '#fff',
      borderRadius: 7,
      padding: '4px 20px',
      margin: '0 20px 0 5px'
    },
    '& span': {
      color: theme.palette.grey.main
    }
  },
  titleForm: {
    margin: 0,
    fontSize: '1rem'
  },
  formContent: {
    padding: 40,
    position: 'relative'
  },
  steper: {
    // fontSize: '1rem'
  },
  lableStep: {
    '& span': {
      fontSize: '1rem',
      color: '#000'
    }
  },
  iconStep: {
    '& svg': {
      width: 30,
      height: 30
    },
    '& .MuiStepIcon-active': {
      color: '#00A2FF'
    }
  },
  contentStep: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px 0',
    paddingLeft: 15,
    fontSize: '1rem',
    '& *': {
      boxSizing: 'border-box'
    }
  },
  tip: {
    backgroundColor: '#00A2FF',
    position: 'relative',
    color: '#fff',
    fontSize: 14,
    padding: '0 15px',
    paddingTop: 2,
    borderRadius: 4,
    marginLeft: 20,
    '&:before': {
      content: `''`,
      borderTop: 'solid 6px transparent',
      borderBottom: 'solid 4px transparent',
      borderRight: 'solid 16px',
      borderRightColor: '#00A2FF',
      position: 'absolute',
      left: -14,
      top: 6
    }
  },
  btnCirculation: {
    width: 25,
    height: 25,
    borderRadius: '50%',
    fontSize: 9,
    border: 'solid 1px',
    borderColor: theme.palette.pink.main,
    color: theme.palette.pink.main,
    verticalAlign: 'middle',
    display: 'inline-block',
    textAlign: 'center',
    paddingTop: 5,
    marginLeft: 20
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
    backgroundColor: 'rgba(255,255,255, 0.3)',
    zIndex: 99999
  },
  iconProgress: {
    color: theme.palette.grey.light,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  msgError: {
    color: theme.palette.pink.main,
    paddingRight: 50,
    paddingTop: 15
  },
  msgSuc: {
    color: theme.palette.green.main,
    paddingRight: 50,
    paddingTop: 15
  }
}));
