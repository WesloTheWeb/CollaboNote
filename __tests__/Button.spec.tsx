import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/Button/Button';

describe('Button Component', () => {
    it('should renders button with correct text', () => {
        const mockHandleClick = jest.fn();

        render(<Button label="Click me" fn={mockHandleClick} />);
        const buttonElement = screen.getByText(/click me/i);
        expect(buttonElement).toBeInTheDocument();
    });

    it('should handles click event', () => {
        const handleClick = jest.fn();
        render(<Button label="Click me" fn={handleClick} />);

        const buttonElement = screen.getByText(/click me/i);
        fireEvent.click(buttonElement);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});