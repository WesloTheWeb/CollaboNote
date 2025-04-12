import { render, screen, fireEvent } from '@testing-library/react';
import Chance from 'chance';
import { ButtonTypes } from '@/interfaces';
import Button from '@/components/Button/Button';

const chance = new Chance();

describe('Button Component', () => {
    it('should renders button with correct text', () => {
        const mockHandleClick = jest.fn();

        render(<Button fn={mockHandleClick} />);
        const buttonElement = screen.getByText(/click me/i);
        expect(buttonElement).toBeInTheDocument();
    });

    it('should handles click event', () => {
        const handleClick = jest.fn();
        render(<Button fn={handleClick} />);

        const buttonElement = screen.getByText(/click me/i);
        fireEvent.click(buttonElement);
        
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders sign in button with correct class', () => {
        render(<Button buttonType={ButtonTypes.SIGNIN} fn={() => { }} />);
        const button = screen.getByText('Sign in');
        expect(button).toHaveClass('signInButton');
    });
});