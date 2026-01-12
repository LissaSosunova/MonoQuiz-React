import { useState } from 'react'
import { type ModalProps } from '../shared/interfaces/modal-props'

export default function LoginModal({ onClose, onSuccess }: ModalProps) {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // 🔐 пример простой проверки
        if (login === 'admin' && password === 'admin') {
            localStorage.setItem('token', 'fake-jwt')
            localStorage.setItem('role', 'admin')
            onSuccess()
        } else {
            setError('Invalid credentials')
        }
    }

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Admin login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="grid md:justify-content-center p-0-20">

                        <div className="col-12 ">
                            <div className="mb-3 input-set max-w-18rem md:min-w-full col">
                                <label
                                    className="form-label form-label1">Login</label>
                                <input
                                type='text'
                                    className="form-control"
                                    value={login}
                                    onChange={e => setLogin(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 input-set max-w-18rem md:min-w-full col">
                                <label
                                    className="form-label form-label1">Password</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            {error && <p className="error">{error}</p>}
                        </div>
                    </div>

                    <div className="actions">
                        <button type="submit" className="btn-main primary-btn mt-3">Login</button>
                        <button type="button" onClick={onClose} className="btn-main filter-btn mt-3">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
