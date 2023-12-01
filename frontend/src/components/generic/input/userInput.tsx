import { IUserInput } from "@/interfaces/interfaces";

export default function UserInput({
  width,
  height,
  step,
  min,
  addStyle,
  handleChange,
  type,
  name,
  id,
  placeholder,
  required,
  defaultValue,
  autoComplete,
  disabled,
}: IUserInput) {
  return (
    <input
      onChange={handleChange}
      type={type}
      name={name}
      id={id}
      className={`${addStyle} ${width} ${height} text-white border text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500`}
      placeholder={placeholder}
      required={required}
      step={step}
      min={min}
      defaultValue={defaultValue}
      autoComplete={autoComplete}
      disabled={disabled}
    />
  );
}
