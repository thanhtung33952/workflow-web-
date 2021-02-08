import React, { useState, useEffect } from 'react';

// nodejs library to set properties for components
import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';
import {
  deleteRowItem,
  clearSeleted,
  updateRowItemType,
  updateControl,
  deleteControl
} from 'actions';

// @material-ui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// custom components
import RowItemProp from 'components/CustomForm/Properties/RowItemProp.js';
import LabelProperties from 'components/CustomForm/ControlsProperties/LabelProperties';
import TextboxProperties from 'components/CustomForm/ControlsProperties/TextboxProperties';
import TextareaProperties from './ControlsProperties/TextareaProperties';
import RadioProperties from './ControlsProperties/RadioProperties';
import CheckboxProperties from 'components/CustomForm/ControlsProperties/CheckboxProperties';
import SelectProperties from 'components/CustomForm/ControlsProperties/SelectProperties';

// common
import { isNullOrUndefined } from 'utils/helpers';
import LineProperties from './ControlsProperties/LineProperties';

const useStyles = makeStyles(() => ({
  properties: {
    float: 'left',
    marginTop: 15,
    width: 350,
    height: 'calc(100vh - 135px)',
    padding: '5px 10px',
    boxSizing: 'border-box',
    overflow: 'auto',
    backgroundColor: '#717171'
  },
  action: {
    marginTop: 20,
    display: 'flex'
  },
  btnDelete: {},
  btnOK: {
    marginLeft: 5,
    marginRight: 5
  },
  btnCancel: {}
}));

function Properties(props) {
  const { selectedItem, dispatch } = props;
  const classes = useStyles();
  const [tmpProps, setTmpProps] = useState({});

  const renderProperties = () => {
    // Row item
    if (selectedItem.type === 'ROWITEM') {
      return (
        <RowItemProp
          callbackChangeProps={tmpProps => setTmpProps(tmpProps)}
          selectedItem={selectedItem.obj.type}
        />
      );
    }

    // Element item
    return renderDetailControl(selectedItem.obj);
  };

  const renderDetailControl = el => {
    switch (el.type) {
      case 'CTRL_LABEL':
        return (
          <LabelProperties
            data={el}
            callbackChangeProps={tmpProps => setTmpProps(tmpProps)}
          />
        );

      case 'CTRL_TEXT':
        return (
          <TextboxProperties
            data={el}
            callbackChangeProps={tmpProps => setTmpProps(tmpProps)}
          />
        );

      case 'CTRL_TEXTAREA':
        return (
          <TextareaProperties
            data={el}
            callbackChangeProps={tmpProps => setTmpProps(tmpProps)}
          />
        );

      case 'CTRL_RADIO':
        return (
          <RadioProperties
            data={el}
            callbackChangeProps={tmpProps => setTmpProps(tmpProps)}
          />
        );

      case 'CTRL_CHECKBOX':
        // todo Tung
        return (
          <CheckboxProperties
            data={el}
            callbackChangeProps={tmpProps => setTmpProps(tmpProps)}
          />
        );

      case 'CTRL_SELECT':
        // todo Tung
        return (
          <SelectProperties
            data={el}
            callbackChangeProps={tmpProps => setTmpProps(tmpProps)}
          />
        );

      case 'CTRL_LINE':
        return <LineProperties data={el} />;

      // case 'CTRL_EMAIL':
      //   return <TextboxControl type="email" title="Email" />;

      // case 'CTRL_NUMBER':
      //   return <TextboxControl type="number" title="Number" />;

      // case 'CTRL_PHONE':
      //   return <TextboxControl type="phone" title="Phone" />;

      // case 'CTRL_DATE':
      //   return <TextboxControl type="date" title="Date" />;

      default:
        return <div>NULL</div>;
    }
  };

  const handleDelete = () => {
    // delete row
    if (selectedItem.type === 'ROWITEM') {
      dispatch(deleteRowItem(selectedItem.obj.id));
    }

    // delete control
    if (selectedItem.type === 'ELEMENT') {
      dispatch(
        deleteControl(
          selectedItem.rowID,
          selectedItem.colID,
          selectedItem.obj.id
        )
      );
    }
  };

  const handleOK = () => {
    // update row
    if (selectedItem.type === 'ROWITEM') {
      dispatch(
        updateRowItemType(
          selectedItem.obj.id,
          !isNullOrUndefined(tmpProps.rowLayoutType)
            ? tmpProps.rowLayoutType
            : selectedItem.obj.type
        )
      );
    }

    // update control
    if (selectedItem.type === 'ELEMENT') {
      dispatch(updateControl(selectedItem.rowID, selectedItem.colID, tmpProps));
    }
  };

  const handleCancel = () => {
    dispatch(clearSeleted());
  };

  return (
    <div className={classes.properties}>
      {isNullOrUndefined(selectedItem) ? (
        <span>Properties</span>
      ) : (
        <React.Fragment>
          {renderProperties(selectedItem)}

          {/** Action */}
          <div className={classes.action}>
            <Button
              className={classes.btnDelete}
              variant="contained"
              color="primary"
              fullWidth={true}
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button
              className={classes.btnOK}
              variant="contained"
              color="secondary"
              fullWidth={true}
              onClick={handleOK}
            >
              OK
            </Button>
            <Button
              className={classes.btnCancel}
              variant="contained"
              color="secondary"
              fullWidth={true}
              onClick={handleCancel}
            >
              Close
            </Button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

Properties.propTypes = {
  dispatch: PropTypes.func,
  selectedItem: PropTypes.object
};

// map state redux to component props
const mapStateToProps = state => ({
  selectedItem: state.customform.selectedItem
});

export default connect(mapStateToProps)(Properties);
