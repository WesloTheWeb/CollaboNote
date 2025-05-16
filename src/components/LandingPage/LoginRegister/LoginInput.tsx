'use client';

import { useForm } from "react-hook-form";
import FormBuilder from '@/components/FormBuilder/FormBuilder';
import classes from './LoginRegister.module.scss';

type FormValues = {
    email: string;
    password: string;
};

const { formSection, errorMessage, submitButton } = classes;

const LoginInput = () => {
    const formMethods = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    // Define form fields
    const fields = [
        {
            name: 'email',
            label: 'Email',
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
                required: 'Password is required'
            }
        }
    ];

    const customLoginButton = (
        <button
            className={submitButton}
            type="submit"
            disabled
        >
            Sign In
        </button>
    );

    const formClassNames = {
        fieldContainer: formSection,
        errorMessage: errorMessage,
    };

    return (
        <FormBuilder
            fields={fields}
            formMethods={formMethods}
            onSubmit={onSubmit}
            classNames={formClassNames}
            customButtons={customLoginButton}
        />
    );
};

export default LoginInput;