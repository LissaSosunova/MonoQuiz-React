import Spinner from './spinner'
import { type ModalProps } from '../shared/interfaces/modal-props'
import { useForm } from 'react-hook-form'
import { type LoginFormData, type RegisterFormData } from '../shared/interfaces/login-form'
import { AuthAPI } from '../api/auth.api'
import { useState } from 'react'
import { useAuth } from '../shared/AuthContext/AuthContext'
import { showToast } from '../shared/ui/toast'

type RegisterFormWithRoot = RegisterFormData & {
    root?: {
        message?: string
    }
}

export default function LoginModal({ onClose, onSuccess }: ModalProps) {
    const [tab, setTab] = useState<'login' | 'register'>('login')

    const {
        register: loginRegister,
        handleSubmit: handleLoginSubmit,
        setError: setLoginError,
        clearErrors: clearLoginErrors,
        formState: { errors: loginErrors, isSubmitting },
    } = useForm<LoginFormData & {
        root?: {
            server?: {
                message?: string
            }
        }
    }>()


    const {
        register: registerRegister,
        handleSubmit: handleRegisterSubmit,
        watch,
        setError,
        clearErrors,
        formState: { errors: registerErrors, isSubmitting: isSubmittingRegister },
    } = useForm<RegisterFormWithRoot>()

    const { login } = useAuth()
    const onLoginSubmit = async (data: LoginFormData) => {
        try {
            const response = await AuthAPI.login(data)
            login(response.data.token, response.data.user)
            onSuccess()
        } catch (error: any) {
            setLoginError('root.server', {
                message:
                    error?.response?.data?.message ||
                    'Invalid credentials',
            })
            showToast.error(error?.response?.data?.message ||
                'Invalid credentials')
        }

    }

    const onRegisterSubmit = async (data: RegisterFormData) => {
        try {
            const response = await AuthAPI.register({
                name: data.name,
                email: data.email,
                password: data.password,
                role: 'USER',
            })

            login(response.data.token, response.data.user)

            onSuccess()
        } catch (error: any) {
            setError('root.server', {
                type: 'server',
                message:
                    error?.response?.data?.message ||
                    'Пользователь уже существует',
            })
            showToast.error(error?.response?.data?.message ||
                'Пользователь уже существует')
        }
    }

    return (
        <div className="modal-backdrop">
            <div className="modal">
                {/* Login */}
                {tab === 'login' && (
                    <>
                        <h2>Login /
                            <button
                                type="button"
                                className="btn-tab primary-btn mt-3 ml-3"
                                onClick={() => setTab('register')}
                            >
                                Registration
                            </button>
                        </h2>
                        <form onSubmit={handleLoginSubmit(onLoginSubmit)}>
                            <div className="grid md:justify-content-center p-0-20">
                                <div className="col-12 ">
                                    <div className="mb-3 input-set max-w-18rem md:min-w-full col">

                                        <label className="form-label form-label1">Email</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...loginRegister('email', { required: 'Email is required' })}
                                        />
                                        {loginErrors.email && <p className="error error-form">{loginErrors.email.message}</p>}
                                    </div>
                                    <div className="mb-3 input-set max-w-18rem md:min-w-full col">

                                        <label
                                            className="form-label form-label1">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            {...loginRegister('password', { required: 'Password is required' })}
                                        />
                                        {loginErrors.password && <p className="error error-form" >{loginErrors.password.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="actions">
                                <button type="submit" className="btn-main primary-btn mt-3" disabled={isSubmitting}>
                                    {isSubmitting ?
                                        <Spinner /> : 'Login'}
                                </button>
                                <button type="button" onClick={onClose} className="btn-main filter-btn mt-3">
                                    Cancel
                                </button>
                            </div>
                            {loginErrors.root?.server?.message && (
                                <p className="error error-form">
                                    {loginErrors.root.server.message}
                                </p>
                            )}
                        </form>
                    </>
                )}
                {/* Registration */}
                {tab === 'register' && (
                    <>
                        <h2>Registrtion / <button
                            type="button"
                            className="btn-tab primary-btn mt-3 ml-3"
                            onClick={() => { clearErrors(); setTab('login') }}
                        >
                            Login
                        </button></h2>

                        <form onSubmit={handleRegisterSubmit(onRegisterSubmit)}>
                            <div className="grid md:justify-content-center p-0-20">
                                <div className="col-12 ">
                                    <div className="mb-3 input-set max-w-18rem md:min-w-full col">
                                        <label className="form-label form-label1">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder=''
                                            {...registerRegister('name', {
                                                required: 'Name is required',
                                                minLength: { value: 3, message: 'Минимум 6 символов' }
                                            })}
                                        />
                                        {registerErrors.name && <p className="error error-form">{registerErrors.name.message}</p>}
                                    </div>
                                    <div className="mb-3 input-set max-w-18rem md:min-w-full col">
                                        <label className="form-label form-label1">Email</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder=''
                                            {...registerRegister('email', { required: 'Email is required' })}
                                        />
                                        {registerErrors.email && <p className="error error-form">{registerErrors.email.message}</p>}
                                    </div>
                                    <div className="mb-3 input-set max-w-18rem md:min-w-full col">

                                        <label
                                            className="form-label form-label1">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            {...registerRegister('password', {
                                                required: 'Пароль обязателен',
                                                minLength: { value: 6, message: 'Минимум 6 символов' },
                                            })}
                                        />
                                        {registerErrors.password && <p className="error error-form" >{registerErrors.password.message}</p>}
                                    </div>
                                    <div className="mb-3 input-set max-w-18rem md:min-w-full col">

                                        <label
                                            className="form-label form-label1">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            {...registerRegister('confirmPassword', {
                                                validate: value =>
                                                    value === watch('password') || 'Пароли не совпадают',
                                            })}
                                        />
                                        {registerErrors.confirmPassword && <p className="error error-form" >{registerErrors.confirmPassword.message}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="actions">
                                <button type="submit" className="btn-main primary-btn mt-3" disabled={isSubmittingRegister}>
                                    {isSubmittingRegister ?
                                        <Spinner /> : 'Register'}
                                </button>
                                <button type="button" onClick={onClose} className="btn-main filter-btn mt-3">
                                    Cancel
                                </button>
                            </div>
                            {registerErrors.root?.server?.message && (
                                <p className="error error-form">
                                    {registerErrors.root.server.message}
                                </p>
                            )}

                        </form>
                    </>
                )}
            </div>
        </div>
    )
}
