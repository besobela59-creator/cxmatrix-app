// Input.tsx
import React from 'react';
import './Input.css';

const Input: React.FC = (props) => {
    return <input className='input' {...props} />;
};

export default Input;