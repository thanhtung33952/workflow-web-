import React, { useState } from 'react';
import axios from 'axios';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

// icons
import CircularProgress from '@material-ui/core/CircularProgress';

// constant
import { apiRoot } from 'constant';

// custom component
import Mainboard from 'components/CustomForm/Mainboard.js';
import Properties from 'components/CustomForm/Properties.js';
import ModalElement from 'components/CustomForm/ModalElement.js';
import Notification from 'components/Notification';
import { folderRoot } from 'constant';

// jss
const useStyles = makeStyles(() => ({
  root: {},
  header: {
    display: 'flex'
  },
  txtName: {
    flexGrow: 1,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 150
  },
  action: {
    marginTop: 10,
    '& button': {
      marginLeft: 5,
      marginRight: 5
    }
  },
  blockCover: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, 0.3)',
    top: 0,
    right: 0,
    cursor: 'no-drop',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

function AddCustomForm(props) {
  const classes = useStyles();
  const { rowItems } = props;

  const [nameForm, setNameForm] = useState('');
  const [submit, setSubmit] = useState({
    isLoading: false,
    isOpenMsg: false,
    msg: '',
    status: 0 // 0: normal, 1: ok , -1: error
  });

  const handChangeNameForm = e => {
    setNameForm(e.target.value);
  };
  // save form
  const handleSave = async () => {
    setSubmit({ ...submit, isLoading: true });
    const data = {
      title: nameForm,
      content: JSON.stringify(rowItems)
    };
    try {
      const res = await axios.post(`${apiRoot}/forms`, data);

      // error
      if (!res.data || res.status !== 200) {
        setSubmit({
          ...submit,
          isLoading: false,
          status: -1,
          isOpenMsg: true,
          msg: 'Error'
        });
        return;
      }

      // success -> redirect to page update form
      window.location.href = `${folderRoot}admin/customform/updateform/${res.data.data.id}`;
    } catch (error) {
      setSubmit({
        ...submit,
        isLoading: false,
        status: -1,
        isOpenMsg: true,
        msg: 'Error'
      });
    }
  };

  const closeNotification = () => {
    setSubmit({ ...submit, isOpenMsg: false, msg: '' });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={classes.root}>
        {/** Header */}
        <div className={classes.header}>
          <TextField
            margin="dense"
            id="outlined-basic"
            label="フォーム名"
            variant="outlined"
            val={nameForm}
            className={classes.txtName}
            onChange={handChangeNameForm}
          />
          <div className={classes.action}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              保存
            </Button>
            <Button variant="contained" color="secondary">
              キャンセル
            </Button>
          </div>
        </div>

        {/** Mainboard */}
        <Mainboard />

        {/** Properties */}
        <Properties />

        {/** Modal Elements */}
        <ModalElement />
      </div>

      {/* block cover loading */}
      {submit.isLoading && (
        <div className={classes.blockCover}>
          <CircularProgress size={30} />
        </div>
      )}

      {/* Notification event */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={submit.isOpenMsg}
        autoHideDuration={6000}
        onClose={closeNotification}
      >
        <Notification
          onClose={closeNotification}
          variant={submit.status !== 1 ? 'error' : 'success'}
          message={submit.msg}
        />
      </Snackbar>
    </DndProvider>
  );
}

// properties for compoent
AddCustomForm.propTypes = {
  rowItems: PropTypes.array
};

// map state redux to component props
const mapStateToProps = state => ({
  rowItems: state.customform.rowItems
});

// connet redux with component
export default connect(mapStateToProps)(AddCustomForm);
