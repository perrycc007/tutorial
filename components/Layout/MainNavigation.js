import Link from 'next/link';
import classes from './MainNavigation.module.css';
import userStore from '../../stores/stores';
import shallow from 'zustand/shallow'
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';




const MainNavigation = () => {
  const getUserid = userStore(state => state.userId);
  const isLoggedin = userStore(state => state.isLoggedin);
  const logOutAction = userStore(state => state.logoutUserid);
  const cleanFavourite = userStore (state => state.cleanFavourite)

  const logoutHandler = () => {
    logOutAction()
    cleanFavourite()
    // optional: redirect the user
  };

  return (
    <header className={classes.header}>
      <Link href='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedin && (
            <li>
              <Link href='/auth'>Login</Link>
            </li>
          )}
          {/* {isLoggedIn && (
            <li>
              <Link to='/changepassword'>Change Password</Link>
            </li>
          )} */}
          {isLoggedin && (
            <li>
              <Link href='/apply'>Apply</Link>
            </li>
          )}
            <li>
              <Link href='/cases'>Cases</Link>
            </li>
            <li>
              <Link href='/tutor'>Tutorial</Link>
            </li>
          {isLoggedin && (
            <li>
              <Link href='/profile'>Profile</Link>
            </li>
          )}
          {isLoggedin && (
            <li>
              <Link href='/favourite'>Favourite</Link>
            </li>
          )}

          <IconButton
            className={classes.IconButton}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
         {isLoggedin && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
