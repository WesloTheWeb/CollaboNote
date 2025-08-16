'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import LoginInput from './LoginInput';
import classes from './LoginRegister.module.scss';
import Button from '@/components/Button/Button';
import { ButtonTypes } from '@/interfaces';
import Banner from '@/components/Banners/Banners';

const { loginContainer } = classes;

const LoginRegister = () => {
    const [showDbError, setShowDbError] = useState(false);

    const handleGuestLogin = async () => {
        try {
            // Check database status FIRST
            const healthCheck = await fetch('/api/health-check');

            if (!healthCheck.ok) {
                // Database is down, show alert
                setShowDbError(true);
                return;
            }

            // Database is up, proceed with guest login
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
            // If any error (including network), show database error
            setShowDbError(true);
        }
    };

    return (
        <section className={loginContainer}>
            {showDbError && (
                <Banner
                    type="error"
                    variant="static"
                    message="Database connection unavailable. Please contact admin to bring the site back online."
                />
            )}
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