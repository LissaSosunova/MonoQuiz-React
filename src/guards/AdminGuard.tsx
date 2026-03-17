import { Navigate } from 'react-router-dom'
import { type ReactNode } from 'react'
import { useAuth } from '../shared/AuthContext/AuthContext'
import Spinner from '../components/spinner'

interface Props {
  children: ReactNode
}

export default function AdminGuard({ children }: Props) {
  const { user, loading } = useAuth()

  if (loading) return <div><Spinner /></div>

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
