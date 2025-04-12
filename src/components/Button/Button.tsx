import { ButtonProps, ButtonTypes, ButtonPathsKey } from '@/interfaces';
import classes from './Button.module.scss';

const { registerButton, signInButton, submitButton, resetButton } = classes;

const buttonPaths: Record<ButtonPathsKey, string> = {
    [ButtonTypes.SIGNIN]: signInButton,
    [ButtonTypes.REGISTER]: registerButton,
    [ButtonTypes.SUBMIT]: submitButton,
    [ButtonTypes.RESET]: resetButton,
    [ButtonTypes.DEFAULT]: classes.button
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

    const buttonText = children ?? (buttonType ? determineButtonText(buttonType) : 'Click Me');
    const buttonClassName = buttonType ? buttonPaths[buttonType] : buttonPaths[ButtonTypes.DEFAULT];

    return (
        <button
            onClick={fn}
            type={type}
            className={buttonClassName}
            disabled={disabled}
            data-disabled={dataDisabled}
        >
            {buttonText}
        </button>
    )
};

export default Button;