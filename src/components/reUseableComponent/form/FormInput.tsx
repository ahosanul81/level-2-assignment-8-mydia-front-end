import React from "react";
interface InputProps {
  label: string;
  inputName: string;
  type: string;
  placeholder: string;
  required: boolean;
}
export default function FormInput({
  label,
  inputName,
  type,
  placeholder,
  required,
}: InputProps) {
  return (
    <>
      <label
        htmlFor={inputName}
        className="block text-gray-700 font-medium mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        name={inputName}
        placeholder={placeholder}
        className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
        required={required}
      />
    </>
  );
}
