import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as moment from 'moment';
//component material
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// constant
import { apiRoot } from 'constant/index.js';

// component common
import Wrapper from 'components/Wrapper/Wrapper';
// helpers
import { isNullOrEmpty, isNullOrUndefined } from 'utils/helpers';

// icons
import CircularProgress from '@material-ui/core/CircularProgress';
// jss
import useStyles from 'assets/jss/pages/RequestDraft/RequestDetail';
import { folderRoot } from 'constant';

export default function RequestDetail() {
  const classes = useStyles();
  const { request_id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);

  useEffect(() => {
    async function getData() {
      // show loading
      setLoading(true);

      // call api get data
      const result = await getDataDraft();

      // hide loading
      setLoading(false);

      // faild
      if (!result) return;

      // success
      setDataDetail(result.data);
    }
    getData();
  }, []);

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  return (
    <div className={classes.root}>
      <div className={classes.headForm}>
        <div>
          申請状況：
          <label>経理</label>
          FC加盟契約稟議書
        </div>
        <span>作成日：2020年3月15日</span>
      </div>
      <Wrapper>
        <div className={classes.formContent}>
          <Typography className={classes.titleForm}>3.承認者意見欄</Typography>
          {isLoading && (
            <div className={classes.boxLoading}>
              <CircularProgress size={30} />
            </div>
          )}
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  classes={{
                    root: classes.lableStep,
                    iconContainer: classes.iconStep,
                    active: classes.stepCompleted
                  }}
                >
                  {label}
                  {index == 0 && (
                    <span style={{ color: '#00A2FF' }}>
                      ：（2020-03-16 承認済）
                    </span>
                  )}
                  {(index == 1 || index == 2) && (
                    <span style={{ color: '#FF6666' }}>：（承認待ち）</span>
                  )}
                </StepLabel>
                <StepContent active={true}>
                  {getStepContent(index, classes)}
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </div>
      </Wrapper>
    </div>
  );
}

//  get Draft
async function getDataDraft() {
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
function getSteps() {
  return ['最初に回覧（スキップOK）', '管理本部決済', '社長決済'];
}

function getStepContent(step, classes) {
  switch (step) {
    case 0:
      return (
        <div className={classes.contentStep}>
          <div style={{ display: 'flex', marginBottom: 10 }}>
            <Typography>中野さん</Typography>
            <span className={classes.tip}>OKです</span>
            <label className={classes.btnCirculation}>回覧</label>
          </div>
          <Typography>
            中野さん <label className={classes.btnCirculation}>回覧</label>
          </Typography>
        </div>
      );
    case 1:
      return (
        <div className={classes.contentStep}>
          <Typography style={{ marginBottom: 10 }}>田中さん</Typography>
          <Typography>中野さん</Typography>
        </div>
      );
    case 2:
      return (
        <div className={classes.contentStep}>
          <Typography>鈴木社長</Typography>
        </div>
      );
    default:
      return 'Unknown step';
  }
}
