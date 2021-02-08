import React from 'react';
import ReactDOM from 'react-dom';

// redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from 'reducers';

// other
import theme from 'theme';
import { ThemeProvider } from '@material-ui/core/styles';
// import { createBrowserHistory } from 'history';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { initializeStore } from 'store/index.js';
// import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import Dashboard from 'layout/Dashboard';
import NotFound from 'pages/Errors/NotFound';
import Limit from 'pages/Errors/Limit';
import Forgot from 'pages/Authentication/Forgot';
import Signin from 'pages/Authentication/Signin';
import Signup from 'pages/Authentication/Signup';
import ChangePassword from 'pages/Authentication/ChangePassword';
import PasswordReset from 'pages/Authentication/PasswordReset';

// var hist = createBrowserHistory();
// create store
const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        {/* <Router history={hist}>
          <Switch>
            {indexRoutes.map((prop, key) => {
              if (prop.protected === true) {
                return (
                  <PrivateRoute
                    path={prop.path}
                    key={key}
                    Component={prop.component}
                  />
                );
              }

              return (
                <Route path={prop.path} key={key} component={prop.component} />
              );
            })}
          </Switch>
        </Router> */}
        <Switch>
          <Route exact path="/404" component={NotFound} />
          <Route exact path="/2020" component={Limit} />
          <Route exact path="/forgot" component={Forgot} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/change-password" component={ChangePassword} />
          <Route exact path="/resetpassword" component={PasswordReset} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
