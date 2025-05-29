import { DashboardProps } from "@/interfaces";
import classes from './MainContent.module.scss';

const { mainContentContainer } = classes;

const MainContent = ({ loggedUser }: DashboardProps) => {

    return (
        <section className={mainContentContainer}>
            <div>
                <h2>Dashboard Feed</h2>
                <h5>
                Welcome, <b>{loggedUser || 'User'}</b>
                </h5>
                <p>
                    I am still working on the design. But logging in and out, and making an account is secure and implemented.
                </p>
            </div>
        </section>
    );
};

export default MainContent;