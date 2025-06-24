import React from "react";
interface TextareaProps {
  label: string;
  textareaName: string;
  placeholder: string;
}
export default function FormTextarea({
  label,
  textareaName,
  placeholder,
}: TextareaProps) {
  return (
    <div>
      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
        {label}
      </label>
      <textarea
        name={textareaName}
        placeholder={placeholder}
        className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
      ></textarea>
    </div>
  );
}
