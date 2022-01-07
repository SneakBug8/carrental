// in src/MyLoginPage.js
import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify, Notification, defaultTheme } from 'react-admin';

export const MyLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();
    const submit = (e: any) => {
        e.preventDefault();
        // will call authProvider.login({ email, password })
        login({ email, password }).catch(() =>
            notify('Invalid email or password')
        );
    };

    return (
        <div>
            <form onSubmit={submit}>
    <input
                name="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </form>
            <Notification />
            </div>
    );
};