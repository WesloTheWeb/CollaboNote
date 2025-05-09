import { Row, Col } from "../Layout";
import classes from './LandingPage.module.scss';
import LoginRegister from "./LoginRegister/LoginRegister";

const {
    welcomeContainer,
    welcomeTitle,
    introContent,
    featuresList,
    ctaButton,
    backdrop
} = classes;

const LandingPage = () => {
    return (
        <>
            <Row justify="space-between" className={backdrop}>
                <Col md={6}>
                    <section className={welcomeContainer}>
                        <h2 className={welcomeTitle}>Welcome to CollaboNote</h2>
                        <div className={introContent}>
                            <p>
                                CollaboNote is a <strong>collaborative journaling and accountability platform</strong> built
                                to help you reach your goals with the support of others.
                            </p>
                            <p>
                                Whether you're tracking habits, working on personal growth,
                                or building something big, CollaboNote lets you share your journey
                                and stay motivated—<strong>together</strong>.
                            </p>
                            <p>
                                Our community of goal-setters and achievers provides the
                                accountability, encouragement, and inspiration you need to
                                transform your aspirations into accomplishments.
                            </p>
                        </div>
                        <ul className={featuresList}>
                            <li>Create personalized goal trackers and habit journals</li>
                            <li>Connect with like-minded individuals for accountability</li>
                            <li>Celebrate milestones and progress with your support circle</li>
                            <li>Access powerful tools to visualize your growth journey</li>
                        </ul>
                        <button className={ctaButton}>Learn More</button>
                    </section>
                </Col>
                <Col md={6}>
                    <LoginRegister />
                </Col>
            </Row>
        </>
    );
};

export default LandingPage;

// TODO: Make a Price Table using html table header row elements for practice.