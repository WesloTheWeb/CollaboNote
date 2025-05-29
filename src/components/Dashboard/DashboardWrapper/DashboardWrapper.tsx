'use client';

import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import DashboardMenu from '../DashboardMenu/DashboardMenu';
import classes from './DashboardWrapper.module.scss';

type DashboardWrapperProps = {
  children: React.ReactNode;
};

const {dashboardLayout, mainContent} = classes;

const DashboardWrapper = ({ children }: DashboardWrapperProps) => {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Show dashboard sidebar ONLY on non-root pages when authenticated
  const shouldShowDashboardSidebar = session && pathname !== '/';

  if (shouldShowDashboardSidebar) {
    return (
      <div className={dashboardLayout}>
        <DashboardMenu loggedUser={session.user?.name} />
        <main className={mainContent}>
          {children}
        </main>
      </div>
    );
  }

  // For root page or unauthenticated users, just show children
  return <>{children}</>;
};

export default DashboardWrapper;