import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
// component customer
import SidebarItem from './SidebarItem';

// icons
import MenuIcon from '@material-ui/icons/Menu';

// // jss
import useStyles from 'assets/jss/layout/sidebarStyle';
import { isNullOrUndefined } from 'utils/helpers';

export default function Sidebar(props) {
  const { opened, toggleDrawer, routes, userInfo } = props;
  const location = useLocation();
  const classes = useStyles();
  const [activeRoute, setActiveRoute] = useState(undefined);
  const [tabActive, setTabActive] = useState(0);
  const toggleMenu = index =>
    setActiveRoute(activeRoute === index ? undefined : index);

  useEffect(() => {
    if (!userInfo) return;
    routes.map(route => {
      if (location.pathname.indexOf(route.path) > -1) {
        route.tab === 2 && userInfo.role === '1'
          ? setTabActive(1)
          : setTabActive(0);
        return;
      }
    });
  }, []);

  const handleChange = (event, newValue) => {
    setTabActive(newValue);
  };
  const handleDrawerToggle = () => {
    toggleDrawer();
  };
  const handleDrawerTab = tab => {
    toggleDrawer();
    if (tab && tab !== tabActive) {
      setTabActive(tab);
    }
  };
  const menuTab1 = (
    <List component="div">
      {routes.map((route, index) => {
        const isCurrentPath =
          location.pathname.indexOf(route.path) > -1 ? true : false;
        if (route.tab === 1 && route.type !== 'hide') {
          return (
            <SidebarItem
              key={index}
              index={index}
              route={route}
              activeRoute={activeRoute}
              toggleMenu={toggleMenu}
              currentPath={isCurrentPath}
            />
          );
        }
      })}
    </List>
  );
  const menuTab2 = (
    <List component="div">
      {routes.map((route, index) => {
        const isCurrentPath =
          location.pathname.indexOf(route.path) > -1 ? true : false;
        if (route.tab === 2 && route.type !== 'hide') {
          return (
            <SidebarItem
              key={index}
              index={index}
              route={route}
              activeRoute={activeRoute}
              toggleMenu={toggleMenu}
              currentPath={isCurrentPath}
            />
          );
        }
      })}
    </List>
  );
  return (
    <>
      <Hidden smDown>
        <Drawer
          variant="persistent"
          classes={{
            paper: classes.drawerPaper
          }}
          open={opened}
          ModalProps={{
            keepMounted: false,
            className: classes.modal,
            BackdropProps: {
              className: classes.backdrop
            },
            onBackdropClick: toggleDrawer
          }}
        >
          <Tabs
            value={tabActive}
            onChange={handleChange}
            classes={{
              root: classes.tabs,
              indicator: classes.indicator
            }}
          >
            <Tab
              label="申請機能"
              {...a11yProps(0)}
              classes={{
                root: classes.tab,
                selected: classes.tabSelected
              }}
            />
            {!isNullOrUndefined(userInfo) && userInfo.role === '1' && (
              <Tab
                label="管理者機能"
                {...a11yProps(1)}
                classes={{
                  root: classes.tab,
                  selected: classes.tabSelected
                }}
              />
            )}
          </Tabs>
          {tabActive === 0 && menuTab1}
          {tabActive === 1 &&
            !isNullOrUndefined(userInfo) &&
            userInfo.role === '1' &&
            menuTab2}
          {/* icon toggle menu */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            className={classes.iconMenu}
          >
            <MenuIcon />
          </IconButton>
          {/* end icon toggle menu */}
        </Drawer>
      </Hidden>
      <Hidden mdUp>
        <SwipeableDrawer
          variant="temporary"
          classes={{
            paper: classes.drawerPaper
          }}
          open={opened}
          onOpen={toggleDrawer}
          ModalProps={{
            keepMounted: false,
            className: classes.modal,
            BackdropProps: {
              className: classes.backdrop
            }
          }}
          onClose={toggleDrawer}
        >
          <Tabs
            value={tabActive}
            onChange={handleChange}
            classes={{
              root: classes.tabs,
              indicator: classes.indicator
            }}
          >
            <Tab
              label="申請機能"
              {...a11yProps(0)}
              classes={{
                root: classes.tab,
                selected: classes.tabSelected
              }}
            />
            <Tab
              label="管理者機能"
              {...a11yProps(1)}
              classes={{
                root: classes.tab,
                selected: classes.tabSelected
              }}
            />
          </Tabs>
          {tabActive === 0 && menuTab1}
          {tabActive === 1 && menuTab2}
          {/* icon toggle menu */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            className={classes.iconMenu}
          >
            <MenuIcon />
          </IconButton>
          {/* end icon toggle menu */}
        </SwipeableDrawer>
      </Hidden>
      {!opened && (
        <Hidden mdDown>
          <div className={classes.tabHidden}>
            <span onClick={() => handleDrawerTab(0)}>
              申<br />請<br />機<br />能
            </span>
            <span onClick={() => handleDrawerTab(1)}>
              管<br />理<br />者<br />機<br />能
            </span>
          </div>
        </Hidden>
      )}
    </>
  );
}

Sidebar.prototypes = {
  opened: PropTypes.func,
  toggleDrawer: PropTypes.func,
  closeDrawer: PropTypes.func,
  openDrawer: PropTypes.func,
  routes: PropTypes.object,
  userInfo: PropTypes.object
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}
