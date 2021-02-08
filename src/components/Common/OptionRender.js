import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// material-ul
import { makeStyles } from '@material-ui/core/styles';
import { Button, Checkbox, TextField } from '@material-ui/core';

// icons
import DeleteIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Create';
import DoneIcon from '@material-ui/icons/Check';
import { isNullOrEmpty } from 'utils/helpers';
import { isNullOrUndefined } from 'utils/helpers';

const useStyles = makeStyles(() => ({
  root: {
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 4
  },
  blockOption: {
    display: 'block',
    border: 'solid 1px gray'
  },
  title: {
    backgroundColor: '#ABF3EF',
    color: 'gray',
    display: 'flex',
    borderBottom: 'solid 1px gray',
    '& p': {
      margin: 0,
      textAlign: 'center',
      flex: 1,
      padding: '4px 0'
    },
    '& span': {
      width: 90,
      borderLeft: 'solid 1px gray'
    }
  },
  listOption: {
    padding: 0,
    margin: 0,
    '& li': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    }
  },
  labelOption: {
    flex: 1,
    color: '#000',
    paddingLeft: 10
  },
  optionAction: {
    width: 90,
    borderLeft: 'solid 1px gray',
    display: 'flex',
    alignItems: 'center'
  },
  checkbox: {
    padding: 4
  },
  btnAdd: {
    backgroundColor: '#49DF53',
    borderRadius: 20,
    paddingTop: 4,
    paddingBottom: 4,
    fontSize: 12,
    margin: 10,
    display: 'flex'
  },
  iconEdit: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: '#a7a700',
    color: '#fff',
    padding: 3,
    boxSizing: 'border-box',
    cursor: 'pointer',
    marginRight: 5,
    '&:hover': {
      backgroundColor: '#6d6d07'
    }
  },
  iconDone: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: '#1dff2c',
    color: '#fff',
    padding: 2,
    boxSizing: 'border-box',
    marginRight: 5,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#49DF53'
    }
  },
  iconDelete: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: '#FE5576',
    color: '#fff',
    padding: 2,
    boxSizing: 'border-box',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#e61840'
    }
  },
  inputNew: {
    flex: 1,
    margin: '0 10px'
  }
}));

function OptionRender(props) {
  const inputNew = useRef();
  const checkboxNew = useRef();
  const inputEdit = useRef();
  const classes = useStyles();
  const { optionsProp, callbackChange } = props;
  const [options, setOptions] = useState([]);
  const [isNew, setAddNew] = useState(false);
  const [idEdit, setIdEdit] = useState(null);

  useEffect(() => {
    if (!isNullOrUndefined(optionsProp)) {
      setOptions(optionsProp);
    } else setOptions([]);
  }, [optionsProp]);

  const handleNewOption = () => {
    let label = inputNew.current.value;
    let checkDefault = checkboxNew.current.checked;

    let option = null;
    if (!isNullOrEmpty(options) && options.length > 0) {
      option = { id: options.length + 1, label: label, default: checkDefault };
    } else {
      option = { id: 1, label: label, default: checkDefault };
    }

    let newOptions = [...options];
    // clear mode default all list
    if (checkDefault) {
      newOptions = newOptions.map(op => {
        return { ...op, default: false };
      });
    }

    // update state
    newOptions = newOptions.concat(option);
    setOptions(newOptions);
    setAddNew(false);

    // callback prop
    callback(newOptions);
  };

  const handleUpdateOption = id => {
    let label = inputEdit.current.value;
    let newOptions = [...options];
    let itemChange = newOptions.find(op => op.id === id);
    if (isNullOrUndefined(itemChange)) return;
    itemChange.label = label;
    setOptions(newOptions);
    setIdEdit(null);

    // callback prop
    callback(newOptions);
  };

  const handleDeleteOption = id => {
    let newOptions = [...options];
    let index = newOptions.findIndex(op => op.id === id);
    if (index === -1) return;
    newOptions.splice(index, 1);
    setOptions(newOptions);

    // callback prop
    callback(newOptions);
  };

  const callback = data => {
    if (callbackChange) {
      callbackChange(data);
    }
  };

  const setDefaultOption = (id, e) => {
    if (isNullOrEmpty(options) || options.length === 0) return;
    let newOptions = [...options];
    newOptions = newOptions.map(op => {
      if (op.id === id) {
        return {
          ...op,
          default: e.target.checked
        };
      }
      return { ...op, default: false };
    });
    setOptions(newOptions);
    callback(newOptions);
  };

  return (
    <div className={classes.root}>
      <div className={classes.blockOption}>
        <div className={classes.title}>
          <p>価値</p>
          <span></span>
        </div>
        <ul className={classes.listOption}>
          {/* list option */}
          {options.map((opt, i) => {
            return !isNullOrEmpty(idEdit) && idEdit === opt.id ? (
              <li className={classes.option} key={i + 1}>
                <TextField
                  inputRef={inputEdit}
                  className={classes.inputNew}
                  autoFocus={true}
                  defaultValue={opt.label}
                />
                <div className={classes.optionAction}>
                  <Checkbox
                    className={classes.checkbox}
                    onChange={e => setDefaultOption(opt.id, e)}
                    checked={!isNullOrUndefined(opt.default) && opt.default}
                  />
                  <DoneIcon
                    className={classes.iconDone}
                    onClick={() => handleUpdateOption(opt.id)}
                  />
                  <DeleteIcon
                    className={classes.iconDelete}
                    onClick={() => setIdEdit(null)}
                  />
                </div>
              </li>
            ) : (
              <li className={classes.option} key={i + 1}>
                <span className={classes.labelOption}>
                  {i + 1}．{opt.label}
                </span>
                <div className={classes.optionAction}>
                  <Checkbox
                    className={classes.checkbox}
                    onChange={e => setDefaultOption(opt.id, e)}
                    checked={!isNullOrUndefined(opt.default) && opt.default}
                  />
                  <EditIcon
                    className={classes.iconEdit}
                    onClick={() => setIdEdit(opt.id)}
                  />
                  <DeleteIcon
                    className={classes.iconDelete}
                    onClick={() => handleDeleteOption(opt.id)}
                  />
                </div>
              </li>
            );
          })}
          {/* new option */}
          {isNew && (
            <li className={classes.option}>
              <TextField
                inputRef={inputNew}
                className={classes.inputNew}
                autoFocus={true}
              />
              <div className={classes.optionAction}>
                <Checkbox className={classes.checkbox} inputRef={checkboxNew} />
                <DoneIcon
                  className={classes.iconDone}
                  onClick={handleNewOption}
                />
                <DeleteIcon
                  className={classes.iconDelete}
                  onClick={() => setAddNew(false)}
                />
              </div>
            </li>
          )}
        </ul>
        {/* btn addnew */}
        <Button
          variant="contained"
          className={classes.btnAdd}
          onClick={() => {
            setIdEdit(null);
            setAddNew(true);
          }}
        >
          追加
        </Button>
      </div>
    </div>
  );
}

OptionRender.defaultProps = {
  optionsProp: []
};

OptionRender.propTypes = {
  callbackChange: PropTypes.func,
  optionsProp: PropTypes.array
};

export default OptionRender;
