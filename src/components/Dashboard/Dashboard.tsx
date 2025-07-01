import MainContent from './MainContent/MainContent';
import { DashboardProps } from '@/interfaces';
import classes from './Dashboard.module.scss';
import MotivationalWidget from './MotivationalWidget/MotivationalWidget';

const { dashboardParentContainer } = classes;

const Dashboard = ({ loggedUser }: DashboardProps) => {
    return (
        <div className={dashboardParentContainer}>
            <MainContent
                loggedUser={loggedUser}
            />
            <MotivationalWidget />
        </div>
    );
};

export default Dashboard;