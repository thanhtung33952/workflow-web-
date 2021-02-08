import update from 'immutability-helper';
import { isNullOrUndefined } from 'utils/helpers';

const defaultState = {
  selectedItem: null,
  selectedControl: null,
  rowItems: [], // { cols: [ elements: {} ] }
  isModalElementOpen: false
};

const customform = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_ROW':
      return {
        ...state,
        rowItems: [
          ...state.rowItems,
          {
            id: action.id,
            type: action.rowType,
            cols: createCols(action.rowType),
            isSelected: false
          }
        ]
      };

    case 'DELETE_ROW':
      return {
        ...state,
        selectedItem: null,
        rowItems: state.rowItems.filter(item => item.id !== action.id)
      };

    case 'MOVE_ROW':
      return {
        ...state,
        rowItems: update(state.rowItems, {
          $splice: [
            [action.dragIndex, 1],
            [action.hoverIndex, 0, state.rowItems[action.dragIndex]]
          ]
        })
      };

    case 'SELECT_SINGLE_ROW':
      return funcSelectRow(state, action.rowID, action.colID);

    case 'SELECT_CONTROL':
      return funcSelectControl(
        state,
        action.rowID,
        action.colID,
        action.elementID
      );

    case 'UPDATE_CONTROL':
      return funcUpdateControl(
        state,
        action.rowID,
        action.colID,
        action.newControl
      );

    case 'CLEAR_SELECTED':
      if (isNullOrUndefined(state.selectedItem)) {
        return state;
      }

      return {
        ...state,
        selectedItem: null,
        rowItems: state.rowItems.map(row => {
          return { ...row, isSelected: false };
        })
      };

    case 'UPDATE_ROWITEM_TYPE':
      return {
        ...state,
        selectedItem:
          !isNullOrUndefined(state.selectedItem) &&
          state.selectedItem.type === 'ROWITEM' &&
          state.selectedItem.obj.id === action.rowID
            ? {
                ...state.selectedItem,
                obj: {
                  ...state.selectedItem.obj,
                  type: action.newType
                }
              }
            : state.selectedItem,
        rowItems: state.rowItems.map(row =>
          row.id === action.rowID
            ? {
                ...row,
                type: action.newType,
                cols: createCols(action.newType, row.elements)
              }
            : row
        )
      };

    case 'TOGGLE_MODAL_ELEMENT':
      return funcToggleModalElement(state, action.rowID, action.colID);

    case 'ADD_ELEMENT':
      return funcAddElement(
        state,
        action.rowID,
        action.colID,
        action.elementID,
        action.ctrlType
      );

    case 'DELETE_CONTROL':
      return funcDeleteControl(
        state,
        action.rowID,
        action.colID,
        action.elementID
      );

    // set default data (mode update form)
    case 'SET_DEFAULT_ROWITEM':
      return funcSetDefaultRowitem(state, action.data);

    default:
      return state;
  }
};

const funcSelectRow = (state, rowID, colID) => {
  return {
    ...state,
    selectedItem: getSelectedItem(rowID, colID, null, state.rowItems),
    rowItems: state.rowItems.map(row =>
      row.id === rowID
        ? { ...row, isSelected: true }
        : { ...row, isSelected: false }
    )
  };
};

const funcSelectControl = (state, rowID, colID, elementID) => {
  return {
    ...state,
    selectedItem: getSelectedItem(rowID, colID, elementID, state.rowItems)
    // rowItems: state.rowItems.map(row =>
    //   row.id === rowID
    //     ? {
    //         ...row,
    //         cols: row.cols.map(col =>
    //           col.id === colID
    //             ? {
    //                 ...col,
    //                 elements: col.elements.map(el =>
    //                   el.id === elementID
    //                     ? { ...el, isSelected: true }
    //                     : { ...el, isSelected: false }
    //                 )
    //               }
    //             : col
    //         )
    //       }
    //     : row
    // )
  };
};

const funcUpdateControl = (state, rowID, colID, newControl) => {
  // console.log('Update control: ', rowID, colID, newControl);
  return {
    ...state,
    rowItems: state.rowItems.map(row =>
      row.id === rowID
        ? {
            ...row,
            cols: row.cols.map(col =>
              col.id === colID
                ? {
                    ...col,
                    elements: col.elements.map(el =>
                      el.id === newControl.id ? newControl : el
                    )
                  }
                : col
            )
          }
        : row
    )
  };
};

const funcToggleModalElement = (state, rowID, colID) => {
  // close modal
  if (state.isModalElementOpen) {
    return {
      ...state,
      selectedItem: null,
      isModalElementOpen: false
    };
  }
  // open modal
  // console.log('open modal and set colID');
  return {
    ...funcSelectRow(state, rowID, colID),
    isModalElementOpen: true
  };
};

const funcAddElement = (state, rowID, colID, ctrlType) => {
  return {
    ...state,
    isModalElementOpen: false,
    // selectedItem: TODO
    rowItems: state.rowItems.map(row =>
      row.id === rowID
        ? {
            ...row,
            cols: row.cols.map(col =>
              col.id === colID
                ? {
                    ...col,
                    elements: createElements(col.elements, ctrlType)
                  }
                : col
            )
          }
        : row
    )
  };
};

// delete element
const funcDeleteControl = (state, rowID, colID, elementID) => {
  return {
    ...state,
    selectedItem:
      !isNullOrUndefined(state.selectedItem) &&
      state.selectedItem.type === 'ELEMENT' &&
      state.selectedItem.rowID === rowID &&
      state.selectedItem.colID === colID &&
      state.selectedItem.obj.id === elementID
        ? null
        : state.selectedItem,
    rowItems: state.rowItems.map(row =>
      row.id === rowID
        ? {
            ...row,
            cols: row.cols.map(col =>
              col.id === colID
                ? {
                    ...col,
                    elements: deleteElement(col.elements, elementID)
                  }
                : col
            )
          }
        : row
    )
  };
};

// get item selected
const getSelectedItem = (rowID, colID, elementID, stateData) => {
  // get row item
  if (isNullOrUndefined(elementID)) {
    // console.log('select row ID: ', rowID);
    return {
      type: 'ROWITEM',
      rowID: rowID,
      colID: colID,
      obj: stateData.find(item => item.id === rowID)
    };
  }

  // get element item
  let elementOBJ;
  stateData.map(row => {
    if (row.id === rowID) {
      row.cols.map(col => {
        if (col.id === colID) {
          col.elements.map(el => {
            if (el.id === elementID) {
              elementOBJ = el;
            }
          });
        }
      });
    }
  });
  // console.log('select element', elementOBJ);
  return {
    type: 'ELEMENT',
    rowID: rowID,
    colID: colID,
    obj: elementOBJ
  };
};

const createCols = (rowType, elements) => {
  switch (rowType) {
    case '1_1':
      if (isNullOrUndefined(elements) || elements.length === 0) {
        return [{ id: 1 }];
      }

      return [{ ...elements[0], id: 1 }];

    // case 2 col
    case '1_2':
    case '2_3__1_3':
    case '1_3__2_3':
    case '1_4__3_4':
    case '3_4__1_4':
    case '1_5__4_5':
    case '4_5__1_5':
    case '3_5__2_5':
    case '2_5__3_5':
      if (isNullOrUndefined(elements) || elements.length === 0) {
        return [{ id: 1 }, { id: 2 }];
      }

      if (elements.length === 1) {
        return [{ ...elements[0], id: 1 }, { id: 2 }];
      }

      return [
        { ...elements[0], id: 1 },
        { ...elements[1], id: 2 }
      ];

    // case 3 col
    case '1_3':
    case '1_2__1_4__1_4':
    case '1_4__1_4__1_2':
    case '1_4__1_2__1_4':
    case '1_5__1_5__3_5':
    case '1_5__3_5__1_5':
    case '1_6__2_3__1_6':
      if (isNullOrUndefined(elements) || elements.length === 0) {
        return [{ id: 1 }, { id: 2 }, { id: 3 }];
      }

      if (elements.length === 1) {
        return [{ ...elements[0], id: 1 }, { id: 2 }, { id: 3 }];
      }

      if (elements.length === 2) {
        return [
          { ...elements[0], id: 1 },
          { ...elements[1], id: 2 },
          { id: 3 }
        ];
      }

      return [
        { ...elements[0], id: 1 },
        { ...elements[1], id: 2 },
        { ...elements[2], id: 3 }
      ];

    // case 4 col
    case '1_4':
    case '1_2__1_6__1_6__1_6':
    case '1_6__1_6__1_6__1_2':
      if (isNullOrUndefined(elements) || elements.length === 0) {
        return [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
      }

      if (elements.length === 1) {
        return [{ ...elements[0], id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
      }

      if (elements.length === 2) {
        return [
          { ...elements[0], id: 1 },
          { ...elements[1], id: 2 },
          { id: 3 },
          { id: 4 }
        ];
      }

      if (elements.length === 3) {
        return [
          { ...elements[0], id: 1 },
          { ...elements[1], id: 2 },
          { ...elements[2], id: 3 },
          { id: 4 }
        ];
      }

      return [
        { ...elements[0], id: 1 },
        { ...elements[1], id: 2 },
        { ...elements[2], id: 3 },
        { ...elements[3], id: 4 }
      ];

    default:
      break;
  }
};

const createElements = (elements, elementType) => {
  let obj;
  switch (elementType) {
    case 'CTRL_LABEL':
      obj = {
        type: elementType,
        content: 'Label',
        fontSize: '',
        fontStyle: '',
        color: '',
        align: '',
        width: ''
      };
      break;
    case 'CTRL_TEXT':
      obj = {
        type: elementType,
        value: '',
        width: '',
        valueType: 'text',
        align: ''
      };
      break;
    case 'CTRL_TEXTAREA':
      obj = {
        type: elementType,
        value: '',
        width: '',
        height: '',
        align: '',
        required: false
      };
      break;
    case 'CTRL_RADIO':
      obj = {
        type: elementType,
        display: '', // horizontal or vertical
        width: '',
        align: '',
        options: [],
        default: '',
        required: false
      };
      break;

    case 'CTRL_CHECKBOX':
      obj = {
        type: elementType,
        display: '', // horizontal or vertical
        width: '',
        align: '',
        options: [],
        required: false
      };
      break;

    case 'CTRL_SELECT':
      obj = {
        type: elementType,
        width: '',
        align: '',
        options: [],
        required: false
      };
      break;

    case 'CTRL_LINE':
      obj = { type: elementType };
      break;

    default:
      obj = { type: elementType };
      break;
  }

  if (isNullOrUndefined(elements)) {
    return [{ ...obj, id: 1 }];
  }

  return [...elements, { ...obj, id: elements.length + 1 }];
};

const deleteElement = (elements, elementIdDelete) => {
  if (isNullOrUndefined(elementIdDelete)) return;

  return elements.filter(item => item.id !== elementIdDelete);
};

const funcSetDefaultRowitem = (state, rowItems) => {
  console.log(rowItems);
  return {
    ...state,
    rowItems: rowItems
  };
};
export default customform;
