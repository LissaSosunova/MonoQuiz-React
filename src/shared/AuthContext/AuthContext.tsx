import { createContext, useContext, useEffect, useState } from 'react'
import { UsersAPI } from '../../api/users.api'
import { type User } from '../../shared/interfaces/User'
import { showToast } from '../../shared/ui/toast'


interface AuthContextType {
    user: User | null
    loading: boolean
    login: (token: string, user: User) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

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
        const login = (token: string, user: User) => {
        localStorage.setItem('token', token)
        showToast.success(`Welcome back ${user.name}`)
        console.log(`Welcome back ${user.name}`)
        setUser(user)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}
