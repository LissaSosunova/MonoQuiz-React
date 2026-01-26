import { Navigate } from 'react-router-dom'
import { type ReactNode } from 'react'
import { useAuth } from '../shared/AuthContext/AuthContext'

interface Props {
  children: ReactNode
}

export default function AdminGuard({ children }: Props) {
     const { user } = useAuth();

  if (!user || user!.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}
