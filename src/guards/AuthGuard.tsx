import { Navigate } from 'react-router-dom'
import { type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function AuthGuard({ children }: Props) {
  const isAuthenticated = Boolean(localStorage.getItem('token'))
  // или Zustand / Redux / Context

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}
