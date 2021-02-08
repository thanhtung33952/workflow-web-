import React, { Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router';
// import { useCookies } from 'react-cookie';
// constant
// import { folderRoot } from 'constant';
const folderRoot = '/';

function PrivateRoute(props) {
  console.log('private');
  return (
    <Suspense
      fallback={
        <div className="react-preloader-wrapper">
          <div className="react-preloader">
            <span></span>
            <span></span>
          </div>
        </div>
      }
    >
      <Switch>
        {props.routes.map((item, index) => {
          if (item.permistion !== 1) {
            if (item.type === 'submenu') {
              return (
                <Route
                  path={item.path}
                  component={item.component}
                  name={item.name}
                  key={index}
                >
                  {item.children.map(subItem => {
                    return (
                      <Route
                        exact
                        key={subItem.name}
                        path={`${item.path}${subItem.path}`}
                        component={subItem.component}
                        name={subItem.name}
                      />
                    );
                  })}
                  ;
                </Route>
              );
            } else {
              return (
                <Route
                  exact
                  path={item.path}
                  component={item.component}
                  name={item.name}
                  key={index}
                />
              );
            }
          } else {
            // component thông báo không có quyền hạn vào router này
            return <Redirect key={index} to={`${folderRoot}2020`} />;
          }
        })}
      </Switch>
    </Suspense>
  );
}

export default PrivateRoute;
