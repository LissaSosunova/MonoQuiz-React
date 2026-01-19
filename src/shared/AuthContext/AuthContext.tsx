import { createContext, useContext, useEffect, useState } from 'react'
import { UsersAPI } from '../../api/users.api'
import { type User } from '../../shared/interfaces/User'


interface AuthContextType {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }

    UsersAPI.getUser()
      .then(res => setUser(res.data))
      .catch(() => {
        localStorage.removeItem('token')
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
