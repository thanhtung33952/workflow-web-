import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as moment from 'moment';
//component material
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
  ButtonGroup,
  Button,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
// icons
import SettingIcon from '@material-ui/icons/Settings';
import ListEditIcon from '@material-ui/icons/ListAlt';

// constant
import { apiRoot } from 'constant/index.js';

// component common
import Wrapper from 'components/Wrapper/Wrapper';
// helpers
import { isNullOrEmpty, isNullOrUndefined } from 'utils/helpers';
//component customer
import SearchInput from 'components/SearchForm/SearchInput';

// jss
import useStyles from 'assets/jss/pages/RequestFlow/CreateRequestFlow';
import { folderRoot } from 'constant';

export default function CreateRequestFlow() {
  const classes = useStyles();
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState([]);

  const [statusSubmit, setStatusSubmit] = useState({
    status: 0, // -1: error, 1: success
    isLoading: false,
    msg: ''
  });
  useEffect(() => {
    async function getData() {
      // show loading
      setisLoading(true);

      // call api get data
      const result = await getUsers();

      // hide loading
      setisLoading(false);

      // faild
      if (!result) return;

      // success
      setData(result.data);
    }

    getData();
  }, []);

  // render user not group
  const requests = ['フォーム名：', 'フロー名：'];
  let requestRender = [];
  requests.length > 0 &&
    requests.map((row, i) => {
      requestRender.push(
        <dl key={i}>
          <dt>{row}</dt>
          <dt>
            <Button variant="contained" className={classes.btnEdit}>
              聞く
            </Button>
            <Button variant="contained" className={classes.btnDelete}>
              削除
            </Button>
          </dt>
        </dl>
      );
    });

  return (
    <div className={classes.root}>
      <Wrapper>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <div className={classes.btnGroup}>
              <div>
                <Button
                  variant="outlined"
                  style={{ borderRadius: '10px 0 0 10px' }}
                >
                  <SettingIcon />
                </Button>
                <span>プロセス </span>
              </div>
              <div>
                <Button
                  variant="outlined"
                  style={{
                    borderRadius: '0 10px 10px 0',
                    borderLeft: 'solid 1px #222'
                  }}
                >
                  <ListEditIcon />
                </Button>
                <span>プロパティ </span>
              </div>
            </div>
          </Grid>
          <Grid item xs={7}>
            <div className={classes.formCreate}>
              <label>新規作成名：</label>
              <TextField
                value={''}
                variant="outlined"
                className={classes.inputControl}
                InputProps={{
                  classes: {
                    root: classes.rootInput,
                    input: classes.thisInput,
                    error: classes.thisInputError
                  }
                }}
              />
            </div>
            <label>作成日：</label>
          </Grid>
          <Grid item xs={3}>
            <div className={classes.btnGroupAction}>
              <Button variant="contained" className={classes.btnEdit}>
                保存
              </Button>
              <Button variant="contained" className={classes.btnDelete}>
                キャンセル
              </Button>
            </div>
          </Grid>
        </Grid>
        {/* content form */}
        <Grid container spacing={1} style={{ height: '100%' }}>
          <Grid item xs={9}>
            <div className={classes.listRequest}>{requestRender}</div>
          </Grid>
          <Grid item xs={3}>
            <div className={classes.sidebar}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={true} color="primary" />}
                  label="申請フォーム一覧に表示："
                  labelPlacement="start"
                  classes={{
                    root: classes.formControlRoot,
                    label: classes.labelCheck
                  }}
                />
                <FormControlLabel
                  control={<Checkbox checked={false} color="primary" />}
                  label="紐付："
                  labelPlacement="start"
                  classes={{
                    root: classes.formControlRoot,
                    label: classes.labelCheck
                  }}
                />
              </FormGroup>
              <div className={classes.formInput}>
                <label>申請コード：</label>
                <TextField
                  value={''}
                  variant="outlined"
                  className={classes.inputControl}
                  InputProps={{
                    classes: {
                      root: classes.rootInput,
                      input: classes.thisInput,
                      error: classes.thisInputError
                    }
                  }}
                />
              </div>
              <div className={classes.formInput}>
                <label>申請コード：</label>
                <TextField
                  value={''}
                  variant="outlined"
                  className={classes.inputControl}
                  InputProps={{
                    classes: {
                      root: classes.rootInput,
                      input: classes.thisInput,
                      error: classes.thisInputError
                    }
                  }}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </Wrapper>
    </div>
  );
}

//  get Users
async function getUsers() {
  try {
    const res = await axios.get(`${apiRoot}/users`);
    // error
    if (res.status !== 200) {
      return null;
    }
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
