import React from "react";
interface SelectProps {
  label: string;
  selectName: string;
  optionLabel: string;
  options: { name: string; value: string }[];
}
export default function FormSelect({
  label,
  selectName,
  optionLabel,
  options,
}: SelectProps) {
  return (
    <>
      <label htmlFor="gender" className="block text-gray-700 font-medium mb-2">
        {label}
      </label>
      <select
        name={selectName}
        className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
        required
      >
        <option value="">{optionLabel}</option>
        {Array.isArray(options) &&
          options?.map((option, index) => (
            <option key={index} value={option.name}>
              {option.value}
            </option>
          ))}
      </select>
    </>
  );
}
