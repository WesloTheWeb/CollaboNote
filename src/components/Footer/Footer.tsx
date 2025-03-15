import classes from './Footer.module.scss';

const { footer } = classes;

const Footer = () => {

    const startYear = 2025;
    const currentYear = new Date().getFullYear();

    const copyRightAutomateYear = () => {
        if (currentYear === startYear) {
            return <p>Copyright &copy; {startYear}</p>;
        } else {
            return <p>Copyright &copy; {startYear} - {currentYear}</p>;
        };
    };

    return (
        <footer className={footer}>
            {copyRightAutomateYear()}
            <p>CollaboNote is a work in progress.</p>
        </footer>
    )
};

export default Footer;