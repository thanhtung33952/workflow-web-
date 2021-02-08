import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isNullOrUndefined } from 'utils/helpers';
import axios from 'axios';
import { apiRoot } from 'constant';
import { folderRoot } from 'constant';

// icons
import CircularProgress from '@material-ui/core/CircularProgress';

// material
import { makeStyles } from '@material-ui/core/styles';
import RowItem from 'components/RenderForm/RowItem';

// jss
const useStyles = makeStyles(() => ({
  root: {
    position: 'relative'
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
function ShortcodeForm(props) {
  const classes = useStyles();
  const { formID } = props;
  const [layoutForm, setLayoutForm] = useState(null);
  const [submit, setSubmit] = useState({
    isLoading: false,
    msg: '',
    status: 0 // 0: normal, 1: ok , error, -2: not found id form, -3: Oop
  });

  useEffect(() => {
    if (isNullOrUndefined(formID)) return;

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
        setSubmit({ ...submit, isLoading: false, status: 1 });
        let rowItems = res.data.data.content;
        setLayoutForm(JSON.parse(rowItems));
      } catch (error) {
        setSubmit({ ...submit, isLoading: false, status: -3 });
      }
    }
    getData(formID);
  }, [formID]);

  // render row item
  const renderRowItem = row => {
    return <RowItem key={row.id} id={row.id} type={row.type} cols={row.cols} />;
  };

  console.log(layoutForm);
  return (
    <div className={classes.root}>
      {/* block cover loadding */}
      {submit.isLoading && (
        <div className={classes.blockCover}>
          <CircularProgress size={22} />
        </div>
      )}
      {/* content form */}
      {!isNullOrUndefined(layoutForm) &&
        layoutForm.map(row => renderRowItem(row))}
    </div>
  );
}

ShortcodeForm.propTypes = {
  formID: PropTypes.number
};
export default ShortcodeForm;
