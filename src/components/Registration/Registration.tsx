'use client';

import { useForm } from 'react-hook-form';
import FormBuilder from '../FormBuilder/FormBuilder';
import classes from './Registration.module.scss';

type RegistrationFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    termsAccepted: boolean;
};

const Registration = () => {
    const {
        registrationContainer,
        formSection,
        label,
        input,
        errorMessage,
        checkbox,
        formActions,
        submitButton
    } = classes;

    const formMethods = useForm<RegistrationFormValues>({
        mode: 'onBlur', // Validate on blur for better UX
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            termsAccepted: false,
        }
    });

    const { watch } = formMethods;

    const onSubmit = (data: RegistrationFormValues) => {
        console.log('Registration form submitted:', data);
        // TODO: hit the Register end point.
    };

    const password = watch('password');

    const fields = [
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
                    value === password || 'Passwords do not match'
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
                className: checkbox
            }
        }
    ];

    // Custom buttons
    const registerButton = (
        <button className={submitButton} type="submit">
            Create Account
        </button>
    );

    const formClassNames = {
        formContainer: registrationContainer,
        fieldContainer: formSection,
        label: label,
        input: input,
        errorMessage: errorMessage,
        formActions: formActions
    };

    return (
        <section className={registrationContainer}>
            <h2>Create an Account</h2>
            <p>Join our community of goal-setters and achievers.</p>
            <FormBuilder
                fields={fields}
                formMethods={formMethods}
                onSubmit={onSubmit}
                classNames={formClassNames}
                customButtons={registerButton}
            />
        </section>
    );
};

export default Registration;