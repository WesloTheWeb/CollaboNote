import classes from './DashboardMenu.module.scss'; 

const { DashboardMenuContainer } = classes;

const DashboardMenu = ({ }) => {
    return (
        <section className={DashboardMenuContainer}>
            <li>Menu</li>
        </section>
    );
};

export default DashboardMenu;