'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { navigationHeaderConfig as navigationHeader } from '@/config';
import MobileNav from './MobileNavHeader/MobileNav';
import classes from './Header.module.scss';
import Button from '../Button/Button';
import { ButtonTypes } from '@/interfaces';

const { siteHeader, desktopNav, mobileNavToggle, hamburger, open } = classes;

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session } = useSession();
    const queryClient = useQueryClient();
    const router = useRouter();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = async () => {
        try {
            // Sign out with NextAuth
            await signOut({ redirect: false });

            // Clear React Query cache
            queryClient.clear();

            router.push('/');
            router.refresh();

        } catch (error) {
            console.error('Logout error:', error);
        } 
    };

    const isAuthenticated = !!session?.user;
    const filteredNavigation = navigationHeader.filter(nav =>
        !(isAuthenticated && nav.path === '/registration')
    );

    return (
        <header className={siteHeader}>
            <h1>
                <Link href="/">
                    CollaboNote
                </Link>
            </h1>
            <nav className={desktopNav}>
                {filteredNavigation.map((nav) => (
                    <Link
                        key={nav.navigation}
                        href={nav.path}>
                        {nav.navigation}
                    </Link>
                ))}
                {isAuthenticated && (
                    <Button 
                        fn={handleLogout}
                        buttonType={ButtonTypes.LOGOUT}
                    />
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