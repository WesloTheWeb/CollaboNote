'use client';

import { signIn } from 'next-auth/react';
import LoginInput from './LoginInput';
import classes from './LoginRegister.module.scss';
import Button from '@/components/Button/Button';
import { ButtonTypes } from '@/interfaces';

const { loginContainer } = classes;

const LoginRegister = () => {

    const handleGuestLogin = async () => {
        try {
            const response = await fetch('/api/guest-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message);
            };

            // Use credentials from API to sign in (match LoginInput pattern)
            await signIn('credentials', {
                email: data.credentials.email,
                password: data.credentials.password,
                callbackUrl: '/',
                redirect: true, // Let NextAuth handle redirect like regular login
            });
        } catch (error) {
            console.error('Guest login error:', error);
        }
    };

    return (
        <section className={loginContainer}>
            <h6>Login or Register</h6>
            <LoginInput />
            <div style={{ margin: '1rem 0', textAlign: 'center' }}>
                <span>or</span>
            </div>
            <Button 
                buttonType={ButtonTypes.GUESTSIGNIN}
                fn={handleGuestLogin}
            />
        </section>
    );
};

export default LoginRegister;