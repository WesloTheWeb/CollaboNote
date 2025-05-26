'use client'

import { SessionProvider } from 'next-auth/react'

export default function SessionStoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <SessionProvider>{children}</SessionProvider>
}