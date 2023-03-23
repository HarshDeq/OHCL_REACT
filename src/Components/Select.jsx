import React from 'react';

const Select = (props) => {
    const { label, value, options, onChange } = props;
    return (
        <>
            {label && <label>{label} : </label>}
            <select value={value} onChange={onChange}>
                {options?.map((option) => (
                    <option key={option?.value} value={option?.value}>
                        {option?.label}
                    </option>
                ))}
            </select>
        </>
    );
};

export default Select;
