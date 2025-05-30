'use client'

import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

interface SessionStoreProviderProps {
  children: React.ReactNode
  session?: Session | null
};

export default function SessionStoreProvider({
  children,
  session
}: SessionStoreProviderProps) {

  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
};

// TODO: Now that I have session prop wrapped at the highest level, I need to do inventory of
// TODO: child components to use this context.