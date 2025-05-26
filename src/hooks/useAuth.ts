'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
    const { data: session, status, update } = useSession();
    const queryClient = useQueryClient();
    const router = useRouter();

    // Logout mutation with React Query
    const logoutMutation = useMutation({
        mutationFn: async () => {
            await signOut({ redirect: false })
        },
        onSuccess: () => {
            // Force session update and page refresh
            update()
            router.push('/')
            router.refresh()
            queryClient.invalidateQueries()
        },
    });

    return {
        session,
        status,
        isAuthenticated: status === 'authenticated',
        logout: logoutMutation.mutate,
        isLoggingOut: logoutMutation.isPending,
    };
};