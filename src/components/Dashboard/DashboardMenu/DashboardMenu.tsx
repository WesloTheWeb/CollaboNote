import Link from 'next/link';
import { dashboardMenuConfig } from '@/config';
import classes from './DashboardMenu.module.scss';

const { DashboardMenuContainer } = classes;

const DashboardMenu = ({ }) => {
    return (
        <section className={DashboardMenuContainer}>
            {
                dashboardMenuConfig.map(({ dashboardMenuLinkName, dashboardPath }) => {
                    return (
                        <li key={dashboardMenuLinkName}>
                            <Link href={dashboardPath}>
                                {dashboardMenuLinkName}
                            </Link>
                        </li>
                    )
                })
            }
        </section>
    );
};

export default DashboardMenu;