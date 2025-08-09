import classes from './FallbackAlert.module.scss';

const {
    alertContainer,
    alertCard,
    alertIcon,
    alertTitle,
    alertMessage,
    contactInfo
} = classes;

const FallbackAlert = () => {

    return (
        <section className={alertContainer}>
            <article className={alertCard}>
                <div className={alertIcon}>⚠️</div>
                <h3 className={alertTitle}>Database Connection Error</h3>
                <p className={alertMessage}>
                    CollaboNote uses a Supabase database, and the free tier often resets after inactivity. 
                </p>
                <p className={contactInfo}>
                    Please contact admin to bring the site back online.
                </p>
            </article>
        </section>
    );
};

export default FallbackAlert;