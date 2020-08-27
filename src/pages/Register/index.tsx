import React, { useState, FormEvent } from 'react';
import './styles.css';
import Input from '../components/Input';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import api from '../../services/api';

const Register = () => {
    const history = useHistory();

    const [name, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        const response = await api.post('/users', {
            name,
            email,
            password
        });

        if (response.status === 201) {
            alert('Usuário criado com sucesso.');
            goBack();
        }
    }

    function goBack() {
        history.goBack();
    }

    return (
        <div>
            <FontAwesomeIcon
                icon={faArrowLeft}
                title="voltar"
                className="back-button"
                size="lg"
                onClick={goBack}
            />
            <form onSubmit={handleSubmit}>
                <label>Novo Usuário</label>
                <Input
                    placeholder="seu nome"
                    name="name"
                    type="text"
                    onChange={e => setUserName(e.target.value)}
                />
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
                    title="Cadastrar"
                    type="submit"
                />
            </form>
        </div>
    );
}

export default Register;