import { FormField } from '@/interfaces';

export const getRegistrationFormFields = (
    watchedPassword: string, 
    checkboxClassName: string
): FormField[] => [
    {
        name: 'firstName',
        label: 'First Name',
        type: 'text' as const,
        validation: {
            required: 'First name is required',
            minLength: {
                value: 2,
                message: 'First name must be at least 2 characters'
            }
        }
    },
    {
        name: 'lastName',
        label: 'Last Name',
        type: 'text' as const,
        validation: {
            required: 'Last name is required',
            minLength: {
                value: 2,
                message: 'Last name must be at least 2 characters'
            }
        }
    },
    {
        name: 'email',
        label: 'Email Address',
        type: 'email' as const,
        validation: {
            required: 'Email is required',
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
            }
        }
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password' as const,
        validation: {
            required: 'Password is required',
            minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
            },
            pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                message: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
            }
        }
    },
    {
        name: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password' as const,
        validation: {
            required: 'Please confirm your password',
            validate: (value: string) =>
                value === watchedPassword || 'Passwords do not match'
        }
    },
    {
        name: 'termsAccepted',
        label: 'I agree to the Terms and Conditions',
        type: 'checkbox' as const,
        validation: {
            required: 'You must accept the terms and conditions'
        },
        customProps: {
            className: checkboxClassName
        }
    }
];