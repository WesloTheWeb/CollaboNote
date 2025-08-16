'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import LoginInput from './LoginInput';
import Button from '@/components/Button/Button';
import { ButtonTypes } from '@/interfaces';
import Banner from '@/components/Banners/Banners';
import Toast from '@/components/Notifications/ToastNotifications';

import classes from './LoginRegister.module.scss';

const { loginContainer } = classes;

const LoginRegister = () => {
    const [showDbError, setShowDbError] = useState(false);

    const handleGuestLogin = async () => {
        try {
            // Check database status FIRST
            const healthCheck = await fetch('/api/health-check');
            
            if (!healthCheck.ok) {
                // Database is down, show error
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
            // Only show database error if it's specifically a database connection issue
            if (error instanceof TypeError && error.message.includes('fetch')) {
                // Network error - might be database issue, show database error
                setShowDbError(true);
            } else {
                // Other types of errors (like API errors) - don't show database error
                console.error('Guest login failed:', error);
                // You could add a separate error state for guest login failures if needed
            }
        }
    };

    return (
        <section className={loginContainer}>
            {showDbError && (
                <Toast
                    type="warning"
                    header="Database Connection Error"
                    message="CollaboNote uses a Supabase database, and the free tier often resets after inactivity. Please contact admin to bring the site back online."
                    duration={10000}
                    onClose={() => setShowDbError(false)}
                />
            )}
            <h6>Login or Register</h6>
            <LoginInput 
                showDbError={showDbError} 
                setShowDbError={setShowDbError} 
            />
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