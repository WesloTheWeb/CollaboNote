// Make sure these match the exact CSS class name
export enum ButtonTypes {
    SIGNIN = 'signInButton',
    GUESTSIGNIN = 'guestSignInButton',
    LOGOUT = 'logoutButton',
    REGISTER = 'registerButton',
    SUBMIT = 'submitButton',
    RESET = 'resetActionButton',
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
