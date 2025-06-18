import {
    Home,
    Target,
    BookOpen,
    Users,
    Calendar,
    BarChart3,
    Settings,
    Bell,
    Trophy,
    MessageCircle
} from 'lucide-react';

// TODO: Consolidate these types in different file.
export type UserRole = 'guest' | 'user' | 'admin';
export type AccountTier = 'free' | 'basic' | 'pro';
export type GuestAccess = 'full' | 'read-only' | 'hidden';

export interface MenuItemAccess {
    roles?: UserRole[]; // Which roles can see this item (undefined = all roles)
    tiers?: AccountTier[]; // Which tiers can access (undefined = all tiers)
    guestAccess?: GuestAccess; // Special guest restrictions (default: 'full')
    requiresUpgrade?: boolean; // Show upgrade prompt if user lacks access
}

export interface MenuItem {
    dashboardMenuLinkName: string;
    dashboardPath: string;
    icon: any;
    featureImplemented: boolean;
    access?: MenuItemAccess; // Optional - defaults to full access
}

export interface MenuSection {
    sectionName: string;
    items: MenuItem[];
}

export const dashboardMenuConfig: MenuSection[] = [
    {
        sectionName: 'Main',
        items: [
            {
                dashboardMenuLinkName: 'Dashboard',
                dashboardPath: '/',
                icon: Home,
                featureImplemented: true,
                // No access restrictions - everyone can see dashboard
            },
            {
                dashboardMenuLinkName: 'My Goals',
                dashboardPath: '/goals',
                icon: Target,
                featureImplemented: true,
                access: {
                    guestAccess: 'read-only', // Guests can view but not create/edit
                    requiresUpgrade: true // Show upgrade prompt for free tier limits
                }
            },
                 {
                dashboardMenuLinkName: 'Calendar',
                dashboardPath: '/calendar',
                icon: Calendar,
                featureImplemented: false,
                access: {
                    roles: ['user'], // Personal calendar requires account
                    guestAccess: 'hidden'
                }
            },
            {
                dashboardMenuLinkName: 'Journal',
                dashboardPath: '/journal',
                icon: BookOpen,
                featureImplemented: false,
                access: {
                    roles: ['user'], // Only registered users, not guests
                    requiresUpgrade: true
                }
            }
        ]
    },
    {
        sectionName: 'Community',
        items: [
            {
                dashboardMenuLinkName: 'Collaborators',
                dashboardPath: '/collaborators',
                icon: Users,
                featureImplemented: false,
                access: {
                    roles: ['user'], // Community features require account
                    tiers: ['basic', 'pro'], // Premium feature
                    guestAccess: 'hidden'
                }
            },
            {
                dashboardMenuLinkName: 'Discussions',
                dashboardPath: '/discussions',
                icon: MessageCircle,
                featureImplemented: false,
                access: {
                    guestAccess: 'read-only' // Guests can read discussions
                }
            },
            {
                dashboardMenuLinkName: 'Achievements',
                dashboardPath: '/achievements',
                icon: Trophy,
                featureImplemented: false,
                access: {
                    guestAccess: 'read-only' // Show public achievements
                }
            }
        ]
    },
    {
        sectionName: 'Account',
        items: [
            {
                dashboardMenuLinkName: 'Settings',
                dashboardPath: '/settings',
                icon: Settings,
                featureImplemented: true,
                access: {
                    guestAccess: 'read-only' // Guests can see settings form but not save
                }
            }
        ]
    }
];