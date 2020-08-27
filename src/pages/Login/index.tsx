import React, { useState, FormEvent } from 'react';

import './styles.css';
import Input from '../components/Input';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
    const { signIn } = useAuth();
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const response = await signIn({
            email,
            password
        });
    }

    function goToRegister() {
        history.push('/register');
    }

    return (
            <form onSubmit={handleSubmit}>
                <label>Login</label>
                <Input
                    placeholder="email"
                    name="email"
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                />
                <Input
                    placeholder="senha"
                    name="password"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                />

                <Button
                    title="Entrar"
                    type="submit"
                    onClick={handleSubmit}
                />

                <p onClick={goToRegister}>Ainda não possui conta? Cadastre-se aqui!</p>
            </form>
    );
}

export default Login;