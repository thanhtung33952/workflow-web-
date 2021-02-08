// import React, { useState } from 'react';
// import Button from '@material-ui/core/Button';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import Checkbox from '@material-ui/core/Checkbox';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import TextField from '@material-ui/core/TextField';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import classNames from 'classnames';
// import PropTypes, { instanceOf } from 'prop-types';

// import { withCookies, Cookies, useCookies } from 'react-cookie';
// // icon
// import MailIcon from '@material-ui/icons/MailOutline';
// import LockIcon from '@material-ui/icons/LockOpen';
// import CircularProgress from '@material-ui/core/CircularProgress';
// // image
// import logo from 'assets/img/logo.png';
// // constant
// import { folderRoot, apiRoot } from 'constant/index.js';
// import axios from 'axios';

// // jss
// import useStyles from 'assets/jss/pages/Authentication/Authentication';

// function Signin() {
//   const classes = useStyles();
//   const [isCheck, setCheck] = useState();
//   const [cookies, setCookie] = useCookies(['AuthenticationWorkflow']);
//   const [data, setData] = useState({
//     email: '',
//     password: '',
//     remember: false
//   });
//   const [submit, setSubmit] = useState({
//     isLoading: false,
//     status: 0, // 0: normar, -1 error, 1 success
//     msg: ''
//   });

//   // isValid isEmail
//   const isEmail = () => {
//     if (!data.email) {
//       return false;
//     }
//     var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//     if (!re.test(String(data.email).toLowerCase())) {
//       return false;
//     } else {
//       return true;
//     }
//   };
//   // handle Change Field TextField
//   const handleChangeField = name => e => {
//     let val = e.target.value;
//     if (name === 'remember') val = e.target.checked;
//     setData({ ...data, [name]: val });
//   };

//   // isValid email, password in data
//   const isValid = () => {
//     if (!data.email || !data.password || !isEmail()) {
//       setCheck(-1);
//       return false;
//     } else {
//       setCheck(1);
//       return true;
//     }
//   };

//   // handel Login
//   const handelLogin = async () => {
//     const isValidation = isValid();
//     if (!isValidation) return;
//     setSubmit({ ...submit, isLoading: true });
//     // start login
//     const dataSubmit = {
//       email: data.email,
//       password: data.password
//     };

//     try {
//       const res = await axios.post(`${apiRoot}/login`, dataSubmit);
//       // login error
//       if (res.status !== 200) {
//         setSubmit({
//           ...submit,
//           isLoadding: false,
//           status: -1,
//           msg: 'Oops, something went wrong!'
//         });
//         return;
//       }
//       // login success
//       const result = res.data.data;
//       // login success redirect to page
//       if (res.data.primary_password === '1') {
//         // save to cookie
//         setCookie(
//           'AuthenticationWorkflow',
//           {
//             userID: result.id,
//             email: result.email,
//             userName: result.userName,
//             role: result.role
//           },
//           { path: '/' }
//         );
//         // role !== 1 will be limited by router Candlestick redirect go to home
//         result.role === '1'
//           ? (window.location.href = `${folderRoot}users`)
//           : (window.location.href = `${folderRoot}`);
//       } else {
//         window.location.href = `${folderRoot}change-password?email=${data.email}&&password=${data.password}`;
//       }
//       setSubmit({
//         ...submit,
//         isLoadding: false,
//         status: 1,
//         role: result.role,
//         msg: 'ログイン成功'
//       });
//     } catch (error) {
//       // wrong password or email
//       if (error.response && error.response.data.code === -1) {
//         setSubmit({
//           ...submit,
//           isLoadding: false,
//           status: -1,
//           msg: 'メールアドレスまたはパスワードが間違っています。'
//         });
//         return;
//       }
//       setSubmit({
//         ...submit,
//         isLoadding: false,
//         status: -1,
//         msg: 'Oops, something went wrong!'
//       });
//       return;
//     }
//   };

//   // enter login
//   const onKeyPressLogin = e => {
//     if (e.key === 'Enter') {
//       handelLogin();
//     }
//   };
//   return (
//     <div className={classNames(classes.session)}>
//       <div className={classes.content}>
//         <Box className={classes.wrapper} boxShadow={2}>
//           <Card className={classes.cardForm}>
//             <CardContent>
//               {/* logo */}
//               <div className={classes.logo}>
//                 <img src={logo} alt="Jibannet" />
//                 <span>ワークフロー・稟議</span>
//               </div>
//               {/* form signin */}
//               <form className={classes.form}>
//                 {/* email */}
//                 <TextField
//                   error={!isEmail() && isCheck === -1 ? true : false}
//                   className={classes.inputLogin}
//                   helperText={
//                     !isEmail() &&
//                     isCheck === -1 &&
//                     'メールアドレスは有効がありません。'
//                   }
//                   placeholder="メールアドレス"
//                   variant="outlined"
//                   InputProps={{
//                     classes: {
//                       root: classes.rootInput,
//                       input: classes.thisInput,
//                       error: classes.thisInputError
//                     },
//                     startAdornment: (
//                       <InputAdornment
//                         position="start"
//                         className={classes.iconInput}
//                       >
//                         <MailIcon />
//                       </InputAdornment>
//                     )
//                   }}
//                   onChange={handleChangeField('email')}
//                   onKeyPress={onKeyPressLogin}
//                 />
//                 <TextField
//                   error={!data.password && isCheck === -1 ? true : false}
//                   className={classes.inputLogin}
//                   helperText={
//                     !data.password && isCheck === -1 && '必ず入力してください。'
//                   }
//                   placeholder="パスワード"
//                   type="password"
//                   variant="outlined"
//                   InputProps={{
//                     classes: {
//                       root: classes.rootInput,
//                       input: classes.thisInput,
//                       error: classes.thisInputError
//                     },
//                     startAdornment: (
//                       <InputAdornment
//                         position="start"
//                         className={classes.iconInput}
//                       >
//                         <LockIcon />
//                       </InputAdornment>
//                     )
//                   }}
//                   onChange={handleChangeField('password')}
//                   onKeyPress={onKeyPressLogin}
//                   style={{ marginBottom: 10 }}
//                 />
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={data.remember}
//                       className={classes.checkbox}
//                       onChange={handleChangeField('remember')}
//                     />
//                   }
//                   label="ログイン情報を保存する"
//                   className={classes.checkRemember}
//                 />
//                 {/* message */}
//                 <Typography
//                   className={classNames(classes.message, {
//                     [classes.msgError]: submit.status === -1,
//                     [classes.msgSuc]: submit.status === 1
//                   })}
//                 >
//                   {submit.msg}
//                 </Typography>
//                 {/* submit */}
//                 <div className={classes.rowSubmit}>
//                   <Button
//                     disabled={submit.isLoading}
//                     type="button"
//                     variant="contained"
//                     color="primary"
//                     fullWidth
//                     className={classes.submit}
//                     onClick={handelLogin}
//                   >
//                     ログイン
//                   </Button>
//                   {submit.isLoading && (
//                     <CircularProgress
//                       size={24}
//                       className={classes.iconProgress}
//                     />
//                   )}
//                 </div>
//               </form>
//             </CardContent>
//           </Card>
//         </Box>
//       </div>
//     </div>
//   );
// }

// Signin.prototypes = {
//   cookies: instanceOf(Cookies).isRequired
// };

// export default withCookies(Signin);
