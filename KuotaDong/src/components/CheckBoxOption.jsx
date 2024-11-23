/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const CheckboxOption = ({ id, label, onChange }) => {
    return (
        <label htmlFor={id} className="flex cursor-pointer items-start">
            <div className="flex items-center">
                &#8203;
                <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id={id}
                    onChange={onChange}
                />
            </div>
            <div>
                <strong className="font-medium text-gray-900 pl-2">{label}</strong>
            </div>
        </label>
    );
};

export default CheckboxOption;