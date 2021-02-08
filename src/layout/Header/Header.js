import React, { useState } from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

// @material-ui components
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

// icons
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/PermIdentity';
import AccountDown from '@material-ui/icons/ArrowDropDown';

// jss
import useStyles from 'assets/jss/layout/headerStyle';
import { isNullOrUndefined } from 'utils/helpers';

// helpers
// component custommer
import PopupChangePassword from 'components/Authentication/PopupChangePassword';

function Header(props) {
  const { userInfo, logo, logoAltText, toggleDrawer, logout } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const handleSettingdToggle = event => setAnchorEl(event.currentTarget);

  const handleCloseMenu = () => setAnchorEl(null);

  const handleSearchExpandToggle = () => setSearchExpanded(!searchExpanded);

  const handleDrawerToggle = () => {
    toggleDrawer();
    if (searchExpanded) handleSearchExpandToggle();
  };
  const handleClickOpen = () => {
    setAnchorEl(null);
    setOpen(true);
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <Hidden mdUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            className={classes.iconMenu}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        {/* logo */}
        <div className={classes.logo}>
          <img src={logo} alt={logoAltText} />
          <span>ワークフロー・稟議</span>
        </div>

        {/* account */}
        <ListItem
          className={classes.account}
          aria-label="User Settings"
          aria-owns={anchorEl ? 'user-menu' : null}
          aria-haspopup="true"
          color="inherit"
          onClick={handleSettingdToggle}
        >
          <ListItemAvatar className={classes.avatar}>
            <Avatar>
              <AccountCircle />
            </Avatar>
          </ListItemAvatar>
          <Hidden mdDown>
            <ListItemText
              primary={
                !isNullOrUndefined(userInfo) &&
                !isNullOrUndefined(userInfo.email)
                  ? userInfo.email
                  : ''
              }
            />
            <AccountDown />
          </Hidden>
        </ListItem>
        {/* option menu account */}
        <Menu
          className={classes.menuOption}
          getContentAnchorEl={null}
          id="user-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <MenuItem onClick={handleClickOpen}>
            <ListItemText primary="パスワード変更" />
          </MenuItem>
          <MenuItem onClick={logout}>
            <ListItemText primary="ログアウト" />
          </MenuItem>
        </Menu>
      </Toolbar>
      <PopupChangePassword
        isOpen={open}
        userInfo={userInfo}
        onClose={() => setOpen(false)}
      />
    </AppBar>
  );
}

Header.prototypes = {
  logo: PropTypes.string,
  logoAltText: PropTypes.string,
  cookies: instanceOf(Cookies).isRequired
};
export default withCookies(Header);
