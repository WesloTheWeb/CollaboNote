'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import classes from './LoginRegister.module.scss';

type FormValues = {
    email: string;
    password: string;
};

const { formSection, errorMessage, submitButton } = classes;

const LoginInput = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = data => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <section className={formSection}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                        }
                    })}
                    aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && <p className={errorMessage} role="alert">{errors.email.message}</p>}
            </section>
            <section className={formSection}>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    {...register("password", {
                        required: "Password is required"
                    })}
                    aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password && <p className={errorMessage} role="alert">{errors.password.message}</p>}
            </section>

            <button
                className={submitButton}
                type="submit"
                disabled
            >
                Sign In
            </button>
        </form>
    );
};

export default LoginInput;