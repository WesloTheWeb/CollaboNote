import { Row, Col } from "../Layout";
import classes from './LandingPage.module.scss';

const { container } = classes;

const LandingPage = ({ }) => {


    return (
        <>
            <Row>
                <Col>
                    <section className="container">
                        <h2>Welcome to CollaboNote</h2>
                        <div className="intro-content">
                            <p>
                                CollaboNote is a collaborative journaling and accountability platform
                                built to help you reach your goals with the support of others.
                            </p>
                            <p>
                                Whether you're tracking habits, working on personal growth,
                                or building something big, CollaboNote lets you share your journey
                                and stay motivated—together.
                            </p>
                        </div>
                    </section>

                </Col>
                <Col>

                </Col>
            </Row>

        </>
    )
};

export default LandingPage;