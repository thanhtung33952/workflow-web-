import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as moment from 'moment';
//component material
import {
  Paper,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  FormControl
} from '@material-ui/core';

// constant
import { apiRoot } from 'constant/index.js';

// component common
import Wrapper from 'components/Wrapper/Wrapper';
// helpers
import { isNullOrEmpty, isNullOrUndefined } from 'utils/helpers';

// icons
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
// jss
import useStyles from 'assets/jss/pages/Report/Draft';
import { folderRoot } from 'constant';

const defaultHeader = [
  { isNew: false, name: 'No.' },
  { isNew: false, name: '申請番号' }
];
const defaultRows = [
  { id: 1, data: [1, 'ABC-000001'] },
  { id: 2, data: [2, 'ABC-000002'] },
  { id: 3, data: [3, 'ABC-000003'] }
];
export default function Draft() {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const [headerTable, setHeaderTable] = useState(defaultHeader);
  const [rowsTable, setRowsTable] = useState(defaultRows);

  useEffect(() => {}, []);

  const addNewColumn = () => {
    setHeaderTable([...headerTable, { isNew: true, name: '' }]);

    let newRows = [...rowsTable];
    setRowsTable(
      newRows.map(row => true && { ...row, data: [...row.data, ''] })
    );
  };

  return (
    <div className={classes.root}>
      <Wrapper>
        <div className={classes.formFirst}>
          <div className={classes.row}>
            <div className={classes.formCreate}>
              <label>フィルタ名：</label>
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
            <div className={classes.btnGroupAction}>
              <Button variant="contained" className={classes.btnEdit}>
                保存
              </Button>
              <Button variant="contained" className={classes.btnDelete}>
                キャンセル
              </Button>
            </div>
          </div>
          <div className={classes.row2}>
            {/* col 1 */}
            <div className={classes.col}>
              <div className={classes.inputGroup}>
                <label>検索する前後期間：</label>
                <div className={classes.twoInput}>
                  <TextField
                    value={''}
                    placeholder="開始日"
                    variant="outlined"
                    className={classes.inputControl}
                    InputProps={{
                      classes: {
                        root: classes.rootInput1,
                        input: classes.thisInput,
                        error: classes.thisInputError
                      }
                    }}
                  />
                  <TextField
                    value={''}
                    placeholder="終了日"
                    variant="outlined"
                    className={classes.inputControl}
                    InputProps={{
                      classes: {
                        root: classes.rootInput2,
                        input: classes.thisInput,
                        error: classes.thisInputError
                      }
                    }}
                  />
                </div>
              </div>
              <div className={classes.inputGroup}>
                <label>分類：</label>
                <FormControl
                  variant="outlined"
                  className={classes.selectControl}
                >
                  <Select native value={''}>
                    <option aria-label="None" value=""></option>
                  </Select>
                </FormControl>
              </div>
              <div className={classes.inputGroup}>
                <label>分署：</label>
                <FormControl
                  variant="outlined"
                  className={classes.selectControl}
                >
                  <Select native value={''}>
                    <option aria-label="None" value=""></option>
                  </Select>
                </FormControl>
              </div>
            </div>
            {/* col 2 */}
            <div className={classes.col}>
              <div className={classes.inputGroup}>
                <label>作成者：</label>
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
              <div className={classes.inputGroup}>
                <label>状況：</label>
                <FormControl
                  variant="outlined"
                  className={classes.selectControl}
                >
                  <Select native value={''}>
                    <option aria-label="None" value=""></option>
                  </Select>
                </FormControl>
              </div>
              <div className={classes.inputGroup}>
                <label>申請フォーム：</label>
                <FormControl
                  variant="outlined"
                  className={classes.selectControl}
                >
                  <Select native value={''}>
                    <option aria-label="None" value=""></option>
                  </Select>
                </FormControl>
              </div>
            </div>
            {/* col 3 */}
            <div className={classes.col}>
              <Button
                variant="contained"
                className={classes.btnEdit}
                style={{ height: 60, width: 100 }}
              >
                検索
              </Button>
            </div>
          </div>
        </div>
        <div className={classes.formSecond}>
          <Paper className={classes.tbContainer}>
            <Table
              className={classes.table}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead className={classes.headTable}>
                <TableRow>
                  {headerTable.map((item, i) => {
                    return (
                      <TableCell key={i} align="center">
                        {item.isNew ? (
                          <TextField
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
                        ) : (
                          item.name
                        )}
                      </TableCell>
                    );
                  })}
                  <TableCell
                    align="center"
                    width={'80px'}
                    style={{ padding: 0 }}
                  >
                    …
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsTable.map((row, i) => {
                  return (
                    <TableRow key={i}>
                      {row.data.map((cel, y) => {
                        return (
                          <TableCell key={y} align="center">
                            {cel}
                          </TableCell>
                        );
                      })}
                      {i === 0 && (
                        <TableCell
                          rowSpan={rowsTable.length}
                          align="center"
                          style={{
                            borderLeft: 'solid 1px #E0E0E0',
                            padding: 0
                          }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            className={classes.btnAddColumn}
                            onClick={() => addNewColumn()}
                          >
                            <AddIcon />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </Wrapper>
    </div>
  );
}
