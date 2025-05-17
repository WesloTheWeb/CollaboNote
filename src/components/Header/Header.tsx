'use client';

import { useState } from 'react';
import Link from 'next/link';
import { navigationHeaderConfig as navigationHeader} from '@/config';
import MobileNav from './MobileNavHeader/MobileNav';
import classes from './Header.module.scss';

const { siteHeader, desktopNav, mobileNavToggle, hamburger, open } = classes;

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
            
            <MobileNav isOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </header>
    );
};

export default Header;