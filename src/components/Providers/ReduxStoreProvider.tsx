'use client'

import { Provider } from 'react-redux'
import { makeStore } from '@/redux/store'

const store = makeStore()

export default function ReduxStoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <Provider store={store}>{children}</Provider>
};