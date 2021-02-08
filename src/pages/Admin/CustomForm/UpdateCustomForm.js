import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setDefaultData } from 'actions';
import { isNullOrUndefined } from 'utils/helpers';
import { folderRoot } from 'constant';

// material component
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
    justifyContent: 'center',
    zIndex: 9
  }
}));

function UpdateCustomForm(props) {
  // get id seismic
  const { formID } = useParams();
  const classes = useStyles();
  const { dispatch, rowItems } = props;

  const [nameForm, setNameForm] = useState('');
  const [submit, setSubmit] = useState({
    isLoading: false,
    isOpenMsg: false,
    msg: '',
    status: 0 // 0: normal, 1: ok , -1: error, -2: not found id form, -3: Oop
  });
  useEffect(() => {
    if (isNullOrUndefined(formID)) {
      window.location.href = `${folderRoot}404`;
    }

    // get data
    async function getData(id) {
      setSubmit({ ...submit, isLoading: true });
      try {
        const res = await axios.get(`${apiRoot}/forms/${id}`);
        // failed Oop
        if (res.status !== 200) {
          setSubmit({ ...submit, isLoading: false, status: -3 });
          return;
        }

        // not found data by id form
        if (res.data.code !== 1) {
          setSubmit({ ...submit, isLoading: false, status: -2 });
        }

        // success
        let rowItems = res.data.data.content;
        dispatch(setDefaultData(JSON.parse(rowItems)));
        setSubmit({ ...submit, isLoading: false, status: 1 });
        setNameForm(res.data.data.title);
      } catch (error) {
        setSubmit({ ...submit, isLoading: false, status: -3 });
      }
    }
    getData(formID);
  }, []);

  const handChangeNameForm = e => {
    setNameForm(e.target.value);
  };

  // save form
  const handleSave = async () => {
    if (isNullOrUndefined(formID)) return;

    setSubmit({ ...submit, isLoading: true });
    const data = {
      title: nameForm,
      content: JSON.stringify(rowItems)
    };
    // console.log('Update Form: ', data);

    try {
      const res = await axios.put(`${apiRoot}/forms/${formID}`, data);

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

      // success
      setSubmit({
        ...submit,
        isLoading: false,
        status: 1,
        isOpenMsg: true,
        msg: 'Success'
      });
    } catch (error) {
      setSubmit({
        ...submit,
        isLoading: false,
        status: -3,
        isOpenMsg: true,
        msg: 'Oop'
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
            value={nameForm}
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
UpdateCustomForm.propTypes = {
  rowItems: PropTypes.array,
  dispatch: PropTypes.any
};

// map state redux to component props
const mapStateToProps = state => ({
  rowItems: state.customform.rowItems
});

// connet redux with component
export default connect(mapStateToProps)(UpdateCustomForm);
