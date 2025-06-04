import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { DashboardProps } from "@/interfaces";
import NewsFeed from "./NewsFeed/Newsfeed";
import classes from './MainContent.module.scss';

const { mainContentContainer, guestMessageText } = classes;

const MainContent = async ({ loggedUser }: DashboardProps) => {
    const session = await getServerSession(authOptions);
    const isGuest = session?.user?.role === 'guest';

    return (
        <section className={mainContentContainer}>
            <div>
                <h2>Dashboard Feed</h2>
                <h5>
                    Welcome, <b>{loggedUser || 'User'}</b>
                </h5>
                {isGuest ? (
                    <p className={guestMessageText}>
                        You&apos;re viewing as a guest! This is a demo of the dashboard.
                        <strong> Sign up to create your own goals and track your progress.</strong>
                    </p>
                ) : (
                    <NewsFeed />
                )}
            </div>
        </section>
    );
};

export default MainContent;