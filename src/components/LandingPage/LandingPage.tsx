import { Row, Col } from "../Layout";
import LoginRegister from "./LoginRegister/LoginRegister";
import PricingTable from "./PricingTable/PricingTable";
import classes from './LandingPage.module.scss';
import PricingCard from "./PricingTable/PricingCard/PricingCard";

const {
    leftColumn,
    rightColumn,
    welcomeContainer,
    welcomeTitle,
    introContent,
    featuresList,
    ctaButton
} = classes;

const LandingPage = () => {
    return (
        <>
            <Row justify="space-between">
                <Col md={6} className={leftColumn}>
                    <section className={welcomeContainer}>
                        <h2 className={welcomeTitle}>Welcome to CollaboNote</h2>
                        <div className={introContent}>
                            <p>
                                CollaboNote is a <strong>collaborative journaling and accountability platform</strong> built
                                to help you reach your goals with the support of others.
                            </p>
                            <p>
                                Whether you&apos;re tracking habits, working on personal growth,
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
                <Col md={6} className={rightColumn}>
                    <LoginRegister />
                </Col>
            </Row>
            <Row>
                <PricingTable />
                <PricingCard />
            </Row>
        </>
    );
};

export default LandingPage;