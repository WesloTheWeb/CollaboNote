'use client';

import { useForm } from "react-hook-form";
import { signIn, SessionProvider } from 'next-auth/react';
import { useState } from 'react';
import FormBuilder from '@/components/FormBuilder/FormBuilder';
import { loginRegisterConfig } from "@/config";
import classes from './LoginRegister.module.scss';

type FormValues = {
    email: string;
    password: string;
};

const { formSection, errorMessage, submitButton } = classes;

const LoginInputComponent = () => {
    const formMethods = useForm<FormValues>();
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);
        setLoginError('');

        try {
            const result = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false, // Don't redirect automatically
            });

            if (result?.error) {
                setLoginError('Invalid email or password');
            } else {
                // TODO Login successful - redirect here
                // TODO window.location.href = '/dashboard'; // or use router.push
                console.log('Login successful!');
            }
        } catch (error) {
            setLoginError('An unexpected error occurred');
        } finally {
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
                fields={loginRegisterConfig}
                formMethods={formMethods}
                onSubmit={onSubmit}
                classNames={formClassNames}
                customButtons={customLoginButton}
            />
        </div>
    );
};

const LoginInput = () => {
    return (
        <SessionProvider>
            <LoginInputComponent />
        </SessionProvider>
    );
};

export default LoginInput;