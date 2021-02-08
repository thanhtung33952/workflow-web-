export const addRow = (id, rowType) => ({
  type: 'ADD_ROW',
  id: id,
  rowType
});

export const deleteRowItem = id => ({
  type: 'DELETE_ROW',
  id: id
});

export const moveRow = (dragIndex, hoverIndex) => ({
  type: 'MOVE_ROW',
  dragIndex,
  hoverIndex
});

export const seleteSingleRow = (rowID, colID, elementID) => ({
  type: 'SELECT_SINGLE_ROW',
  rowID,
  colID,
  elementID
});

export const clearSeleted = () => ({
  type: 'CLEAR_SELECTED'
});

export const updateRowItemType = (rowID, newType) => ({
  type: 'UPDATE_ROWITEM_TYPE',
  rowID,
  newType
});

export const toggleModalElement = (rowID, colID) => ({
  type: 'TOGGLE_MODAL_ELEMENT',
  rowID,
  colID
});

export const addElement = (rowID, colID, elementID, ctrlType) => ({
  type: 'ADD_ELEMENT',
  rowID,
  colID,
  elementID,
  ctrlType
});

export const selectedControl = (rowID, colID, controlID) => ({
  type: 'SELECT_CONTROL',
  rowID,
  colID,
  elementID: controlID
});

export const updateControl = (rowID, colID, newControl) => ({
  type: 'UPDATE_CONTROL',
  rowID,
  colID,
  newControl
});

export const deleteControl = (rowID, colID, controlID) => ({
  type: 'DELETE_CONTROL',
  rowID,
  colID,
  elementID: controlID
});

export const setDefaultData = data => ({
  type: 'SET_DEFAULT_ROWITEM',
  data
});
