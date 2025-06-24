import React from "react";

interface RadioProps {
  label: string;
  radioName: string;
  options: boolean[]; // [true, false]
  value: boolean; // "Yes" or "No"
  onChange: (value: boolean) => void;
}

export default function FormRadio({
  label,
  radioName,
  options,
  value,
  onChange,
}: RadioProps) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <div className="flex flex-wrap -mx-2">
        {options.map((opt, index) => {
          const labelValue = opt ? "Yes" : "No";

          return (
            <div className="px-2 w-1/3" key={index}>
              <label className="block text-gray-700 font-medium mb-2">
                <input
                  type="radio"
                  name={radioName}
                  value={labelValue}
                  checked={value === opt}
                  onChange={() => onChange(opt)}
                  className="mr-2"
                />
                {labelValue}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
