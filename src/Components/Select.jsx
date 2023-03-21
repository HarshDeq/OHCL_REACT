import React from 'react';

const Select = (props) => {
    const { label, value, options, onChange } = props;
    return (
        <>
            {label && <label>{label} : </label>}
            <select value={value} onChange={onChange}>
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </>
    );
};

export default Select;
