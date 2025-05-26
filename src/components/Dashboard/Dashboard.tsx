
import DashboardMenu from './DashboardMenu/DashboardMenu';
import MainContent from './MainContent/MainContent';
import { DashboardProps } from '@/interfaces';
import classes from './Dashboard.module.scss';

const { dashboardParentContainer } = classes;

const Dashboard = ({ loggedUser }: DashboardProps) => {
    return (
        <div className={dashboardParentContainer}>
            <DashboardMenu />
            <MainContent
                loggedUser={loggedUser}
            />

        </div>
    );
};

export default Dashboard;