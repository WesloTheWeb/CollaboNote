'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Lock, ChevronDown, ChevronUp, LogOut } from 'lucide-react';
import { navigationHeaderConfig as navigationHeader, dashboardMenuConfig } from '@/config';
import { getUserInitials } from '@/utils/getUserInitials';
import classes from './MobileNav.module.scss';

type MobileNavProps = {
    isOpen: boolean;
    toggleMenu: () => void;
};

const MobileNav = ({ isOpen, toggleMenu }: MobileNavProps) => {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const handleLogout = async () => {
        toggleMenu();
        await signOut({ callbackUrl: '/' });
    };

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const renderUserProfile = () => (
        <div className={classes.mobileUserProfile}>
            <button
                onClick={toggleProfileDropdown}
                className={classes.mobileProfileButton}
                type="button"
                aria-expanded={isProfileDropdownOpen}
                aria-label="Toggle user menu"
            >
                <div className={classes.mobileProfileInfo}>
                    <div className={classes.mobileProfileAvatar}>
                        {getUserInitials(session?.user?.name)}
                    </div>
                    <div className={classes.mobileProfileDetails}>
                        <div className={classes.mobileProfileName}>
                            {session?.user?.name || 'Guest User'}
                        </div>
                        <div className={classes.mobileProfileRole}>Goal Achiever</div>
                    </div>
                    <div className={classes.mobileProfileChevron}>
                        {isProfileDropdownOpen ? (
                            <ChevronUp size={16} />
                        ) : (
                            <ChevronDown size={16} />
                        )}
                    </div>
                </div>
            </button>
            
            {isProfileDropdownOpen && (
                <div className={classes.mobileProfileDropdown}>
                    <button
                        onClick={handleLogout}
                        type="button"
                        className={classes.mobileLogoutOption}
                    >
                        <LogOut size={16} className={classes.mobileLogoutIcon} />
                        <span>Logout</span>
                    </button>
                </div>
            )}
        </div>
    );

    const renderDashboardSection = (section: typeof dashboardMenuConfig[0]) => (
        <div key={section.sectionName} className={classes.mobileMenuSection}>
            <h3 className={classes.mobileSectionTitle}>{section.sectionName}</h3>
            {section.items.map(({ dashboardMenuLinkName, dashboardPath, icon: IconComponent, featureImplemented }) => {
                const isActive = pathname === dashboardPath;
                const linkClassName = [
                    classes.mobileDashboardLink,
                    isActive && classes.active,
                    !featureImplemented && classes.locked
                ].filter(Boolean).join(' ');

                const linkContent = (
                    <>
                        <IconComponent className={classes.mobileMenuIcon} />
                        <span>{dashboardMenuLinkName}</span>
                        {!featureImplemented && (
                            <Lock className={classes.mobileLockIcon} />
                        )}
                    </>
                );

                return featureImplemented ? (
                    <Link
                        key={dashboardMenuLinkName}
                        href={dashboardPath}
                        onClick={toggleMenu}
                        className={linkClassName}
                    >
                        {linkContent}
                    </Link>
                ) : (
                    <div
                        key={dashboardMenuLinkName}
                        className={linkClassName}
                    >
                        {linkContent}
                    </div>
                );
            })}
        </div>
    );

    const renderRegularNavigation = () => {
        const filteredNavigation = navigationHeader.filter(nav =>
            !(isAuthenticated && nav.path === '/registration')
        );

        return (
            <>
                {filteredNavigation.map((nav) => (
                    <Link
                        key={nav.navigation}
                        href={nav.path}
                        onClick={toggleMenu}
                    >
                        {nav.navigation}
                    </Link>
                ))}
            </>
        )
    };

    const renderDashboardNavigation = () => (
        <>
            {renderUserProfile()}
            {dashboardMenuConfig.map(renderDashboardSection)}
        </>
    );

    const isAuthenticated = status === 'authenticated' && session;
    const overlayClassName = `${classes.overlay} ${isOpen ? classes.active : ''}`;
    const menuClassName = `${classes.mobileNavMenu} ${isOpen ? classes.active : ''}`;

    return (
        <>
            <div
                className={overlayClassName}
                onClick={toggleMenu}
                aria-hidden="true"
            />
            <nav className={menuClassName}>
                {isAuthenticated ? renderDashboardNavigation() : renderRegularNavigation()}
            </nav>
        </>
    );
};

export default MobileNav;