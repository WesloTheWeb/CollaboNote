'use client';

import { useState } from 'react';
import { useForm } from "react-hook-form";
import { signIn } from 'next-auth/react';
import FormBuilder from '@/components/FormBuilder/FormBuilder';
import { loginFormConfig } from "@/config";
import classes from './LoginRegister.module.scss';

type FormValues = {
    email: string;
    password: string;
};

interface LoginInputProps {
    showDbError?: boolean;
    setShowDbError?: (value: boolean) => void;
};

const { formSection, errorMessage, submitButton } = classes;

const LoginInput = ({ showDbError, setShowDbError }: LoginInputProps) => {
    const formMethods = useForm<FormValues>();
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);
        setLoginError('');
        
        // Clear any existing db error when trying again
        if (setShowDbError) {
            setShowDbError(false);
        }

        try {
            // Check database status FIRST
            const healthCheck = await fetch('/api/health-check');
            
            if (!healthCheck.ok) {
                // Database is down, show error
                if (setShowDbError) {
                    setShowDbError(true);
                }
                setIsLoading(false);
                return;
            }

            // Database is up, proceed with login
            const result = await signIn('credentials', {
                email: data.email,
                password: data.password,
                callbackUrl: '/',
                redirect: false,  // Handle errors properly
            });

            if (result?.error) {
                // This is a login error (wrong credentials), NOT a database error
                setLoginError('Invalid email or password');
                setIsLoading(false);
            } else if (result?.ok) {
                // Successful login, manually redirect
                window.location.href = result.url || '/';
            }
        } catch (error) {
            // Only show database error if it's specifically a database connection issue
            // For other network errors, show a generic error message
            console.error('Login error:', error);
            if (error instanceof TypeError && error.message.includes('fetch')) {
                // Network error - might be database issue, show database error
                if (setShowDbError) {
                    setShowDbError(true);
                }
            } else {
                // Other types of errors
                setLoginError('An unexpected error occurred');
            }
            setIsLoading(false);
        }
    };

    const customLoginButton = (
        <button
            className={submitButton}
            type="submit"
            disabled={isLoading}
        >
            {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
    );

    const formClassNames = {
        fieldContainer: formSection,
        errorMessage: errorMessage,
    };

    return (
        <div>
            {loginError && (
                <div style={{ color: 'red', marginBottom: '1rem' }}>
                    {loginError}
                </div>
            )}
            <FormBuilder
                fields={loginFormConfig}
                formMethods={formMethods}
                onSubmit={onSubmit}
                classNames={formClassNames}
                customButtons={customLoginButton}
            />
        </div>
    );
};

export default LoginInput;