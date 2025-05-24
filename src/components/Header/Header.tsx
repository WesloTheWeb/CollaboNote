'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { navigationHeaderConfig as navigationHeader } from '@/config';
import MobileNav from './MobileNavHeader/MobileNav';
import classes from './Header.module.scss';

const { siteHeader, desktopNav, mobileNavToggle, hamburger, open, logoutButton } = classes;

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session, status } = useSession();

    const router = useRouter();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push('/');
        router.refresh();
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

                {status === 'authenticated' && session && (
                    <button
                        onClick={handleLogout}
                        type="button"
                        aria-label="Logout"
                        className={logoutButton}
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

// TODO: Header is going to need to split into logged in Header and logged out Header
// TODO: Might can just use different config based off the authSlice or session state?