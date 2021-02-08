import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

// material
// material component
import { InputBase } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
// icons
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';
// style
const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    width: '100%'
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.grey.main
  },
  inputRoot: {
    width: '100%',
    color: 'inherit'
  },
  inputInput: {
    padding: 10,
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%'
  },
  searchLoading: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.grey.main,
    top: 0,
    right: 0
  }
}));
function SearchInput(props) {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setLoading] = useState(false);
  const typingTimeoutRef = useRef(null);
  const { placeholder, onSubmit } = props;

  const handleChange = e => {
    const value = e.target.value;
    setSearchTerm(value);
    if (!onSubmit) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      const formValue = {
        searchTerm: value
      };
      setLoading(true);
      onSubmit(formValue, () => setLoading(false));
    }, 800);
  };
  return (
    <div className={classes.root}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder={placeholder}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        inputProps={{ 'aria-label': 'search' }}
        disabled={isLoading}
        value={searchTerm}
        onChange={handleChange}
      />
      {isLoading && (
        <div className={classes.searchLoading}>
          <CircularProgress size={20} />
        </div>
      )}
    </div>
  );
}
SearchInput.prototypes = {
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func
};

export default SearchInput;
