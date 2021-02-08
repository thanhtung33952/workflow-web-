import React, { useState, forwardRef } from 'react';

// nodejs library to set properties for components
import PropTypes from 'prop-types';

// @material-ui
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// @material-ui icons
import DeleteIcon from '@material-ui/icons/Delete';

// redux
import { connect } from 'react-redux';
import { toggleModalElement, addElement } from 'actions';

// jss
const useStyles = makeStyles(() => ({
  dialogContentRoot: {
    minHeight: 170
  },
  btnEl: {
    boxShadow:
      'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px',
    borderRadius: 0
  },
  btnCane: {
    backgroundColor: '#D5DF49',
    margin: 20,
    marginTop: 0,
    color: '#000',
    paddingLeft: 15,
    paddingRight: 15,
    '&:hover': {
      backgroundColor: '#b4bd34'
    }
  }
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ModalProps(props) {
  const { dispatch, isModalElementOpen, selectedItem } = props;
  const classes = useStyles();
  const elementControls = [
    { type: 'CTRL_LABEL', val: 'Label', icon: <DeleteIcon /> },
    { type: 'CTRL_TEXT', val: 'Textbox', icon: <DeleteIcon /> },
    { type: 'CTRL_TEXTAREA', val: 'TextArea', icon: <DeleteIcon /> },
    { type: 'CTRL_RADIO', val: 'Radio', icon: <DeleteIcon /> },
    { type: 'CTRL_CHECKBOX', val: 'Checkbox', icon: <DeleteIcon /> },
    { type: 'CTRL_SELECT', val: 'Select', icon: <DeleteIcon /> },
    { type: 'CTRL_LINE', val: 'Line', icon: <DeleteIcon /> }
    // { type: 'CTRL_EMAIL', val: 'Email', icon: <DeleteIcon /> },
    // { type: 'CTRL_NUMBER', val: 'Number', icon: <DeleteIcon /> },
    // { type: 'CTRL_PHONE', val: 'Phone', icon: <DeleteIcon /> },
    // { type: 'CTRL_DATE', val: 'Date', icon: <DeleteIcon /> }
  ];

  const handleClose = () => {
    dispatch(toggleModalElement());
  };

  const handleSelectElement = ctrType => () => {
    dispatch(addElement(selectedItem.rowID, selectedItem.colID, ctrType));
  };

  return (
    <Dialog
      open={isModalElementOpen}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="sm"
      fullWidth={true}
      onClose={handleClose}
      aria-labelledby="modal-element-title"
    >
      <DialogTitle id="modal-element-title">レイアウト作成</DialogTitle>
      <DialogContent classes={{ root: classes.dialogContentRoot }}>
        <Grid container spacing={3}>
          {elementControls.map(ctrl => {
            return (
              <Grid item xs={4} key={ctrl.type}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth={true}
                  onClick={handleSelectElement(ctrl.type)}
                  className={classes.btnEl}
                  // startIcon={ctrl.icon}
                >
                  {ctrl.val}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="primary"
          className={classes.btnCane}
        >
          キャンセル
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ModalProps.propTypes = {
  dispatch: PropTypes.func,
  isModalElementOpen: PropTypes.bool,
  selectedItem: PropTypes.object
};

// map state redux to component props
const mapStateToProps = state => ({
  isModalElementOpen: state.customform.isModalElementOpen,
  selectedItem: state.customform.selectedItem
});

export default connect(mapStateToProps)(ModalProps);
