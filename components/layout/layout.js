import { Fragment } from 'react';
import { SessionProvider } from 'next-auth/react';

import MainNavigation from './main-navigation';

function Layout(props) {
  return (
    <SessionProvider>
      <Fragment>
        <MainNavigation />
        <main>{props.children}</main>
      </Fragment>
    </SessionProvider>
  );
}

export default Layout;
