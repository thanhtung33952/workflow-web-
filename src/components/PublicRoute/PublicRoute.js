import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router';
const NotFound = lazy(() => import('pages/Errors/NotFound'));
export default function PublicRoute(props) {
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
          if (item.type === 'submenu') {
            return (
              <Route
                path={item.path}
                component={item.component}
                name={item.name}
                key={index}
              >
                {/* render cac routing con */}
                {item.children.map((subItem, i) => {
                  return (
                    <Route
                      exact
                      key={i}
                      path={`${item.path}${subItem.path}`}
                      component={subItem.component}
                      name={subItem.name}
                    />
                  );
                })}
                {/* nếu không có routing con nào được khai báo sẽ vào 404 */}
                <Route component={NotFound} />
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
        })}
      </Switch>
    </Suspense>
  );
}
