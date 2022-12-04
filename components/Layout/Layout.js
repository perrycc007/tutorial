import { Fragment } from 'react';
import DrawerAppBar from './DrawerAppBar'
import MainNavigation from './MainNavigation';

const Layout = (props) => {
  return (
    <Fragment>
      <DrawerAppBar />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
