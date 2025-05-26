import { DashboardProps } from "@/interfaces";
import classes from './MainContent.module.scss';

const { mainContentContainer } = classes;

const MainContent = ({ loggedUser }: DashboardProps) => {

    return (
        <section className={mainContentContainer}>
            <div>
                <p>
                Welcome, <b>{loggedUser || 'User'}</b>
                </p>
                <p>
                    I am still working on the design. But logging in and out, and making an account is secure and implemented.
                </p>
            </div>
        </section>
    );
};

export default MainContent;