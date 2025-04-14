import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import Chance from 'chance';
import { ButtonTypes } from '@/interfaces';
import Button from '@/components/Button/Button';

const chance = new Chance();
const handleClick = jest.fn();

describe('Button Component', () => {
    it('should renders button with correct text', () => {
        const mockHandleClick = jest.fn();

        render(<Button fn={mockHandleClick} />);
        const buttonElement = screen.getByText(/click me/i);
        expect(buttonElement).toBeInTheDocument();
    });

    it('should handles click event', () => {
        render(<Button fn={handleClick} />);

        const buttonElement = screen.getByText(/click me/i);
        fireEvent.click(buttonElement);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders each button type with correct classes', () => {
        const buttonTypesMap = {
            [ButtonTypes.SIGNIN]: 'signInButton',
            [ButtonTypes.REGISTER]: 'registerButton',
            [ButtonTypes.SUBMIT]: 'submitButton',
            [ButtonTypes.RESET]: 'resetButton',
            [ButtonTypes.DEFAULT]: 'button'
        };

        Object.entries(buttonTypesMap).forEach(([buttonType, expectedClass]) => {
            cleanup();

            // Render button with current type
            render(<Button buttonType={buttonType as ButtonTypes} fn={handleClick} />);

            // Find button element - use the expected text based on the button type
            let buttonText;
            switch (buttonType) {
                case ButtonTypes.SIGNIN:
                    buttonText = 'Sign in';
                    break;
                case ButtonTypes.REGISTER:
                    buttonText = 'Register';
                    break;
                case ButtonTypes.SUBMIT:
                    buttonText = 'Submit';
                    break;
                case ButtonTypes.RESET:
                    buttonText = 'Reset';
                    break;
                default:
                    buttonText = 'Click Me';
            };

            const buttonElement = screen.getByText(buttonText);

            expect(buttonElement).toHaveClass(expectedClass);
        });
    });
});
