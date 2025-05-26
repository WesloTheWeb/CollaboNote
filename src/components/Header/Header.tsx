'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { navigationHeaderConfig as navigationHeader } from '@/config';
import MobileNav from './MobileNavHeader/MobileNav';
import classes from './Header.module.scss';

const { siteHeader, desktopNav, mobileNavToggle, hamburger, open, logoutButton } = classes;

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, session, logout, isLoggingOut } = useAuth();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        logout();
    };

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

                {isAuthenticated && session && (
                    <button
                        onClick={handleLogout}
                        type="button"
                        aria-label="Logout"
                        className={logoutButton}
                        disabled={isLoggingOut}
                    >
                        Logout
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