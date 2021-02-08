import React, { useCallback, useState } from 'react';

// nodejs library to set properties for components
import PropTypes from 'prop-types';
// redux
import { connect } from 'react-redux';
import { addRow, moveRow, clearSeleted } from 'actions';

// @material-ui
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// @material-icons
import AddIcon from '@material-ui/icons/Add';

// custom components
import RowItem from 'components/CustomForm/RowItem.js';
import RowItemProp from 'components/CustomForm/Properties/RowItemProp.js';

// common
import { isNullOrEmpty } from 'utils/helpers';

const useStyles = makeStyles(() => ({
  mainboard: {
    backgroundColor: 'rgb(228, 228, 228)',
    height: 'calc(100vh - 135px)',
    width: 'calc(100% - 350px)',
    // width: '100%',
    float: 'left',
    boxSizing: 'border-box',
    marginTop: 15,
    padding: 10,
    overflow: 'auto'
  },
  addRowItem: {
    margin: 10,
    padding: '10px 0px',
    '& button': {
      width: '100%'
    }
  }
}));

function MainBoard(props) {
  const { dispatch, rowItems } = props;
  const classes = useStyles();
  const [isOpenModalRowType, setIsOpenModalRowType] = useState(false);
  const [newRowType, setNewRowType] = useState('');

  // handle move row
  const handleMoveRow = useCallback(
    (dragIndex, hoverIndex) => {
      dispatch(moveRow(dragIndex, hoverIndex));
    },
    [rowItems]
  );

  // render row item
  const renderRowItem = (row, index) => {
    return (
      <RowItem
        key={row.id}
        index={index}
        id={row.id}
        type={row.type}
        text={row.text}
        cols={row.cols}
        moveRow={handleMoveRow}
        isSelected={row.isSelected}
      />
    );
  };

  // handle move row
  const handleAddNewRow = () => {
    const id = rowItems.length == 0 ? 1 : rowItems.length + 1;
    dispatch(addRow(id, newRowType));
    handleCloseModalChooseRowType();
  };

  const handleOpenModalChooseRowType = () => {
    setIsOpenModalRowType(true);
  };

  const handleCloseModalChooseRowType = () => {
    setIsOpenModalRowType(false);
    setNewRowType('');
  };

  const handleClickMainboard = () => {
    dispatch(clearSeleted());
  };

  // output
  return (
    <div className={classes.mainboard} onClick={handleClickMainboard}>
      {/** Row list */}
      {rowItems.map((row, i) => renderRowItem(row, i))}

      {/** Button add new row */}
      <div className={classes.addRowItem}>
        <Button
          variant="outlined"
          size="large"
          color="primary"
          className={classes.margin}
          onClick={handleOpenModalChooseRowType}
        >
          <AddIcon /> Add Row
        </Button>
      </div>

      {/** Modal select row type */}
      <Dialog
        open={isOpenModalRowType}
        keepMounted
        maxWidth="sm"
        fullWidth={true}
        onClose={handleCloseModalChooseRowType}
        aria-labelledby="modal-props-row-title"
      >
        <DialogTitle id="modal-props-row-title">Select Row Type</DialogTitle>
        <DialogContent>
          <RowItemProp
            selectedItem={newRowType}
            callbackChangeProps={rowProps =>
              setNewRowType(rowProps.rowLayoutType)
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleAddNewRow}
            color="primary"
            disabled={isNullOrEmpty(newRowType) ? true : false}
          >
            OK
          </Button>
          <Button
            variant="contained"
            onClick={handleCloseModalChooseRowType}
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// properties for compoent
MainBoard.propTypes = {
  rowItems: PropTypes.array,
  dispatch: PropTypes.any
};

// map state redux to component props
const mapStateToProps = state => ({
  rowItems: state.customform.rowItems
});

// connet redux with component
export default connect(mapStateToProps)(MainBoard);
