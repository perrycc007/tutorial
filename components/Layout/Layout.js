import { Fragment } from 'react';
import MainNavigation from './MainNavigation';
import classes from './Layout.module.css'
import Footer from './Footer'
const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation className={classes.navbar}/>
      <main className={classes.content}>{props.children}</main>
      <Footer/>
    </Fragment>
  );
};

export default Layout;
