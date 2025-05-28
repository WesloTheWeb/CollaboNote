'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Lock } from 'lucide-react';
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

    // Prevent scrolling when menu is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen]);

    const handleLogout = async () => {
        toggleMenu();
        await signOut({ callbackUrl: '/' });
    };

    const renderUserProfile = () => (
        <div className={classes.mobileUserProfile}>
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
            </div>
        </div>
    );

    const renderDashboardSection = (section: typeof dashboardMenuConfig[0]) => (
        <div key={section.sectionName} className={classes.mobileMenuSection}>
            <h3 className={classes.mobileSectionTitle}>{section.sectionName}</h3>
            {section.items.map(({ dashboardMenuLinkName, dashboardPath, icon: IconComponent, implemented }) => {
                const isActive = pathname === dashboardPath;
                const linkClassName = [
                    classes.mobileDashboardLink,
                    isActive && classes.active,
                    !implemented && classes.locked
                ].filter(Boolean).join(' ');

                const linkContent = (
                    <>
                        <IconComponent className={classes.mobileMenuIcon} />
                        <span>{dashboardMenuLinkName}</span>
                        {!implemented && (
                            <Lock className={classes.mobileLockIcon} />
                        )}
                    </>
                );

                return implemented ? (
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

    const renderLogoutButton = () => (
        <button
            onClick={handleLogout}
            type="button"
            aria-label="Logout"
            className={classes.logoutButton}
        >
            Logout
        </button>
    );

    const renderRegularNavigation = () => (
        <>
            {navigationHeader.map((nav) => (
                <Link
                    key={nav.navigation}
                    href={nav.path}
                    onClick={toggleMenu}
                >
                    {nav.navigation}
                </Link>
            ))}
        </>
    );

    const renderDashboardNavigation = () => (
        <>
            {renderUserProfile()}
            {dashboardMenuConfig.map(renderDashboardSection)}
            {renderLogoutButton()}
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