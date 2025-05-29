'use client';

import { useQuery } from '@tanstack/react-query';
import { getSession } from 'next-auth/react';
import { DashboardProps } from "@/interfaces";
import classes from './MainContent.module.scss';

const { mainContentContainer } = classes;

const MainContent = ({ loggedUser }: DashboardProps) => {
    const { data: session } = useQuery({
        queryKey: ['session'],
        queryFn: () => getSession(),
        refetchOnWindowFocus: true,
        staleTime: 0, // Always refetch to get latest user data
    });

    // Use the fresh session data if available, fallback to prop
    const displayName = session?.user?.name || loggedUser || 'User';

    return (
        <section className={mainContentContainer}>
            <div>
                <h2>Dashboard Feed</h2>
                <h5>
                    Welcome, <b>{displayName}</b>
                </h5>
                <p>
                    I am still working on the design. But logging in and out, and making an account is secure and implemented.
                </p>
            </div>
        </section>
    );
};

export default MainContent;