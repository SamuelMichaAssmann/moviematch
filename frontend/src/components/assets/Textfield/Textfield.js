import React from 'react';
import './Textfield.css';

export const Textfield = ({
    needed,
    label,
    name,
    type,
    value,
    onChange
}) => {

    return (
        <div>
            <label class="pure-material-textfield-outlined">
                <input
                    placeholder=" "
                    name={name}
                    type={type}
                    onChange={onChange} 
                    value={value}
                    />
                <span>{label}</span>
            </label>
        </div>
    );
};