'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import FormBuilder from '../FormBuilder/FormBuilder';
import Toast from '../Notifications/ToastNotifications';
import { RegistrationApiResponse, RegistrationFormValues } from '@/interfaces';
import { getRegistrationFormFields } from '@/config';
import classes from './Registration.module.scss';

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

const Registration = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiResponse, setApiResponse] = useState<{
        success?: boolean;
        message?: string;
    } | null>(null);
    const [showToast, setShowToast] = useState(false);

    const formClassNames = {
        formContainer: registrationContainer,
        fieldContainer: formSection,
        label: label,
        input: input,
        errorMessage: errorMessage,
        formActions: formActions
    };

    const formMethods = useForm<RegistrationFormValues>({
        mode: 'onBlur',
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
    const password = watch('password');

    // Get form fields using config function
    const fields = getRegistrationFormFields(password, checkbox);

    const onSubmit = async (data: RegistrationFormValues) => {
        try {
            setIsSubmitting(true);
            setApiResponse(null);

            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseText = await response.text();

            let result: RegistrationApiResponse;
            try {
                result = JSON.parse(responseText);
            } catch (parseError) {
                console.error('Error parsing JSON response:', parseError);
                throw new Error('Invalid response format from server');
            }

            if (result.success) {
                setApiResponse({
                    success: true,
                    message: 'Registration successful! You can now log in.'
                });
                setShowToast(true);
                reset();
                setTimeout(() => {
                    router.push('/');
                }, 2000);
            } else {
                if (result.errors) {
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

    const registerButton = (
        <button
            className={submitButton}
            type="submit"
            disabled={isSubmitting}
        >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>
    );

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
                    duration={3000}
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