'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import FormBuilder from '../FormBuilder/FormBuilder';
import Toast from '../Notifications/ToastNotifications';
import classes from './Registration.module.scss';

type RegistrationFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    termsAccepted: boolean;
};

// More specific error types instead of any
type ApiError = string | string[];

type ApiResponse = {
    success: boolean;
    user?: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        createdAt: string;
    };
    message?: string;
    errors?: Record<string, ApiError>;
};

const Registration = () => {
    const router = useRouter();
    const {
        registrationContainer,
        formSection,
        label,
        input,
        errorMessage,
        checkbox,
        formActions,
        submitButton,
        successMessage,
        errorAlert
    } = classes;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiResponse, setApiResponse] = useState<{
        success?: boolean;
        message?: string;
    } | null>(null);
    const [showToast, setShowToast] = useState(false);

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

    const { watch, setError, reset } = formMethods;

    const onSubmit = async (data: RegistrationFormValues) => {
        try {
            setIsSubmitting(true);
            setApiResponse(null);
            
            console.log('Submitting registration data:', data);
            
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            console.log('Response status:', response.status);
            
            // Handle non-JSON responses
            const responseText = await response.text();
            console.log('Response text:', responseText);
            
            let result: ApiResponse;
            try {
                result = JSON.parse(responseText);
                console.log('Parsed result:', result);
            } catch (parseError) {
                console.error('Error parsing JSON response:', parseError);
                throw new Error('Invalid response format from server');
            }

            if (result.success) {
                // Registration succeeded
                console.log('Registration succeeded:', result);
                setApiResponse({
                    success: true,
                    message: 'Registration successful! You can now log in.'
                });
                setShowToast(true);
                reset();
                // Redirect to homepage after a short delay
                setTimeout(() => {
                    router.push('/');
                }, 2000);
            } else {
                // Registration failed
                console.log('Registration failed:', result);
                if (result.errors) {
                    // Set form errors based on API response
                    Object.entries(result.errors).forEach(([field, error]) => {
                        if (field !== 'confirmPassword' && field !== 'termsAccepted') {
                            setError(field as keyof RegistrationFormValues, {
                                type: 'server',
                                message: Array.isArray(error) ? error[0] : error.toString()
                            });
                        }
                    });
                }
                
                setApiResponse({
                    success: false,
                    message: result.message || 'Registration failed. Please try again.'
                });
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setApiResponse({
                success: false,
                message: 'An error occurred. Please try again later.'
            });
        } finally {
            setIsSubmitting(false);
        }
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
        <button 
            className={submitButton} 
            type="submit"
            disabled={isSubmitting}
        >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
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
            
            {apiResponse && !showToast && (
                <div className={apiResponse.success ? successMessage : errorAlert} role="alert">
                    {apiResponse.message}
                </div>
            )}
            
            {showToast && (
                <Toast
                    type="success"
                    header="Success"
                    message="Account created successfully! Redirecting to homepage..."
                    duration={5000}
                    onClose={() => setShowToast(false)}
                />
            )}
            
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