// Make sure these match the exact CSS class name
export enum ButtonTypes {
    SIGNIN = 'signInButton',
    REGISTER = 'registerButton',
    SUBMIT = 'submitButton',
    RESET = 'resetButton',
    DEFAULT = 'button' 
};

export interface ButtonProps {
    fn: () => void;
    buttonType?: ButtonTypes;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    'data-disabled'?: boolean;
    children?: React.ReactNode;
};

export type ButtonPathsKey = ButtonTypes;
