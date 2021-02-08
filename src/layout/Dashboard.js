import React, { useState, Suspense } from 'react';
import { Redirect, Route, Switch, Router } from 'react-router-dom';
import classNames from 'classnames';
import routes from '../routes';
import logo from 'assets/img/logo.png';
import { Header, Sidebar, Workspace } from 'layout';
import { MobileBreakpoint } from 'assets/common';
import useMountEffect from '../mountEffect';
import { useCookies } from 'react-cookie';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import PublicRoute from 'components/PublicRoute/PublicRoute';
import { createBrowserHistory } from 'history';

// jss
import useStyles from 'assets/jss/layout/dashboardStyle';
import { isNullOrUndefined } from 'utils/helpers';

var hist = createBrowserHistory();
function Dashboard() {
  // const [cookies, removeCookie] = useCookies(['AuthenticationWorkflow']);
  // const userInfo = cookies.AuthenticationWorkflow;
  const classes = useStyles();
  const [opened, setOpened] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const mediaMatcher = matchMedia(`(max-width: ${MobileBreakpoint}px)`);

  const resizeDispatch = () => {
    if (typeof Event === 'function') {
      window.dispatchEvent(new Event('resize'));
    } else {
      const evt = window.document.createEvent('UIEvents');
      evt.initUIEvent('resize', true, false, window, 0);
      window.dispatchEvent(evt);
    }
  };

  const handleDrawerToggle = () => {
    setOpened(!opened);
    resizeDispatch();
  };

  const handleNotificationToggle = () =>
    setNotificationsOpen(!notificationsOpen);

  const handleFullscreenToggle = () => {
    const element = document.querySelector('#root');
    const isFullscreen =
      document.webkitIsFullScreen || document.mozFullScreen || false;

    element.requestFullScreen =
      element.requestFullScreen ||
      element.webkitRequestFullScreen ||
      element.mozRequestFullScreen ||
      function() {
        return false;
      };
    document.cancelFullScreen =
      document.cancelFullScreen ||
      document.webkitCancelFullScreen ||
      document.mozCancelFullScreen ||
      function() {
        return false;
      };
    isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
  };
  // logout
  const handleLogout = () => {
    // removeCookie('AuthenticationWorkflow');
  };

  useMountEffect(() => {
    if (mediaMatcher.matches) setOpened(false);
    mediaMatcher.addListener(match => {
      setTimeout(() => {
        if (match.matches) setOpened(false);
        else setOpened(true);
      }, 300);
    });

    return () => {
      mediaMatcher.removeListener(match => {
        setTimeout(() => {
          if (match.matches) setOpened(false);
          else setOpened(true);
        }, 300);
      });
    };
  });

  // const routerPublic = routes.map((item, index) => {
  //   if (item.type === 'submenu') {
  //     item.children.map(subItem => {
  //       return (
  //         <Route
  //           exact
  //           key={subItem.name}
  //           path={`${item.path}${subItem.path}`}
  //           component={subItem.component}
  //           name={subItem.name}
  //         />
  //       );
  //     });
  //   } else {
  //     return (
  //       <Route
  //         exact
  //         path={item.path}
  //         component={item.component}
  //         name={item.name}
  //         key={index}
  //       />
  //     );
  //   }
  // });
  
  // const getRoutes = userInfo => {
  //   return (
  //     <Suspense
  //       fallback={
  //         <div className="react-preloader-wrapper">
  //           <div className="react-preloader">
  //             <span></span>
  //             <span></span>
  //           </div>
  //         </div>
  //       }
  //     >
  //       <Switch>
  //         {userInfo.role === '0' ? (
  //           <Router history={hist}>
  //             <Switch>
  //               {routes.map((prop, key) => {
  //                 return (
  //                   <PrivateRoute
  //                     path={prop.path}
  //                     key={key}
  //                     Component={prop.component}
  //                     permistion={prop.permistion}
  //                     userInfo={userInfo}
  //                   />
  //                 );
  //               })}
  //             </Switch>
  //           </Router>
  //         ) : (
  //           routerPublic
  //         )}
  //         {/* <Redirect to="/dashboard" /> */}
  //       </Switch>
  //     </Suspense>
  //   );
  // };
  // console.log(userInfo)

  return (
    <>
      <Header
        logoAltText="Jibannet"
        logo={logo}
        toggleDrawer={handleDrawerToggle}
        toogleNotifications={handleNotificationToggle}
        toggleFullscreen={handleFullscreenToggle}
        logout={handleLogout}
        // userInfo={userInfo}
      />
      <div className={classNames(classes.panel, 'theme-dark')}>
        <Sidebar
          routes={routes}
          opened={opened}
          toggleDrawer={handleDrawerToggle}
          // userInfo={userInfo}
        />
        <Workspace opened={opened}>
          {isNullOrUndefined() ? (
            <Switch>
              <Redirect to="/" />
            </Switch>
          ) : (
            <PrivateRoute routes={routes} />
          )}
        </Workspace>
        {/** <NotificationCenter
          notificationsOpen={notificationsOpen}
          toogleNotifications={handleNotificationToggle}
        /> */}
      </div>
    </>
  );
}
export default Dashboard;
