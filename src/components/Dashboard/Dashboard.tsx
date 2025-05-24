
import classes from './Dashboard.module.scss';

const { } = classes;

interface DashboardProps {
    loggedUser: string | undefined | null;
};

const Dashboard = ({ loggedUser }: DashboardProps) => {
    return (
        <div>
            <section></section>
            <section>
                <p>
                    Welcome, <b>{loggedUser || 'User'}</b>
                </p>
            </section>
        </div>
    );
};

export default Dashboard;