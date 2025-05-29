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

const { formSection, errorMessage, submitButton } = classes;

const LoginInput = () => {
    const formMethods = useForm<FormValues>();
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);
        setLoginError('');

        try {
            // Let NextAuth handle the redirect - this eliminates flicker
            const result = await signIn('credentials', {
                email: data.email,
                password: data.password,
                callbackUrl: '/', // Redirect here after successful login
                redirect: true,   // Let NextAuth handle the redirect
            });

            // This code won't run if redirect: true, but keep for error handling
            if (result?.error) {
                setLoginError('Invalid email or password');
                setIsLoading(false);
            }
        } catch (error) {
            setLoginError('An unexpected error occurred');
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