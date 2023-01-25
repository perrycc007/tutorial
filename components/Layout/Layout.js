import { Fragment } from 'react';
import MainNavigation from './MainNavigation';
import classes from './Layout.module.css'
const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation className={classes.navbar}/>
      <main className={classes.content}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
