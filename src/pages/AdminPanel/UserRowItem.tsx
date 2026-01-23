import { Controller } from 'react-hook-form'
import { UsersAPI } from '../../api/users.api'
import { type User } from '../../shared/interfaces/User'
import { showToast } from '../../shared/ui/toast'

type Props = {
    index: number
    user: User
    control: any
    setError: any
    clearErrors: any
}

export function UserRowItem({
    index,
    user,
    control,
    setError,
    clearErrors,
}: Props) {
    return (
        <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>

            {/* ROLE */}
            <td>
                <Controller
                    control={control}
                    name={`users.${index}.role`}
                    render={({ field, fieldState }) => (
                        <>
                            <select
                                {...field}
                                onChange={async (e) => {
                                    const value = e.target.value as 'ADMIN' | 'USER'
                                    field.onChange(value)

                                    try {
                                        await UsersAPI.updateRole(user._id, value)
                                        showToast.success('Role has chanched')
                                        clearErrors(`users.${index}.role`)
                                    } catch (err: any) {
                                        setError(`users.${index}.role`, {
                                            message: err?.response?.data?.message || 'Ошибка смены роли',
                                        })
                                        showToast.error(err?.response?.data?.message || 'Role has not chanched')
                                    }
                                }}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>

                            {fieldState.error && (
                                <p className="error">{fieldState.error.message}</p>
                            )}
                        </>
                    )}
                />
            </td>

            {/* ACTIVE */}
            <td>
                <Controller
                    control={control}
                    name={`users.${index}.isActive`}
                    render={({ field, fieldState }) => (
                        <>
                            <label className="flex flex-row align-items-center checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={field.value}
                                    className="form-control"
                                    onChange={async (e) => {
                                        const value = e.target.checked
                                        field.onChange(value)

                                        try {
                                            await UsersAPI.updateActive(user._id, value)
                                            clearErrors(`users.${index}.isActive`)
                                            showToast.success('Visibility has chanched')
                                        } catch (err: any) {
                                            setError(`users.${index}.isActive`, {
                                                message:
                                                    err?.response?.data?.message ||
                                                    'Ошибка изменения статуса',
                                            })
                                            showToast.error(err?.response?.data?.message || 'Visibility has not chanched')
                                        }
                                    }}
                                />
                                <div className="custom-checkbox mr-2"></div>
                            </label>


                            {fieldState.error && (
                                <p className="error">{fieldState.error.message}</p>
                            )}
                        </>
                    )}
                />
            </td>
        </tr>
    )
}
