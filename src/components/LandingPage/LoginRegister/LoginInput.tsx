'use client';

import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import FormBuilder from '@/components/FormBuilder/FormBuilder';
import { loginRegisterConfig } from "@/config";
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

    const router = useRouter();

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
                router.push('/');
                router.refresh();
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

export default LoginInput;