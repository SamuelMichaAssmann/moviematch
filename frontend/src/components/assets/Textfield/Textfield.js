import React from 'react';
import './Textfield.css';

export const Textfield = ({
    label,
    name,
    type,
    value,
    onChange,
    width,
    extraStyles,
    extraClasses
}) => {

    const style = (width == null) ? {} : { width: width }
    const checkExtraStyles = (extraStyles == null) ? {} : extraStyles;
    const totalStyles = Object.assign(style, checkExtraStyles);

    return (
        <div>
            <label className={"pure-material-textfield-outlined " + extraClasses}>
                <input
                    placeholder=" "
                    name={name}
                    type={type}
                    onChange={onChange} 
                    value={value}
                    style={totalStyles}
                    />
                <span>{label}</span>
            </label>
        </div>
    );
};