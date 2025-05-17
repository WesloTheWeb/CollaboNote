'use client';

import { useForm } from "react-hook-form";
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

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

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
            fields={loginRegisterConfig}
            formMethods={formMethods}
            onSubmit={onSubmit}
            classNames={formClassNames}
            customButtons={customLoginButton}
        />
    );
};

export default LoginInput;