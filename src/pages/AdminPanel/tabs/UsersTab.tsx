
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { UsersAPI } from '../../../api/users.api'
import { type User } from '../../../shared/interfaces/User'
import { UserRowItem } from '../UserRowItem'


type FormData = {
  users: User[]
}

export default function UsersTab() {
  const [loading, setLoading] = useState(true)

  const {
    control,
    setError,
    clearErrors,
    watch,
  } = useForm<FormData>({
    defaultValues: { users: [] },
  })

  const { fields, replace } = useFieldArray({
    control,
    name: 'users',
  })

  // 🔹 Загрузка пользователей
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await UsersAPI.getAll()
        replace(res.data)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [replace])

  if (loading) {
    return <div>Загрузка пользователей…</div>
  }

  if (!fields.length) {
    return <div>Пользователей пока нет</div>
  }

  return (
    <div className="w-full flex justify-content-center grid pt-5 pb-5">
    <table className="admin-table lg:col-8 md:col-10 col-12 justify-content-center align-items-center">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Active</th>
        </tr>
      </thead>

      <tbody>
        {fields.map((user, index) => (
          <UserRowItem
            key={user.id}
            index={index}
            user={user}
            control={control}
            setError={setError}
            clearErrors={clearErrors}
          />
        ))}
      </tbody>
    </table>
    </div>
  )
}
