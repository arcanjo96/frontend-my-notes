import React, { ButtonHTMLAttributes } from 'react';

import './styles.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
}

const Button: React.FC<ButtonProps> = ({ title, ...rest }) => {
    return (
        <button type='submit'>
            {title}
        </button>
    );
}

export default Button;