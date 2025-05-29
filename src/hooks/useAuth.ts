// hooks/useAuth.ts
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSession, signIn, signOut } from 'next-auth/react';

export const useAuth = () => {
  const queryClient = useQueryClient();

  // Session query
  const sessionQuery = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const session = await getSession();
      return session;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      
      if (result?.error) {
        throw new Error('Invalid email or password');
      }
      
      return result;
    },
    onSuccess: () => {
      // Invalidate session to refetch user data
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await signOut({ redirect: false });
    },
    onSuccess: () => {
      // Clear all queries when logging out
      queryClient.clear();
    },
  });

  // Helper functions
  const login = (credentials: { email: string; password: string }) => {
    return loginMutation.mutate(credentials);
  };

  const logout = () => {
    return logoutMutation.mutate();
  };

  const invalidateSession = () => {
    queryClient.invalidateQueries({ queryKey: ['session'] });
  };

  return {
    // Session data
    session: sessionQuery.data,
    isLoading: sessionQuery.isLoading,
    isError: sessionQuery.isError,
    error: sessionQuery.error,
    
    // User state
    user: sessionQuery.data?.user,
    isAuthenticated: !!sessionQuery.data?.user,
    
    // Actions
    login,
    logout,
    invalidateSession,
    
    // Mutation states
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    loginError: loginMutation.error?.message,
  };
};