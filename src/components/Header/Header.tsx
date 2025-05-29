'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { navigationHeaderConfig as navigationHeader } from '@/config';
import MobileNav from './MobileNavHeader/MobileNav';
import classes from './Header.module.scss';

const { siteHeader, desktopNav, mobileNavToggle, hamburger, open, logoutButton } = classes;

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { data: session } = useSession();
    const queryClient = useQueryClient();
    const router = useRouter();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            
            // Sign out with NextAuth
            await signOut({ redirect: false });
            
            // Clear React Query cache
            queryClient.clear();
            
            // Navigate to home page
            router.push('/');
            router.refresh();
            
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    const isAuthenticated = !!session?.user;

    return (
        <header className={siteHeader}>
            <h1>
                <Link href="/">
                    CollaboNote
                </Link>
            </h1>

            <nav className={desktopNav}>
                {navigationHeader.map((nav) => (
                    <Link
                        key={nav.navigation}
                        href={nav.path}>
                        {nav.navigation}
                    </Link>
                ))}

                {isAuthenticated && (
                    <button
                        onClick={handleLogout}
                        type="button"
                        aria-label="Logout"
                        className={logoutButton}
                        disabled={isLoggingOut}
                    >
                        {isLoggingOut ? 'Logging out...' : 'Logout'}
                    </button>
                )}
            </nav>

            <button
                className={mobileNavToggle}
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
            >
                <div className={`${hamburger} ${isMenuOpen ? open : ''}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>

            <MobileNav
                isOpen={isMenuOpen}
                toggleMenu={toggleMenu}
            />
        </header>
    );
};

export default Header;