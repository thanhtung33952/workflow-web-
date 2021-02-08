import ArrowDropDownIcon from '@material-ui/icons/ArrowLeft';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropDown';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
// import { capitalize } from '../../helpers';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import useMountEffect from '../../mountEffect';

const useStyles = makeStyles(theme => ({
  badge: {
    width: '20px',
    height: '20px',
    display: 'flex',
    zIndex: 1,
    flexWrap: 'wrap',
    fontSize: '0.75rem',
    alignItems: 'center',
    borderRadius: '50%',
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  menuLink: {
    position: 'relative',
    fontSize: '0.75rem',
    display: 'block',
    textDecoration: 'none',
    color: '#fff'
  },
  menuItem: {
    paddingLeft: 15,
    paddingRight: 0,
    paddingTop: theme.spacing(1) * 1.5,
    paddingBottom: theme.spacing(1) * 1.5,
    color: '#fff',
    '& p': {
      flexGrow: 1
    }
  },
  menuIcon: {
    marginLeft: theme.spacing(1) * 2,
    color: '#fff',
    marginRight: theme.spacing(1) * 2
  },
  menuSubItem: {
    paddingLeft: '35px',
    paddingRight: '35px',
    paddingTop: theme.spacing(1) * 1.5,
    paddingBottom: theme.spacing(1) * 1.5,
    color: '#fff'
  },
  menuCollapsed: {
    backgroundColor: theme.palette.action.hover
  },
  menuActive: {
    backgroundColor: theme.palette.action.hover
  },
  menuClosed: {
    backgroundColor: 'transparent'
  },
  caret: {
    marginLeft: theme.spacing(1) * 2,
    marginRight: theme.spacing(1) * 2,
    minWidth: 0,
    color: '#fff',
    '& svg': {
      fontSize: 30
    }
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  },
  error: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText
  }
}));
export default function SidebarItem(props) {
  const { route, index, activeRoute, toggleMenu, currentPath } = props;
  const classes = useStyles();
  useMountEffect(() => {
    if (!currentPath || activeRoute === index || route.path === '/') return;
    toggleMenu(index);
  });

  const badge = badge => {
    if (!badge) return;
    const badgeClassName = classNames(classes.badge, {
      [classes[`${badge.type}`]]: badge.type !== 'default'
    });
    return (
      <Typography
        className={classNames(classes.badge, badgeClassName)}
        component="div"
      >
        {badge.value}
      </Typography>
    );
  };

  if (route.type === 'external') {
    return (
      <a
        href={route.path}
        target="_blank"
        rel="noopener noreferrer"
        key={index}
        className={classes.menuLink}
      >
        <ListItem className={classes.menuItem} button>
          <Typography variant="body1">{route.name}</Typography>
          {badge(10)}
        </ListItem>
      </a>
    );
  }

  if (route.type === 'submenu') {
    return (
      <div
        className={
          activeRoute === index ? classes.menuCollapsed : classes.menuClosed
        }
      >
        <ListItem
          className={classes.menuItem}
          button
          key={index}
          onClick={() => toggleMenu(index)}
        >
          <Typography variant="body1">{route.name}</Typography>
          <ListItemIcon className={classes.caret}>
            {activeRoute === index ? (
              <ArrowDropUpIcon />
            ) : (
              <ArrowDropDownIcon />
            )}
          </ListItemIcon>
        </ListItem>
        <Collapse
          in={activeRoute === index ? true : false}
          timeout="auto"
          unmountOnExit
        >
          <List disablePadding>
            {route.children.map(
              (subitem, index) =>
                subitem.type !== 'hide' && (
                  <NavLink
                    to={`${route.path ? route.path : ''}${
                      subitem.path ? subitem.path : ''
                    }`}
                    exact
                    className={classes.menuLink}
                    activeClassName={classes.menuActive}
                    key={index}
                  >
                    <ListItem className={classes.menuSubItem} button>
                      <Typography variant="body1">{subitem.name}</Typography>
                      {badge(subitem.badge)}
                    </ListItem>
                  </NavLink>
                )
            )}
          </List>
        </Collapse>
      </div>
    );
  }

  return (
    <NavLink
      to={route.path}
      exact
      className={classes.menuLink}
      activeClassName={classes.menuActive}
      key={index}
    >
      <ListItem
        className={classes.menuItem}
        button
        onClick={() => toggleMenu(index)}
      >
        <Typography variant="body1">{route.name}</Typography>
        {badge(route.badge)}
      </ListItem>
    </NavLink>
  );
}
SidebarItem.prototypes = {
  route: PropTypes.object,
  index: PropTypes.number,
  activeRoute: PropTypes.number,
  toggleMenu: PropTypes.func
};
