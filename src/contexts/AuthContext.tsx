import React, { createContext, useState, useContext } from 'react';
import api from '../services/api';

interface IAuthState {
    token: string;
    user: object;
}

interface ICredentials {
    email: string;
    password: string;
}

interface IAuthContext {
    user: {
        id?: number;
        name?: string;
        email?: string;
    };
    signIn(credentials: ICredentials): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<IAuthState>(() => {
        const token = localStorage.getItem('@Notes:token');
        const user = localStorage.getItem('@Notes:user');

        if(token && user) {
            return { token, user: JSON.parse(user) };
        }

        return {} as IAuthState;
    });

    const signIn = async (credentials: ICredentials) => {
        const { email, password } = credentials;
        const response = await api.post('/login', {
            email,
            password
        });

        const { token, user } = response.data;

        localStorage.setItem('@Notes:token', token);
        localStorage.setItem('@Notes:user', JSON.stringify(user));

        setData({ token, user });
    }

    const signOut = () => {
        const token = localStorage.removeItem('@Notes:token');
        const user = localStorage.removeItem('@Notes:user');

        setData({} as IAuthState);
    }

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): IAuthContext => {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider!');
    }

    return context;
}