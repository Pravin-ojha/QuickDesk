import React from 'react';

const Input = ({ label, id, type = 'text', value, onChange, required, className }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className={`mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-600 ${className}`}
      />
    </div>
  );
};

export default Input;