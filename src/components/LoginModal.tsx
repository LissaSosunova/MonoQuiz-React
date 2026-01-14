import Spinner from './spinner'
import { type ModalProps } from '../shared/interfaces/modal-props'
import { useForm } from 'react-hook-form'
import { type LoginForm } from '../shared/interfaces/login-form'

export default function LoginModal({ onClose, onSuccess }: ModalProps) {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>({
        defaultValues: {
            login: '',
            password: '',
        },
        mode: 'onSubmit', // аналог updateOn: 'submit'
    })

    const onSubmit = async (data: LoginForm) => {
        // имитация API
        await new Promise(r => setTimeout(r, 500))

        if (data.login === 'admin' && data.password === 'admin') {
            localStorage.setItem('token', 'fake-jwt')
            localStorage.setItem('role', 'admin')
            onSuccess()
        } else {
            throw new Error('Invalid credentials')
        }
    }

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Admin login</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid md:justify-content-center p-0-20">
                        <div className="col-12 ">
                            <div className="mb-3 input-set max-w-18rem md:min-w-full col">

                                <label className="form-label form-label1">Login</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register('login', {
                                        required: 'Login is required',
                                        minLength: { value: 3, message: 'Min 3 characters' },
                                    })}
                                />
                                {errors.login && <p>{errors.login.message}</p>}
                            </div>
                            <div className="mb-3 input-set max-w-18rem md:min-w-full col">

                                <label
                                    className="form-label form-label1">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: { value: 6, message: 'Min 6 characters' },
                                    })}
                                />
                                {errors.password && <p className="error" >{errors.password.message}</p>}
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
                </form>
            </div>
        </div>
    )
}
