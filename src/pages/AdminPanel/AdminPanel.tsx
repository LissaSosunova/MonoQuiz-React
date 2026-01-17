import { useEffect, useState } from 'react'
import { UsersAPI } from '../../api/users.api'
import {type User} from '../../shared/interfaces/User'

export default function AdminPanel() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const res = await UsersAPI.getAll()
                setUsers(res.data)
            } catch (err: any) {
                setError(
                    err?.response?.data?.message ||
                    'Failed to load users'
                )
            } finally {
                setLoading(false)
            }
        }

        loadUsers()
    }, [])

    if (loading) return <p>Loading users...</p>
    if (error) return <p className="error">{error}</p>

    return (
        <div className="admin-panel">
            <h2>Users</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                {user.isActive ? 'Active' : 'Disabled'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
