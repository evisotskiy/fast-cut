import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from './../hooks/http.hook';
import { useMessage } from './../hooks/message.hook';
import { AuthContext } from './../context/auth.context';

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, error, request, clearError } = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    const changeHandler = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch {}
    }

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => global.M.updateTextFields(), [])

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Link cutter</h1>

                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field ">
                                <input
                                    placeholder="Enter email"
                                    id="email"
                                    name="email"
                                    type="text"
                                    className="yellow-input validate"
                                    value={form.email}
                                    onChange={ changeHandler }
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field ">
                                <input
                                    placeholder="Enter password"
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="yellow-input validate"
                                    value={form.password}
                                    onChange={ changeHandler }
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4" style={{ marginRight: 10 }} onClick={loginHandler} disabled={loading}>Login</button>
                        <button className="btn grey lighten-1 black-text" onClick={registerHandler} disabled={loading}>Registration</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
