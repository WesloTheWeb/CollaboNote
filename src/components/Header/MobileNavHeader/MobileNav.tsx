'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { navigationHeaderConfig as navigationHeader } from '@/config';
import classes from '../Header.module.scss';

type MobileNavProps = {
    isOpen: boolean;
    toggleMenu: () => void;
};

const MobileNav = ({ isOpen, toggleMenu }: MobileNavProps) => {
    const { data: session, status } = useSession();

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const handleLogout = async () => {
        toggleMenu(); // Close menu first
        await signOut({ callbackUrl: '/' });
    };

    return (
        <>
            <div
                className={`${classes.overlay} ${isOpen ? classes.active : ''}`}
                onClick={toggleMenu}
                aria-hidden="true"
            />
            <nav className={`${classes.mobileNavMenu} ${isOpen ? classes.active : ''}`}>
                {navigationHeader.map((nav) => (
                    <Link
                        key={nav.navigation}
                        href={nav.path}
                        onClick={toggleMenu}
                    >
                        {nav.navigation}
                    </Link>
                ))}

                {status === 'authenticated' && session && (
                    <button
                        onClick={handleLogout}
                        type="button"
                        aria-label="Logout"
                        className={classes.logoutButton}
                    >
                        Logout
                    </button>
                )}
            </nav>
        </>
    );
};

export default MobileNav;