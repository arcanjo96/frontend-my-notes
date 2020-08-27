import React, { useState, FormEvent } from 'react';
import './styles.css';
import Input from '../components/Input';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const NewAnnotation = () => {
    const history = useHistory();
    const { user } = useAuth();

    const [text, setText] = useState('');

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const response = await api.post('/annotations', {
            text,
            user_id: user.id
        }, {
            headers: {
                'Authorization': `Bearer: ${localStorage.getItem('@Notes:token')}`
            }
        });

        if (response.status === 201) {
            alert('Anotação criada com sucesso.');
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
                <label>Nova Anotação</label>
                <Input
                    placeholder="Digite suas anotações..."
                    name="text"
                    type="text"
                    onChange={e => setText(e.target.value)}
                />
                <Button
                    title="Salvar"
                    type="submit"
                />
            </form>
        </div>
    );
}

export default NewAnnotation;