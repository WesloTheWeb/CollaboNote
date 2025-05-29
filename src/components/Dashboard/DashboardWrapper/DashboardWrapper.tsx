'use client';

import { useSession } from 'next-auth/react';
import DashboardMenu from '../DashboardMenu/DashboardMenu';
import classes from './DashboardWrapper.module.scss';

type DashboardWrapperProps = {
  children: React.ReactNode;
  serverSession: any;
};

const DashboardWrapper = ({ children, serverSession }: DashboardWrapperProps) => {
  const { data: clientSession } = useSession();
  
  const session = clientSession || serverSession;
  
  if (session) {
    return (
      <div className={classes.dashboardLayout}>
        <DashboardMenu loggedUser={session?.user?.name} />
        <main className={classes.mainContent}>
          {children}
        </main>
      </div>
    );
  }
  
  // For unauthenticated users, just show children
  return <>{children}</>;
};

export default DashboardWrapper;