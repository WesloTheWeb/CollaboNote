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

export const dashboardMenuConfig = [
    {
        sectionName: 'Main',
        items: [
            {
                dashboardMenuLinkName: 'Dashboard',
                dashboardPath: '/',
                icon: Home,
                implemented: true
            },
            {
                dashboardMenuLinkName: 'My Goals',
                dashboardPath: '/goals',
                icon: Target,
                implemented: false
            },
            {
                dashboardMenuLinkName: 'Journal',
                dashboardPath: '/journal',
                icon: BookOpen,
                implemented: false
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
                implemented: false
            },
            {
                dashboardMenuLinkName: 'Discussions',
                dashboardPath: '/discussions',
                icon: MessageCircle,
                implemented: false
            },
            {
                dashboardMenuLinkName: 'Achievements',
                dashboardPath: '/achievements',
                icon: Trophy,
                implemented: false
            }
        ]
    },
    {
        sectionName: 'Tools',
        items: [
            {
                dashboardMenuLinkName: 'Calendar',
                dashboardPath: '/calendar',
                icon: Calendar,
                implemented: false
            },
            {
                dashboardMenuLinkName: 'Analytics',
                dashboardPath: '/analytics',
                icon: BarChart3,
                implemented: false
            },
            {
                dashboardMenuLinkName: 'Notifications',
                dashboardPath: '/notifications',
                icon: Bell,
                implemented: false
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
                implemented: true
            }
        ]
    }
];