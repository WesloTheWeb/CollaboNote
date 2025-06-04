import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import Chance from 'chance';
import { ButtonTypes } from '@/interfaces';
import Button from '@/components/Button/Button';

const chance = new Chance();
const mockHandleClick = jest.fn();

describe('Button Component', () => {
    it('should render button with correct text', () => {

        render(<Button fn={mockHandleClick} />);
        const buttonElement = screen.getByText(/click me/i);
        expect(buttonElement).toBeInTheDocument();
    });

    it('should handles click event', () => {
        render(<Button fn={mockHandleClick} />);

        const buttonElement = screen.getByText(/click me/i);
        fireEvent.click(buttonElement);

        expect(mockHandleClick).toHaveBeenCalledTimes(1);
    });

    it('should render each button type with correct classes', () => {
        const buttonTypesMap = {
            [ButtonTypes.SIGNIN]: 'signInButton',
            [ButtonTypes.REGISTER]: 'registerButton',
            [ButtonTypes.SUBMIT]: 'submitButton',
            [ButtonTypes.RESET]: 'resetActionButton',
            [ButtonTypes.DEFAULT]: 'button'
        };

        Object.entries(buttonTypesMap).forEach(([buttonType, expectedClass]) => {
            cleanup();

            // Render button with current type
            render(<Button buttonType={buttonType as ButtonTypes} fn={mockHandleClick} />);

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

    it.todo('Should be diabled when diabled is passed')

});
