import LoginInput from './LoginInput';
import classes from './LoginRegister.module.scss';

const {loginContainer} = classes;

const LoginRegister = ({}) => {
    return (
        <section className={loginContainer}>
            <h6>Login or Register</h6>
            <LoginInput />
        </section>
    );
};

export default LoginRegister;