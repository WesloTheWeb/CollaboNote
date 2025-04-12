import { ButtonProps, ButtonTypes } from '@/interfaces';
import classes from './Button.module.scss';

const { registerButton, signInButton, submitButton } = classes;


const buttonPaths = {
    [ButtonTypes.SIGNIN]: signInButton,
    [ButtonTypes.REGISTER]: registerButton,
    [ButtonTypes.SUBMIT]: submitButton,
    [ButtonTypes.RESET]: classes.button
};

const Button = ({
    buttonType,
    type = 'button',
    fn,
    disabled,
    'data-disabled': dataDisabled,
    children
}: ButtonProps) => {
    const determineButtonText = (type: ButtonTypes) => {
        switch (type) {
            case ButtonTypes.SIGNIN:
                return 'Sign in';
            case ButtonTypes.REGISTER:
                return 'Register';
            case ButtonTypes.SUBMIT:
                return 'Submit';
            case ButtonTypes.RESET:
                return 'Reset';
            default:
                return 'Click Me';
        };
    };

    const buttonText = children || determineButtonText(buttonType);


    return (
        <button
            onClick={fn}
            type={type}
            className={buttonPaths[buttonType]}
            disabled={disabled}
            data-disabled={dataDisabled}
        >
            {buttonText}
        </button>
    )
};

export default Button;