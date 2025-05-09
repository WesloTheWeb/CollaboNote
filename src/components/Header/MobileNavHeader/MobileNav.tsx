'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { navigationHeader } from '@/config';
import classes from '../Header.module.scss';

type MobileNavProps = {
    isOpen: boolean;
    toggleMenu: () => void;
};

const MobileNav = ({ isOpen, toggleMenu }: MobileNavProps) => {
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
                        href={nav.navigation}
                        onClick={toggleMenu}
                    >
                        {nav.navigation}
                    </Link>
                ))}
            </nav>
        </>
    );
};

export default MobileNav;