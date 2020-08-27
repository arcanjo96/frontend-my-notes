import React, { useState, useEffect } from 'react';

import './styles.css';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

interface IAnnotation {
    id: number;
    text: string;
    uid: string;
}

const Annotations = () => {
    const { signOut } = useAuth();
    const history = useHistory();
    const [annotations, setAnnotations] = useState([]);

    function goTo() {
        history.push('/newAnnotation');
    }

    async function loadData() {
        const response = await api.get('annotations', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('@Notes:token')}`
            }
        });
        console.log(response.data);
        setAnnotations(response.data);
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <div className="items-header">
                <button
                    type="button"
                    onClick={goTo}
                    title="Nova Anotação"
                >
                    Nova Anotação
            </button>
                <p onClick={() => signOut()}>
                    Sair
                </p>
            </div>

            <br />
            <br />
            <div className="row">
                {
                    annotations.map((annotation: IAnnotation) => (
                        <div className="column" style={{ marginTop: '1rem' }}>
                            <div className="card" key={annotation.id}>
                                <h3>{annotation.uid}</h3>
                                <p>{annotation.text}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default Annotations;