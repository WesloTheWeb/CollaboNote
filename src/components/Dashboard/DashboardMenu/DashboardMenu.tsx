'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Lock } from 'lucide-react';
import { dashboardMenuConfig } from '@/config';
import { getUserInitials } from '@/utils/getUserInitials';
import classes from './DashboardMenu.module.scss';

const {
    DashboardMenuContainer,
    menuList,
    menuItem,
    menuLink,
    menuIcon,
    menuText,
    lockIcon,
    menuSection,
    sectionTitle,
    userProfile,
    profileInfo,
    profileAvatar,
    profileDetails,
    profileName,
    profileRole,
    locked
} = classes;

type DashboardMenuProps = {
    loggedUser?: string | null | undefined;
};

const DashboardMenu = ({ loggedUser }: DashboardMenuProps) => {
    const pathname = usePathname();
    console.log('loggedUser', loggedUser);

    return (
        <aside className={DashboardMenuContainer}>
            <section className={userProfile}>
                <div className={profileInfo}>
                    <div className={profileAvatar}>
                        {getUserInitials(loggedUser)}
                    </div>
                    <div className={profileDetails}>
                        <div className={profileName}>{loggedUser || 'Guest User'}</div>
                        <div className={profileRole}>Goal Achiever</div>
                    </div>
                </div>
            </section>
            <nav>
                {dashboardMenuConfig.map((section) => (
                    <section key={section.sectionName} className={menuSection}>
                        <h3 className={sectionTitle}>{section.sectionName}</h3>
                        <ul className={menuList}>
                            {section.items.map(({ dashboardMenuLinkName, dashboardPath, icon: IconComponent, implemented }) => {
                                const isActive = pathname === dashboardPath;
                                const linkClasses = [
                                    menuLink,
                                    isActive && 'active',
                                    !implemented && locked
                                ].filter(Boolean).join(' ');

                                const linkContent = (
                                    <>
                                        <IconComponent className={menuIcon} />
                                        <span className={menuText}>{dashboardMenuLinkName}</span>
                                        {!implemented && (
                                            <Lock className={lockIcon} />
                                        )}
                                    </>
                                );

                                return (
                                    <li key={dashboardMenuLinkName} className={menuItem}>
                                        {implemented ? (
                                            <Link
                                                href={dashboardPath}
                                                className={linkClasses}
                                            >
                                                {linkContent}
                                            </Link>
                                        ) : (
                                            <div className={linkClasses}>
                                                {linkContent}
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                ))}
            </nav>
        </aside>
    );
};

export default DashboardMenu;